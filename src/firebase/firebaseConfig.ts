// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDg1Om99AdmRnZOywBcBAjxRQxStGOQFJs",
    authDomain: "reporte-ciudadano-23b56.firebaseapp.com",
    projectId: "reporte-ciudadano-23b56",
    storageBucket: "reporte-ciudadano-23b56.firebasestorage.app",
    messagingSenderId: "615611906155",
    appId: "1:615611906155:web:27101600c05e9f66c7192e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };