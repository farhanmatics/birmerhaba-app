import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
//import { initializeAuth } from 'firebase/auth/react-native';
//import AsyncStorage from '@react-native-async-storage/async-storage';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD_uMqq9y_OXHXbupm9pnW2jvN6glP5vWM",
  authDomain: "birmerhaba-a7c27.firebaseapp.com",
  projectId: "birmerhaba-a7c27",
  storageBucket: "birmerhaba-a7c27.appspot.com",
  messagingSenderId: "782035155741",
  appId: "1:782035155741:web:39acffe4144c18a9eb3ff4",
  measurementId: "G-DTKE4EW5WV"
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
const db = getFirestore(app);

export { db, auth };