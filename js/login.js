

// Validación del login
var btn = document.getElementById("btn");
var user = document.getElementById("user");
var password = document.getElementById("password");

var alert = document.getElementById("alert")


function checkData(e){
    if(user.value === "" || password.value === ""){
        alert.innerHTML= `<strong>Usuario y/o contraseña incorrectos.</strong>`
        e.preventDefault();

    }else{
    // Almacenar los datos en localStorage

    sessionStorage.setItem("user", user.value);
    sessionStorage.setItem("password", password.value);

    window.location.href = "index.html";
    e.preventDefault();
	}
	
	
}

btn.addEventListener('click', checkData)


