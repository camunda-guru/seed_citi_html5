/**
 * Created by BALASUBRAMANIAM on 01-12-2015.
 */
var webSocket =
    new WebSocket('ws://localhost:7070/SocketCommn/SocketDemo');

webSocket.onerror = function(event) {
    onError(event)
};

webSocket.onopen = function(event) {
    onOpen(event)
};

webSocket.onmessage = function(event) {
    onMessage(event)
};

function onMessage(event) {
    document.getElementById('messages').innerHTML
        += '<br />' + event.data;
    webSocket.send('received');
}

function onOpen(event) {
    document.getElementById('messages').innerHTML
        = 'Connection established';
}

function onError(event) {
    alert(event.data);
}

function start() {
    webSocket.send('hello');
    return false;
}