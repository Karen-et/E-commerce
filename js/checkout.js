var shippingInputs = document.getElementsByClassName("data");
var creditInputs = document.getElementsByClassName("credit");
var country = document.getElementById("country");
var cart_Count = document.getElementById("product_count");

//Verificar los datos de envio.
function shippingData(){
    let checked = true;
    for(let input of shippingInputs){
        if(!input.value){
            input.classList.add("is-invalid");
            ckecked = false;
        }
    }
    // Acceder al país seleccionado.
    let selectedCountry = country.options[country.selectedIndex];
    if(!selectedCountry.value){
        country.classList.add("is-invalid");
        checked = false;
    }
    return checked;
}

let checkoutBtn = document.getElementById("checkout");

checkoutBtn.addEventListener("click", event =>{
    event.preventDefault();
    shippingData();
});