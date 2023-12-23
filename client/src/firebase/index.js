import { initializeApp, } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  apiKey: "AIzaSyBJY5zduPrUQJOWnrWzR0Q90Iksjua5ny0",
  authDomain: "space-creator-a0cd3.firebaseapp.com",
  projectId: "space-creator-a0cd3",
  storageBucket: "space-creator-a0cd3.appspot.com",
  messagingSenderId: "30948786508",
  appId: "1:30948786508:web:ca854edea2c7a2a5f70fe9",
  measurementId: "G-Z1H4QE7C1M"
};

export const firebaseApp = initializeApp(firebaseConfig);

// Initialize Firebase

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(firebaseApp);

export { storage };