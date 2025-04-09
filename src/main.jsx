import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'


import { initializeApp } from 'firebase/app';





const firebaseConfig = {
  apiKey: "AIzaSyBybGA0KRApRumJPxIAscAT9lrCWngq_AA",
  authDomain: "react-chat-app-4e5dc.firebaseapp.com",
  databaseURL: "https://react-chat-app-4e5dc-default-rtdb.firebaseio.com",
  projectId: "react-chat-app-4e5dc",
  storageBucket: "react-chat-app-4e5dc.firebasestorage.app",
  messagingSenderId: "655970481273",
  appId: "1:655970481273:web:6b0933aa74a3d40dd0d0a8"
};


const app = initializeApp(firebaseConfig);


createRoot(document.getElementById('root')).render(
    <App />
    
)
