import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCd10IBOxXzUAJT1VwXQC-d22EKzARGCIw",
  authDomain: "linkedin-clone-d7da9.firebaseapp.com",
  projectId: "linkedin-clone-d7da9",
  storageBucket: "linkedin-clone-d7da9.appspot.com",
  messagingSenderId: "257654296483",
  appId: "1:257654296483:web:9c5ec65535d4f5e485d416",
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();
const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

export { auth, provider, storage, db };
