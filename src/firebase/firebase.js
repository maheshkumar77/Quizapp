
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDbJfpD9yEx6PqexpMu0H-KaEIoH4tPvQg",
  authDomain: "quiz-88ae0.firebaseapp.com",
  projectId: "quiz-88ae0",
  storageBucket: "quiz-88ae0.firebasestorage.app",
  messagingSenderId: "1036967434358",
  appId: "1:1036967434358:web:129f247873c322ffcaa757",
  measurementId: "G-WPFK027J5Z"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


const auth = getAuth(app);
const googleAuthProvider = new GoogleAuthProvider();

export { auth, googleAuthProvider, signInWithPopup, signOut };
