import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBh5C0PCOejoK8O4tKaiagb5Gm-04GOIN8",
  authDomain: "student-shoppe.firebaseapp.com",
  projectId: "student-shoppe",
  storageBucket: "student-shoppe.appspot.com",
  messagingSenderId: "968548781604",
  appId: "1:968548781604:web:41eb6021b998312576d2b1",
  measurementId: "G-J7WWQN5MNS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { auth };

export default app;
