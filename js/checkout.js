
var shippingInputs = document.getElementsByClassName("data"); // Datos del usuario para el envio.
var credit = document.getElementById("credit");               // Input de tarjeta de crédito.
var creditInputs = document.getElementsByClassName("credit"); // Datos de la tarjeta de crédito.
var wire_transfer = document.getElementById("wire_transfer"); // Input de la transferencia bancaria.
var banc_account = document.getElementById("banc_account"); // Número de  cuenta bancaria.
var country = document.getElementById("country");            // País.

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
    // Verifica los datos de la tarjeta si se selecciona esta opción.
    if(credit.checked){
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
    // Verifica el número de cuenta si se selecciona esta opción.
    else{
        if(!banc_account.value){
            banc_account.classList.add("is-invalid")
            paymentOK = false;
        }
        for(let input of creditInputs){
            input.classList.remove("is-invalid");
        }
    }
    
};


// Autoriza la compra si todos los campos están completos y hay al menos un articulo en el carrito..
function checkout(){

    let product_Count = document.getElementById("product_count").innerText; // Cantidad de productos en el carrito.
    shippingData();
    paymentData();

    // Todo Ok.
    if( shippingOK && paymentOK && product_Count > 0){
        $('#confirmed').modal('show');
    }

    else{// Error en los datos de envío.
        if(shippingOK==false){
            $('#shippingfail').modal('show');
        }
        else{
            // Error en los datos de pago.
            if(paymentOK==false){
                $('#paymentModal').modal('show');
            }
            // Carrito vacío
            else{
                $('#emptyCart').modal('show');
            }
        }
    }
};

let checkoutBtn = document.getElementById("checkout");

checkoutBtn.addEventListener("click", event =>{
    event.preventDefault();
    checkout();
});