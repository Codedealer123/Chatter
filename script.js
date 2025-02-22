// Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyDx2BuB6leW1I0dCikbJHC_hi0xj9aAcDs",
    authDomain: "chatter-codedealer123.firebaseapp.com",
    projectId: "chatter-codedealer123",
    storageBucket: "chatter-codedealer123.firebasestorage.app",
    messagingSenderId: "895724059437",
    appId: "1:895724059437:web:e87e991caec25bd2a6b1a4"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

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
