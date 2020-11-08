// Botones de control del perfil.
const btnEdit = document.querySelector("#edit");
const btnSave = document.querySelector("#save");
const btnCancel = document.querySelector("#cancel");

var allInputs = document.getElementsByClassName("form-control"); // Inputs del formulario.
var AvatarInput = document.querySelector("#image_file"); // Input para cargar imagen.
var userProfile = localStorage.getItem("UserProfile");
var AvatarURL = localStorage.getItem("userAvatar");


// Cargar los datos del perfil si estos existen.
function loadUserProfile(){
    if(userProfile){
        let data = JSON.parse(userProfile);
        document.querySelector("#firstName").value = data.FirstName;
        document.querySelector("#lastName").value = data.LastName;
        document.querySelector("#phone").value = data.Phone;
        document.querySelector("#email").value = data.Email;
        document.querySelector("#age").value = data.Age;
    }
    
    for(let input of allInputs){
        input.disabled = true;
    }
};

// Cargar foto de perfil si esta existe.
function loadAvatar(){
    if(AvatarURL){
        document.getElementById("avatar").src = AvatarURL;
    };
};

// Habilitar edición de perfil.
function editProfile(){
    btnEdit.style.display = "none";
    btnSave.style.display = "block";
    btnCancel.style.display = "block";

    for(let input of allInputs){
        input.disabled = false;
    }
};

// Guardar cambios.
function saveProfile(){
    btnEdit.style.display = "block";
    btnSave.style.display = "none";
    btnCancel.style.display = "none";

    let data = {
        FirstName : document.querySelector("#firstName").value,
        LastName : document.querySelector("#lastName").value,
        Age : document.querySelector("#age").value,
        Phone : document.querySelector("#phone").value,
        Email : document.querySelector("#email").value
    }

    localStorage.setItem("UserProfile", JSON.stringify(data));
    
    for(let input of allInputs){
        input.disabled = true;
    }
};

// Cancelar cambios.
function cancelEdit(){
    btnEdit.style.display = "block";
    btnSave.style.display = "none";
    btnCancel.style.display = "none";
    
    // Vuelve a cargar los datos guardados.
    if(userProfile){
        loadUserProfile()
    }
    else{
        for(let input of allInputs){
            input.value = "";
        }
    }

    for(let input of allInputs){
        input.disabled = true;
    }
}
    
// Cambiar foto de perfil.
function changeAvatar(){
    const image = new FileReader();
    // Cuando se carga la imagen en el lector se cambia el avatar
    // y se setea la nueva URL en localStorage.
    image.addEventListener("load", () =>{
        let newURL = image.result;
        document.getElementById("avatar").src = newURL;
        localStorage.setItem("userAvatar", newURL);
    })

    image.readAsDataURL(AvatarInput.files[0])
};

//******************** EventListeners ********************//

document.addEventListener("DOMContentLoaded", () => {
    loadUserProfile();
    loadAvatar();
});

btnEdit.addEventListener("click", editProfile);
btnSave.addEventListener("click", saveProfile);
btnCancel.addEventListener("click", cancelEdit);

AvatarInput.addEventListener("change", changeAvatar);