import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getDatabase, push, set, ref, onValue } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";
import { createUserWithEmailAndPassword, getAuth } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-analytics.js";

const firebaseConfig = {
    apiKey: "AIzaSyDqT6KtHi5_OFVgl9z2gZjB0UqkUJRuuD0",
    authDomain: "todoapp-fb3f5.firebaseapp.com",
    databaseURL: "https://todoapp-fb3f5-default-rtdb.firebaseio.com",
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


var input = document.getElementById('inpt')
var list = document.getElementById('list1')

let refrence = ref(db, `userInput/`);

onValue(refrence, function (data) {
    list.innerHTML = "";
    let inptData = data.val();
    console.log(Object.values(inptData));
    for (let i = 0; i < Object.values(inptData).length; i++) {
        console.log(Object.values(inptData)[i].value)

        let b = Object.values(inptData)[i].id
        let createLi = document.createElement("li");
        createLi.setAttribute("data-id", b);
        let text = document.createTextNode(Object.values(inptData)[i].value);
        createLi.appendChild(text);
        list.appendChild(createLi);

        // Edit button
        let creatEditBtn = document.createElement("button");
        creatEditBtn.setAttribute("onclick", "edit(this)");
        creatEditBtn.setAttribute("class", "list-btn1");
        let editBtnTxt = document.createTextNode("Edit");
        creatEditBtn.appendChild(editBtnTxt);
        createLi.appendChild(creatEditBtn);

        // Delete button
        let creatDeleteBtn = document.createElement("button");
        creatDeleteBtn.setAttribute("onclick", "deleteText(this)");
        // creatDeleteBtn.setAttribute("id", b)
        creatDeleteBtn.setAttribute("class", "list-btn");
        let deleteBtnTxt = document.createTextNode("Delete");
        creatDeleteBtn.appendChild(deleteBtnTxt);
        createLi.appendChild(creatDeleteBtn);
    }
});

window.addList = function () {
    if (input.value === "") {
        return alert("Input Field is required");
    }
    else {
        let obj1 = {
            value: input.value
        };
        obj1.id = push(ref(db, `userInput/`)).key;
        let refrence = ref(db, `userInput/${obj1.id}`);
        set(refrence, obj1)
        input.value = "";



    }
}

window.edit = function (a) {
    let b = prompt("Enter Updated Text")
    let id = a.parentNode.getAttribute("data-id");
    let itemRef = ref(db, `userInput/${id}`);
    
    set(itemRef, { value: b }).then(function(){
        a.parentNode.firstChild.nodeValue = b;
    });
}


window.deleteText = function (e) {
    let id = e.parentNode.getAttribute("data-id");
    let itemRef = ref(db, `userInput/${id}`);
    set(itemRef, null).then(function () {
        e.parentNode.remove();
    }).catch(function (error) {
        console.log("Error deleting item from the database: ", error);
    });
}

window.deltAll = function () {
    let alItemRef = ref(db,`userInput`)
    set(alItemRef,null)
    document.getElementById('list1').innerHTML = "" 
} 




