// Firebase configuration and initialization
"use client"
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
      apiKey: "AIzaSyAQXds8X4mjk7TBgF-9R0a3d24ZYJk5aKQ",
      authDomain: "refership.firebaseapp.com",
      projectId: "refership",
      storageBucket: "refership.appspot.com",
      messagingSenderId: "71464403904",
      appId: "1:71464403904:web:2369729ad5363f6ad0be25",
      measurementId: "G-TDVN8L1KNS"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };

// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyAQXds8X4mjk7TBgF-9R0a3d24ZYJk5aKQ",
//   authDomain: "refership.firebaseapp.com",
//   projectId: "refership",
//   storageBucket: "refership.appspot.com",
//   messagingSenderId: "71464403904",
//   appId: "1:71464403904:web:2369729ad5363f6ad0be25",
//   measurementId: "G-TDVN8L1KNS"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

