import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

//node package firebase
import * as firebase from 'firebase';

//lisan firebase konfiguratsiooni
const firebaseConfig = {
  apiKey: "AIzaSyA42YxRZ_mtwbyZbjr12k8QESL97G0sS_0",
  authDomain: "datediary-ad9fb.firebaseapp.com",
  databaseURL: "https://datediary-ad9fb.firebaseio.com",
  projectId: "datediary-ad9fb",
  storageBucket: "datediary-ad9fb.appspot.com",
  messagingSenderId: "961859094094",
  appId: "1:961859094094:web:e854ca65e26029b00fe51f",
  measurementId: "G-FJDDJ8HR6N"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
