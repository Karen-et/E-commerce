//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

function showProductsList(data){
    let content = document.getElementById("products")
    content.innerHTML = ""
    for(let product of data){
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
}

document.addEventListener("DOMContentLoaded", event =>{

getJSONData(PRODUCTS_URL).then(json =>{
    if (json.status === "ok"){
        showProductsList(json.data);
    }
});
