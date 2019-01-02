module.exports = Object.freeze({
    // window setups
    WINDOW_WIDTH: 800,
    WINDOW_HEIGHT: 768,

    // default server setups
    HOST: '127.0.0.1',
    PORT: 1234,

    // connection with server
    CONNECT: 'CONNECT',

    // handling messages from server
    NEW_USER: 'NEW_USER',
    NEW_USER_CODE: '200',
    USER_LEFT: 'USER_LEFT',
    USER_LEFT_CODE: '300',
    MESSAGE_RECEIVED: 'MESSAGE_RECEIVED',
    MESSAGE_RECEIVED_CODE: '400',
    USERS_LIST: 'USERS_LIST',
    USERS_LIST_CODE: '500',
    SERVER_DISCONNECTED: 'SERVER_DISCONNECTED',
    SERVER_DISCONNECTED_CODE: '600',

    // handling messages to server
    SUBMIT_USERNAME: 'SUBMIT_USERNAME',
    WRITE_MESSAGE: 'WRITE_MESSAGE',
    SERVER_CONNECTED: 'SERVER_CONNECTED',
    SERVER_CONNECTION_FAILURE: 'SERVER_CONNECTION_FAILURE'
});
