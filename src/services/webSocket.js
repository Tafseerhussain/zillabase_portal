const WebSocketService = {
    ws: null,
    messageHandlers: [],

    connect(onOpenCallback) {
        if (onOpenCallback) {
            onOpenCallback();
        }

        this.ws = {};
    },

    sendMessage(message, type) {
        window.zillabaseActions.executeQuery(message, type).then(res => {
            this.messageHandlers.forEach((handler) => handler({
                data: res.data,
                type
            }));
        });
    },

    addMessageHandler(handler) {
        this.messageHandlers.push(handler);
    },

    removeAll() {
        this.messageHandlers = [];
    }
};

export default WebSocketService;
