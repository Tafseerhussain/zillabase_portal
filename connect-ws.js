const postgres = require('postgres');
const WebSocket = require('ws');

// Custom WebSocket implementation for PostgreSQL
class Socket {
    constructor(options) {
        const scheme = options.ssl ? 'wss' : 'ws';
        const location = `${scheme}://${options.host}:${options.port}${options.path || '/'}`;
        this.queue = [];
        this.emitter = new (require('events'))();
        this.readyState = 'opening';
        this.socket = new WebSocket(location);

        this.socket.onopen = () => {
            this.readyState = 'open';
            this.emitter.emit('connect');
            while (this.queue.length) {
                const { data, callback } = this.queue.shift();
                this._send(data, callback);
            }
        };

        this.socket.onmessage = (evt) => {
            // Log the type and content of the received data to check the format
            console.log('Received data:', evt.data);
            console.log('Received data type:', typeof evt.data);

            // Check if the data is a Buffer
            if (Buffer.isBuffer(evt.data)) {
                const data = evt.data; // Process as Buffer
                this.emitter.emit('data', data);
            } else {
                console.log('Received data is not a Buffer:', evt.data);
                // If data is not a Buffer, handle it accordingly (e.g., as a string)
                this.emitter.emit('data', Buffer.from(evt.data));
            }
        };

        this.socket.onclose = () => this.emitter.emit('close');
        this.socket.onerror = (err) => this.emitter.emit('error', err);
    }

    on(event, listener) {
        this.emitter.on(event, listener);
    }

    write(data, callback) {
        if (this.readyState === 'open') {
            this._send(data, callback);
        } else {
            this.queue.push({ data, callback });
        }
    }

    _send(data, callback) {
        this.socket.send(data);
        if (callback) this.emitter.once('drain', callback);
    }

    close() {
        this.socket.close();
    }
}

// Function to create a new WebSocket instance
function newWebSocket(options) {
    return new Socket(options);
}

// PostgreSQL connection options
const sqlOptions = {
    ssl: false,
    host: 'localhost',
    port: 7184,
    path: '/pgsql',
    database: 'dev',
    user: 'zillabase',
    fetch_types: false,
    prepare: false,
    socket: newWebSocket
};

// Initialize PostgreSQL client
const sql = postgres(sqlOptions);

// WebSocket server for handling database queries
const wss = new WebSocket.Server({ port: 7185 });

wss.on('connection', (ws) => {
    console.log('WebSocket connection established');
    ws.on('message', async (message) => {
        try {
            const { query, type } = JSON.parse(message);
            console.log('Query:', query);

            // Ensure that the query is properly processed and the result is correct
            const result = await sql.unsafe(query);
            console.log('Query result:', result);
            
            // Send result back via WebSocket
            ws.send(JSON.stringify({ type, data: result }));
        } catch (err) {
            console.error('Error executing query:', err.message);
            ws.send(JSON.stringify({ error: 'Query execution failed', details: err.message }));
        }
    });

    ws.on('close', () => console.log('WebSocket connection closed'));
    ws.on('error', (err) => console.error('WebSocket error:', err));
});

console.log('WebSocket server is running on ws://localhost:7185');
