import { initializeApp } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-app.js";

import {
  getFirestore
} from "https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js";

import {
  getStorage
} from "https://www.gstatic.com/firebasejs/12.14.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyDveF9exCwXmAAivUWdUAvhfIZq931ELSs",
  authDomain: "love-site-f98bf.firebaseapp.com",
  projectId: "love-site-f98bf",
  storageBucket: "love-site-f98bf.firebasestorage.app",
  messagingSenderId: "835097237304",
  appId: "1:835097237304:web:8039c778daab694f1cd3cd",
  measurementId: "G-DLLS61W106"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);
