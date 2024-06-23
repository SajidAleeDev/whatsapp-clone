import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCBZNnSBnvSzAKi5cQcBpa-A0A_lPTlS88",
  authDomain: "whataapp-clone-bebcc.firebaseapp.com",
  projectId: "whataapp-clone-bebcc",
  storageBucket: "whataapp-clone-bebcc.appspot.com",
  messagingSenderId: "738490232116",
  appId: "1:738490232116:web:6fe5f06b9b4e5c92688961",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
