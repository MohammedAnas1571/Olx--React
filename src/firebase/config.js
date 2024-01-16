import firebase from "firebase";
import 'firebase/auth'
import 'firebase/firebase'
import 'firebase/storage'
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBJRZO_KFT4CsmtOma4TDJRSYAfv4xHvp8",
  authDomain: "fir-c15cf.firebaseapp.com",
  projectId: "fir-c15cf",
  storageBucket: "fir-c15cf.appspot.com",
  messagingSenderId: "955604044098",
  appId: "1:955604044098:web:d0090a55e669fd3dc3e0db",
  measurementId: "G-7SW375QF78"
};

  export default firebase.initializeApp(firebaseConfig)