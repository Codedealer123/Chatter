// Import Firebase modules using modern ES6 imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getDatabase, ref, push, onChildAdded } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";

// Your Firebase config object
const firebaseConfig = {
  apiKey: "AIzaSyDx2BuB6leW1I0dCikbJHC_hi0xj9aAcDs",
  authDomain: "chatter-codedealer123.firebaseapp.com",
  databaseURL: "https://chatter-codedealer123-default-rtdb.firebaseio.com/",
  projectId: "chatter-codedealer123",
  storageBucket: "chatter-codedealer123.firebasestorage.app",
  messagingSenderId: "895724059437",
  appId: "1:895724059437:web:e87e991caec25bd2a6b1a4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Get reference to messages node
const messagesRef = ref(database, 'messages');

// Get DOM elements
const messageInput = document.getElementById('messageInput');
const sendMessageButton = document.getElementById('sendMessage');

// Send message to Firebase Realtime Database
sendMessageButton.addEventListener('click', () => {
  const message = messageInput.value;

  if (message) {
    // Push the message to Firebase
    push(messagesRef, {
      message: message,
      timestamp: Date.now()
    });
  }

  messageInput.value = ''; // Clear the input field
});

// Listen for messages in real-time
onChildAdded(messagesRef, (snapshot) => {
  const messageData = snapshot.val();
  const messageElement = document.createElement('li');
  messageElement.textContent = messageData.message;
  document.getElementById('messages').appendChild(messageElement);
});
