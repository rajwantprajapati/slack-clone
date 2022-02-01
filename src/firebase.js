import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB1TPAdIYtq52-SCf5gaxjQ8oGbTje1fFs",
    authDomain: "slack-clone-a4c01.firebaseapp.com",
    projectId: "slack-clone-a4c01",
    storageBucket: "slack-clone-a4c01.appspot.com",
    messagingSenderId: "698776653262",
    appId: "1:698776653262:web:4933e46f9a756f1532af9f",
    measurementId: "G-6SFTNCD1BS"
  };

  // eslint-disable-next-line no-unused-vars
  const firebaseApp = initializeApp(firebaseConfig);
  const db = getFirestore();
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

export { auth, provider };
export default db;

