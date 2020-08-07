//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e){

    // Función que trae la información
showSpinner();
function GetJsonData(){
    fetch(PRODUCTS_URL)
    .then(respuesta => respuesta.json())
    .then(datos => {
        showProductsList(datos)
    })
    .catch(err => {
            console.log(err)})
    }
    GetJsonData();
    

    // Función que muestra los productos

    function showProductsList(datos){
        let content = document.getElementById("products")
        content.innerHTML = ""
        for(let product of datos){
        content.innerHTML += `
            <div class="row">
                <div class="col-3">
                    <img src="` + product.imgSrc + `" alt="` + product.description + `" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">`+ product.name +`</h4>
                        <small class="text-muted">` + product.soldCount + ` vendidos</small>
                    </div>
                    <p class="mb-1">` + product.description + `</p>
                    <br>
                    <h5>` + product.cost + ` ` + product.currency + `.</h5>
                </div>
            </div>
            <hr>
        `
        }
        hideSpinner();
    }


});
