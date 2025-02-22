function sendMessage() {
    let input = document.getElementById("messageInput");
    let message = input.value.trim();

    if (message) {
        let chatBox = document.getElementById("chatBox");
        let newMessage = document.createElement("div");
        newMessage.textContent = message;
        newMessage.className = "message";
        chatBox.appendChild(newMessage);

        input.value = "";
        chatBox.scrollTop = chatBox.scrollHeight;
    }
}
