
// Autenticación
var btn = document.getElementById("btn");
var user = document.getElementById("user");
var password = document.getElementById("password");

var alert = document.getElementById("alert")


function checkData(e){
    if(user.value === "" || password.value === ""){
        alert.innerHTML= `<strong>Usuario y/o contraseña incorrectos.</strong>`
        e.preventDefault();

    }else{
        window.location.href = "index.html";
        e.preventDefault();
    }
}

btn.addEventListener('click', checkData)

// Efecto del login

document.addEventListener("DOMContentLoaded", event =>{

const inputs = document.querySelectorAll(".input");


function addcl(){
	let parent = this.parentNode.parentNode;
	parent.classList.add("focus");
}

function remcl(){
	let parent = this.parentNode.parentNode;
	if(this.value == ""){
		parent.classList.remove("focus");
	}
}


inputs.forEach(input => {
	input.addEventListener("focus", addcl);
	input.addEventListener("blur", remcl);
});

});


