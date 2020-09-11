
// Validación del login
var alert = document.getElementById("alert")


function checkData(e){
    const btn = document.getElementById("btn");
    const user = document.getElementById("user").value;
    const pass = document.getElementById("password").value;

    if(!user || !pass){
        alert.innerHTML= `<strong>Usuario y/o contraseña incorrectos.</strong>`
    }else{
        e.preventDefault();
        // Almacenar los datos en localStorage
        localStorage.setItem("user", user);
        window.location.href = "index.html";
    }
	
}

btn.addEventListener('click', checkData);


