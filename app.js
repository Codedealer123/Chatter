// Connect to WebSocket Server
const socket = new WebSocket('ws://chatter-i61q.onrender.com:3000');

socket.onmessage = (event) => {
    const chatBox = document.getElementById('chat-box');
    chatBox.innerHTML += `<p>${event.data}</p>`;
};

// Send message to WebSocket
function sendMessage() {
    const messageInput = document.getElementById('message');
    const message = messageInput.value;
    socket.send(message);
    messageInput.value = '';
}

// Register Service Worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
        .then(reg => console.log('Service Worker Registered'))
        .catch(err => console.log('Service Worker Error:', err));
}

