const WebSocketService = {
    ws: null,
    messageHandlers: [],

    connect(onOpenCallback) {
        if (onOpenCallback) {
            onOpenCallback();
        }

        this.ws = {};
    },

    async sendMessage(message, type) {
        const res = await window.zillabaseActions.executeQuery(message, type);
        this.messageHandlers.forEach((handler) => handler({
            data: res.data,
            type
        }));
    },

    addMessageHandler(handler) {
        this.messageHandlers.push(handler);
    },

    removeAll() {
        this.messageHandlers = [];
    }
};

export default WebSocketService;
