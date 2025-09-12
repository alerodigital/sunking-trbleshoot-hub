import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};


// Initialize Firebase
let app;
let auth;
let db;

try {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
    // console.log('Firebase initialized successfully');
  } catch (error) {
    // console.error('Firebase initialization error:', error);
    // Fallback: try to initialize with empty config to prevent app crash
    try {
      app = initializeApp({});
      auth = getAuth(app);
      db = getFirestore(app);
    } catch (fallbackError) {
      console.error('Firebase fallback initialization failed:', fallbackError);
    }
  }
  
  export { auth, db };
  export default app;

//Initialize Firebase
// const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
// export const auth = getAuth(app);

//Initialize Cloud Firestore and get a reference to the service
// export const db = getFirestore(app);


// export {auth, db}

// export default app;