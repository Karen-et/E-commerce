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
const alert = document.getElementById("alert");
const form = document.getElementById("form_login");


function checkData(){
    var user = document.getElementById("user").value;

    var password = document.getElementById("password").value;

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

//Validación del Login con Google
const googleButton = document.getElementById("googleLogin");

googleButton.addEventListener("click", (e) => {
  e.preventDefault();
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider).then((result) => {
    var googleUser = firebase.auth().currentUser.displayName;
    localStorage.setItem("user", googleUser);
    window.location.href = "index.html";
    })
  .catch(err => {
    console.log(err);
  })
});

//Validación del Login con Facebook
const faceButton = document.getElementById("faceLogin");

faceButton.addEventListener("click", (e) => {
   console.log("llegué aquí");
  e.preventDefault();
  let provider = new firebase.auth.FacebookAuthProvider();
  auth.signInWithPopup(provider).then((result) => {
    var token = result.credential.accessToken;
    var user = result.user;
    console.log(user);
    // var faceUser = firebase.auth().currentUser.displayName;
    // localStorage.setItem("user", faceUser);
    // window.location.href = "index.html";
    })
  .catch(err => {
    console.log(err);
  })
});


