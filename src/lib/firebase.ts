// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCVW3Ux4A1yzRYiHRPpzl2AcAHa2O2KRns",
  authDomain: "sandivideov1.firebaseapp.com",
  projectId: "sandivideov1",
  storageBucket: "sandivideov1.firebasestorage.app",
  messagingSenderId: "275997819112",
  appId: "1:275997819112:web:d1cb5363b6108cd6e8495d",
  measurementId: "G-HWYSCVS93B"
};

// Initialize Firebase
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

const app = initializeApp(firebaseConfig);

// Initialize Analytics (only in browser)
let analytics;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

export { app, analytics };