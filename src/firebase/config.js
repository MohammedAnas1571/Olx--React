import firebase from "firebase";
import 'firebase/auth'
import 'firebase/firebase'

const firebaseConfig = {
    apiKey: "AIzaSyAjYfCxWb3hLufIzEGAH9VFqcSczaVwuns",
    authDomain: "olx-clone-5d308.firebaseapp.com",
    projectId: "olx-clone-5d308",
    storageBucket: "olx-clone-5d308.appspot.com",
    messagingSenderId: "521573280246",
    appId: "1:521573280246:web:cafd2ee479b9bca80cbfd7",
    measurementId: "G-R2BK8F41LV"
  };

  export default firebase.initializeApp(firebaseConfig)