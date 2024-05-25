// src/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBSTTR60x_U_b96dl3KiySBd59c8wNhwvI",
  authDomain: "shop-db092.firebaseapp.com",
  projectId: "shop-db092",
  storageBucket: "shop-db092.appspot.com",
  messagingSenderId: "66128573478",
  appId: "1:66128573478:web:6da263298afb977c74e2e7"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
