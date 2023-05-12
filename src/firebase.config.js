
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';


const firebaseConfig = {
  apiKey: "AIzaSyAJGQ0pd2PelIf_VwSx9N-EDVtaGzXmj8I",
  authDomain: "symptopharm.firebaseapp.com",
  projectId: "symptopharm",
  storageBucket: "symptopharm.appspot.com",
  messagingSenderId: "1072079987892",
  appId: "1:1072079987892:web:fd0b300582ed0a731563e1",
  measurementId: "G-723ZMV6FW5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;