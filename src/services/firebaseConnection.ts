import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCWhCYnZx16RBZbFD1K4Yaj8cdp80i5MNk",
  authDomain: "webcarros-c7756.firebaseapp.com",
  projectId: "webcarros-c7756",
  storageBucket: "webcarros-c7756.appspot.com",
  messagingSenderId: "424753568480",
  appId: "1:424753568480:web:3625849dfbc8d9d4614e85"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage };