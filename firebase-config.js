// firebase-config.js
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, updateDoc, deleteDoc, doc, getDoc, query, where, orderBy, limit } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject, listAll } from "firebase/storage";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, sendPasswordResetEmail } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Configuration Firebase
const firebaseConfig = {
  apiKey: "AIzaSyA9tXUY_x1ZPQg5QJQwXLzNMEMDMafZBl8",
  authDomain: "medisoft-services-new.firebaseapp.com",
  projectId: "medisoft-services-new",
  storageBucket: "medisoft-services-new.firebasestorage.app",
  messagingSenderId: "603092472666",
  appId: "1:603092472666:web:29a828f9291698abe55963",
  measurementId: "G-824YVCTNF9"
};

// Initialisation
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);
const analytics = getAnalytics(app);

// Exportation des fonctions et objets
export { 
    db, storage, auth, analytics,
    collection, addDoc, getDocs, updateDoc, deleteDoc, doc, getDoc, query, where, orderBy, limit,
    ref, uploadBytes, getDownloadURL, deleteObject, listAll,
    createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, sendPasswordResetEmail
};
