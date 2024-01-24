import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_KEY,
    authDomain: "pawsibilities-1997b.firebaseapp.com",
    projectId: "pawsibilities-1997b",
    storageBucket: "pawsibilities-1997b.appspot.com",
    messagingSenderId: "540217690822",
    appId: "1:540217690822:web:2a5ad4b41280bd6420e5c7",
    measurementId: "G-W3G2DDKCNB",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const store = getStorage(app);

export { db, store };
