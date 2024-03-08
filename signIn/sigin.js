
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getDatabase, push, set, ref } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";
import { signInWithEmailAndPassword, getAuth } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-analytics.js";

const firebaseConfig = {
    apiKey: "AIzaSyDqT6KtHi5_OFVgl9z2gZjB0UqkUJRuuD0",
    authDomain: "todoapp-fb3f5.firebaseapp.com",
    projectId: "todoapp-fb3f5",
    storageBucket: "todoapp-fb3f5.appspot.com",
    messagingSenderId: "150903451948",
    appId: "1:150903451948:web:cc650efd52b12433097c89",
    measurementId: "G-HBY8EQCWG6"
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase();
const auth = getAuth();



let userMail = document.getElementById('mail')
let userPassword = document.getElementById('password');

window.signIn = function (e) {
    e.preventDefault();

    signInWithEmailAndPassword(auth, userMail.value, userPassword.value).then(function (suc) {
        console.log(suc.message, "ok hu gya");
        window.location.href = "/todo/index.html"

    }).catch (function(eror) {
    console.log(eror.message, "nahi hova")
    alert("wrong detial")
})

userMail.value ="";
userPassword.value ="";
};
