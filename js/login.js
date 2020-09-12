// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyC3J8NQicfjh3YoC-O9IwSdvLK99WjOqus",
    authDomain: "e-mercado-4aadd.firebaseapp.com",
    databaseURL: "https://e-mercado-4aadd.firebaseio.com",
    projectId: "e-mercado-4aadd",
    storageBucket: "e-mercado-4aadd.appspot.com",
    messagingSenderId: "726224731443",
    appId: "1:726224731443:web:e331e6fb5cedbb880d5246"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
  const fs = firebase.firestore();


// Validación del login con usuario
const alert = document.querySelector("#alert");
const form = document.querySelector("#form_login");


function checkData(){
    var user = document.querySelector("#user").value;
    var password = document.querySelector("#password").value;

    if(!user || !password){
        alert.innerHTML= `<strong>Usuario y/o contraseña incorrectos.</strong>`;
    }
    else{
    // Almacenar los datos en localStorage
    localStorage.setItem("user", user);
    window.location.href = "index.html";     
    }
	
}

form.addEventListener('submit', event=>{
    event.preventDefault();
    checkData();
});

//Validación del Login con Google.
const googleButton = document.querySelector("#googleLogin");

googleButton.addEventListener("click", event => {
  event.preventDefault();
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider).then((result) => {
    //Setear el nombre de usuario de Google como user.
    var googleUser = firebase.auth().currentUser.displayName;
    localStorage.setItem("user", googleUser)
    window.location.href = "index.html";
    })
  .catch(err => {
    console.log(err);
  })
});

//Validación del Login con Facebook.
const faceBtn = document.querySelector("#faceLogin");

faceBtn.addEventListener("click", event => {
  event.preventDefault();
  const provider = new firebase.auth.FacebookAuthProvider();
  auth.signInWithPopup(provider).then((result) => {
    //Setear el nombre de usuario de Facebook como user.
    var faceUser = firebase.auth().currentUser.displayName;
    localStorage.setItem("user", faceUser)
    window.location.href = "index.html";
    })
  .catch(err => {
    console.log(err);
  })
});


