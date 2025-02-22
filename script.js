// Import Firebase modules using modern ES6 imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, updateProfile } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";
import { getDatabase, ref, push, onChildAdded, set } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";

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

// Register a new user with a custom display name
registerButton.addEventListener('click', () => {
  const email = emailInput.value;
  const password = passwordInput.value;
  const displayName = prompt("Please enter your display name"); // Ask user for their name

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("User created: ", user.email);

      // Update the display name in Firebase Authentication
      updateProfile(user, {
        displayName: displayName
      }).then(() => {
        console.log("Display name set:", displayName);
      }).catch((error) => {
        console.error("Error setting display name:", error.message);
      });

      // Optionally, save display name in Realtime Database as well
      const userRef = ref(database, 'users/' + user.uid);
      set(userRef, {
        email: user.email,
        displayName: displayName
      });

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
        displayName: user.displayName || user.email // Use display name if available, otherwise use email
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
  
  // Use display name if available, otherwise fall back to email
  messageElement.textContent = `${messageData.displayName}: ${messageData.message}`;
  messagesList.appendChild(messageElement);
});
