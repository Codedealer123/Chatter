// Import Firebase modules using modern ES6 imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";
import { getDatabase, ref, push, onChildAdded } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";

// Your Firebase config object
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project-id.firebaseapp.com",
  databaseURL: "https://your-project-id.firebaseio.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id",
  measurementId: "your-measurement-id"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

// Get DOM elements for authentication and chat
const emailInput = document.getElementById('emailInput');
const passwordInput = document.getElementById('passwordInput');
const loginButton = document.getElementById('loginButton');
const logoutButton = document.getElementById('logoutButton');
const registerButton = document.getElementById('registerButton');
const messageInput = document.getElementById('messageInput');
const sendMessageButton = document.getElementById('sendMessage');
const messagesList = document.getElementById('messages');

// Listen for auth state changes
onAuthStateChanged(auth, user => {
  if (user) {
    // User is logged in
    console.log("User logged in: ", user.email);
    document.getElementById('chatContainer').style.display = 'block';
    document.getElementById('authContainer').style.display = 'none';
  } else {
    // User is logged out
    console.log("User logged out");
    document.getElementById('chatContainer').style.display = 'none';
    document.getElementById('authContainer').style.display = 'block';
  }
});

// Register a new user
registerButton.addEventListener('click', () => {
  const email = emailInput.value;
  const password = passwordInput.value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("User created: ", user.email);
    })
    .catch((error) => {
      console.error("Error registering user: ", error.message);
    });
});

// Log in with existing user
loginButton.addEventListener('click', () => {
  const email = emailInput.value;
  const password = passwordInput.value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("User logged in: ", user.email);
    })
    .catch((error) => {
      console.error("Error logging in: ", error.message);
    });
});

// Log out the user
logoutButton.addEventListener('click', () => {
  signOut(auth)
    .then(() => {
      console.log("User logged out");
    })
    .catch((error) => {
      console.error("Error logging out: ", error.message);
    });
});

// Get reference to messages node
const messagesRef = ref(database, 'messages');

// Send message to Firebase Realtime Database
sendMessageButton.addEventListener('click', () => {
  const message = messageInput.value;

  if (message) {
    const user = auth.currentUser;
    if (user) {
      push(messagesRef, {
        message: message,
        timestamp: Date.now(),
        uid: user.uid,
        email: user.email
      });
    } else {
      console.log("User not logged in.");
    }
  }

  messageInput.value = ''; // Clear the input field
});

// Listen for messages in real-time
onChildAdded(messagesRef, (snapshot) => {
  const messageData = snapshot.val();
  const messageElement = document.createElement('li');
  messageElement.textContent = `${messageData.email}: ${messageData.message}`;
  messagesList.appendChild(messageElement);
});
