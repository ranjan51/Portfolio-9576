// firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAQzJvhbf-ZuA5EblItZ0Ed6GVQK0Hd6u4",
  authDomain: "react-images-4c7f5.firebaseapp.com",
  projectId: "react-images-4c7f5",
  storageBucket: "react-images-4c7f5.appspot.com",
  messagingSenderId: "270801425263",
  appId: "1:270801425263:web:d40c3fb9b69dc327120e9a",
  measurementId: "G-VGP7RSGQEC",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firestore and Storage instances
const firestore = getFirestore(app);
const storage = getStorage(app);

export { firestore, storage };
