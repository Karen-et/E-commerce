
const shippingInputs = document.getElementsByClassName("data"); // Datos del usuario para el envio.
const credit = document.getElementById("credit");               // Input de tarjeta de crédito.
const creditInputs = document.getElementsByClassName("credit"); // Datos de la tarjeta de crédito.
const wire_transfer = document.getElementById("wire_transfer"); // Input de la transferencia bancaria.
const banc_account = document.getElementById("banc_account"); // Número de  cuenta bancaria.
const country = document.getElementById("country");            // País.

var shippingOK = true;
var paymentOK = true;


//Verificar los datos de envio.
function shippingData(){
    shippingOK = true;
    for(let input of shippingInputs){
        if(!input.value){
            input.classList.add("is-invalid");
            shippingOK = false;
        }
        else{
            input.classList.add("is-valid");
            input.classList.remove("is-invalid");
        }
    }
    // Acceder al país seleccionado.
    let selectedCountry = country.options[country.selectedIndex];
    if(!selectedCountry.value){
        country.classList.add("is-invalid");
        shippingOK = false;
    }
    else{
        country.classList.add("is-valid");
        country.classList.remove("is-invalid");
    }
};

//Verificar los datos de pago.
function paymentData(){
    paymentOK = true;

    if(!credit.checked && !wire_transfer.checked){
        paymentOK = false;
    }
    else{
        if(credit.checked){ // Verifica los datos de la tarjeta si se selecciona esta opción.
            for(let input of creditInputs){
                if(!input.value){
                    input.classList.add("is-invalid");
                    paymentOK = false; 
                }
                else{
                    input.classList.add("is-valid");
                    input.classList.remove("is-invalid");
                }
            }
            banc_account.classList.remove("is-invalid");
        }
        else{ // Verifica el número de cuenta si se selecciona esta opción.
            if(!banc_account.value){
                banc_account.classList.add("is-invalid")
                paymentOK = false;
            }
            for(let input of creditInputs){
                input.classList.remove("is-invalid");
            }
        }
    }
    
};


// Autoriza la compra si todos los campos están completos y hay al menos un articulo en el carrito.
function checkout(){

    let product_Count = document.getElementById("product_count").innerText; // Cantidad de productos en el carrito.
    
    if(product_Count == 0){ // Carrito vacío.
        $('#emptyCart').modal('show');
    }
    else{
        shippingData();
        if(!shippingOK){ // Error en los campos de envío.
            $('#shippingfail').modal('show');
        }
        else{
            paymentData();
            if(!paymentOK){ // Error en los datos de pago.
                $('#paymentModal').modal('show');
            }
            else{ // Todo ok.
                $('#confirmed').modal('show');
            }
        }
    }
};

let checkoutBtn = document.getElementById("checkout");

checkoutBtn.addEventListener("click", event =>{
    event.preventDefault();
    checkout();
});