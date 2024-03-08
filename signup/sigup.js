import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getDatabase,push,set,ref} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";
import { createUserWithEmailAndPassword,getAuth} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
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

var obj={};

let userName = document.getElementById('name')
let userMail = document.getElementById('mail')
let userPassword = document.getElementById('password');

window.signup = function(e){
e.preventDefault();

obj.name = userName.value;
obj.mail = userMail.value;
obj.password = userPassword.value;
console.log(obj);

createUserWithEmailAndPassword(auth,obj.mail,obj.password).then(function(suc){
  obj.id = suc.user.uid
  alert(" Congratulations Account is created")
  let refrence = ref(db,`user/${obj.id}`);
  
  push(refrence, obj).then(function(userAd){
    window.location.href = "/signIn/signIn.html"
  })
}).catch(function(eror){
  console.log(eror.message);
  alert(eror.message)
})

userName.value="";
userMail.value="";
userPassword.value="";
}








