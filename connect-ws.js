const postgres = require('postgres');
const EventEmitter = require('events');
const WebSocket = require('ws');

function Socket(options) {
    const scheme = options.ssl ? 'wss' : 'ws';
    const host = options.host;
    const port = options.port;
    const path = options.path || '/';
    const location = `${scheme}://${host}:${port}${path}`;

    const self = this;
    const queue = [];
    const emitter = new EventEmitter();
    const socket = new WebSocket(location);

    socket.onopen = function (evt) {
        self.readyState = 'open';
        emitter.emit('connect', evt);

        while (queue.length > 0) {
            const next = queue.shift();
            self._flush(next.data, next.listener);
        }
    };

    socket.onmessage = async function (evt) {
        const buffer = await evt.data.arrayBuffer();
        const array = new Uint8Array(buffer);
        emitter.emit('data', array);
    };

    socket.onclose = function (evt) {
        emitter.emit('close', evt);
    };

    socket.onerror = function (evt) {
        emitter.emit('error', evt);
    };

    this.socket = socket;
    this.emitter = emitter;
    this.queue = queue;
    this.readyState = 'opening';
}

Socket.prototype.on = 
Socket.prototype.addListener = function (eventName, listener) {
    this.emitter.addListener(eventName, listener);
};

Socket.prototype.removeListener = function (eventName, listener) {
    this.emitter.removeListener(eventName, listener);
};

Socket.prototype.removeAllListeners = function (eventName) {
    this.emitter.removeAllListeners(eventName);
};

Socket.prototype.write = function (data, listener) {
    if (this.socket.readyState === WebSocket.OPEN) {
        this._flush(data, listener);
    } else {
        this.queue.push({ data, listener });
    }
};

Socket.prototype._flush = function (data, listener) {
    this.socket.send(data);
    if (listener) {
        this.emitter.once('drain', listener);
    }
};

Socket.prototype.close = function () {
    this.socket.close();
};

Socket.prototype.destroy = function () {
    this.socket.close();
    this.emitter.removeAllListeners();
};

function newWebSocket(options) {
    return new Socket(options);
}

const options = {
    ssl: false,
    host: 'localhost',
    port: 7184,
    path: '/pgsql',
    database: 'zillabase',
    user: 'postgres',
    password: 'Shaikh',
    fetch_types: false,
    prepare: false
};

const sql = postgres({
    ...{
        socket: newWebSocket
    },
    ...options
});

// WebSocket handler for queries
const wss = new WebSocket.Server({ port: 7185 });

wss.on('connection', (ws) => {
    console.log('New WebSocket connection');

    ws.on('message', async (message) => {
        try {
            const { query, type } = JSON.parse(message);
            const result = await sql.unsafe(query);
            ws.send(
                JSON.stringify({
                    data: result,
                    type
                })
            );
        } catch (error) {
            ws.send(JSON.stringify({ error: 'Query failed', details: error.message }));
        }
    });

    ws.on('close', () => {
        console.log('WebSocket connection closed');
    });

    ws.on('error', (error) => {
        console.error('WebSocket error:', error);
    });
});

console.log('WebSocket server is running on ws://localhost:7185');

