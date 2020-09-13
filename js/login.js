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
const googleBtn = document.getElementById("googleLogin");

googleBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider).then((result) => {
    var user = result.user;
    console.log(user)
    var googleUser = user.displayName;
    localStorage.setItem("user", googleUser);
    window.location.href = "index.html";
    })
  .catch(err => {
    console.log(err);
  })
});

//Validación del Login con GitHub.
 const gitHubBtn = document.getElementById("gitHubLogin");

 gitHubBtn.addEventListener("click", (e) => {
   e.preventDefault();
   var provider = new firebase.auth.GithubAuthProvider();
   auth.signInWithPopup(provider).then((result) => {
     var user = result.user;
     console.log(user)
     var gitHubUser = user.email;
     localStorage.setItem("user", gitHubUser);
     window.location.href = "index.html";
     })
   .catch(err => {
     console.log(err);
   })
 });

 //Validación del Login con Facebook.
 const facebookBtn = document.getElementById("facebookLogin");

 facebookBtn.addEventListener("click", (e) => {
   e.preventDefault();
   var provider = new firebase.auth.FacebookAuthProvider();
   auth.signInWithPopup(provider).then((result) => {
     var user = result.user;
     console.log(user)
     var facebookUser = user.displayName;
     localStorage.setItem("user", facebookUser);
     window.location.href = "index.html";
     })
   .catch(err => {
     console.log(err);
   })
 });


