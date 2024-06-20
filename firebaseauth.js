// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

 // Your web app's Firebase configuration
 const firebaseConfig = {
    apiKey: "AIzaSyCSHT80ctQgEcOaHbr_UfY3YsO7AJ7cMV8",
    authDomain: "ekasi-business-signup-signin.firebaseapp.com",
    projectId: "ekasi-business-signup-signin",
    storageBucket: "ekasi-business-signup-signin.appspot.com",
    messagingSenderId: "841081372781",
    appId: "1:841081372781:web:eaad2db317afa6d1763f64"
  };

  
  // Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

// Function to show messages
function showMessage(message, divId) {
    const messageDiv = document.getElementById(divId);
    messageDiv.style.display = "block";
    messageDiv.innerHTML = message;
    messageDiv.style.opacity = 1;
    setTimeout(() => {
        messageDiv.style.opacity = 0;
    }, 5000);
}

// Sign Up Functionality
const signUp = document.getElementById('submitSignUp');
signUp.addEventListener('click', (event) => {
    event.preventDefault();
    const email = document.getElementById('rEmail').value;
    const password = document.getElementById('rPassword').value;
    const firstName = document.getElementById('fName').value;
    const lastName = document.getElementById('lName').value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            const userData = {
                email: email,
                firstName: firstName,
                lastName: lastName
            };
            showMessage('Account Created Successfully', 'signUpMessage');
            const docRef = doc(db, "users", user.uid);
            return setDoc(docRef, userData);
        })
        .then(() => {
            window.location.href = 'https://ekasi.framer.media/Business-registration';
        })
        .catch((error) => {
            console.error("Error writing document", error);
            showMessage('You have account with this email', 'signUpMessage');
        });
});

// Sign In Functionality
const signIn = document.getElementById('submitSignIn');
signIn.addEventListener('click', (event) => {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            showMessage('Login is successful', 'signInMessage');
            const user = userCredential.user;
            localStorage.setItem('loggedInUserId', user.uid);
            window.location.href = 'https://ekasi.framer.media/Business-registration';
        })
        .catch((error) => {
            const errorCode = error.code;
            if (errorCode === 'auth/wrong-password') {
                showMessage('Incorrect Email or Password', 'signInMessage');
            } else if (errorCode === 'auth/user-not-found') {
                showMessage('Account does not exist', 'signInMessage');
            } else {
                showMessage('This account exists', 'signInMessage');
            }
        });
});


  

 
