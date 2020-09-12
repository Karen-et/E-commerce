const ORDER_ASC_BY_PRICE = "MENOR PRECIO";
const ORDER_DESC_BY_PRICE = "MAYOR PRECIO";
const ORDER_BY_SOLD_COUNT = "RELEVANCIA";
var currentProductsArray = [];
var currentSortCriteria;
var minCount ;
var maxCount ;

function sortProducts(criteria, array){
    let result = [];
    // Se ordenan por menor precio
    if (criteria === ORDER_ASC_BY_PRICE)
    {
        result = array.sort(function(a, b) {
            if ( a.cost < b.cost ){ return -1; }
            if ( a.cost > b.cost ){ return 1; }
            return 0;
        });
    // Se ordenan por mayor precio
    }else if (criteria === ORDER_DESC_BY_PRICE){
        result = array.sort(function(a, b) {
            if ( a.cost > b.cost ){ return -1; }
            if ( a.cost < b.cost ){ return 1; }
            return 0;
        });
    // Se ordenan por mayor relevancia
    }else if (criteria === ORDER_BY_SOLD_COUNT){
        result = array.sort(function(a, b) {
            if ( a.soldCount > b.soldCount ){ return -1; }
            if ( a.soldCount < b.soldCount ){ return 1; }
            return 0;
        });
    }

    return result;
}

function showProductsList(){

    let htmlContentToAppend = "";
    for(let product of currentProductsArray){

        if (((minCount == undefined) || (minCount != undefined && product.cost >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && product.cost <= maxCount))){

            htmlContentToAppend += `
            <a href="product-info.html" class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + product.imgSrc + `" alt="` + product.description + `" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1 name">`+ product.name +`</h4>
                        <small class="text-muted">` + product.soldCount + ` vendidos</small>
                    </div>
                    <p class="mb-1 desc">` + product.description + `</p>
                    <br>
                    <h5>` + product.cost + ` ` + product.currency + `.</h5>
                </div>
            </div>
            </a>
        `
        }

        document.querySelector("#cat-list-container").innerHTML = htmlContentToAppend;
    }
}

function sortAndShowProducts(sortCriteria, productsArray){
    currentSortCriteria = sortCriteria;

    if(productsArray != undefined){
        currentProductsArray = productsArray;
    }

    currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);

    //Muestro los productos ordenados
    showProductsList();
}

//Trae el json con los productos y los despliega según el más vendido.
document.addEventListener("DOMContentLoaded", e =>{
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            sortAndShowProducts(ORDER_BY_SOLD_COUNT, resultObj.data);
        }
    });

    // El usuario selecciona ordenar por menor precio.
    document.querySelector("#sortAsc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_ASC_BY_PRICE);
    });

    // El usuario selecciona ordenar por mayor precio.
    document.querySelector("#sortDesc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_DESC_BY_PRICE);
    });

    // El usuario selecciona ordenar por relevancia.
    document.querySelector("#sortByCount").addEventListener("click", function(){
        sortAndShowProducts(ORDER_BY_SOLD_COUNT);
    });

    // Limpia el filtro de precios
    document.querySelector("#clearRangeFilter").addEventListener("click", function(){
        document.querySelector("#rangeFilterCountMin").value = "";
        document.querySelector("#rangeFilterCountMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        showProductsList();
    });

    document.querySelector("#rangeFilterCount").addEventListener("click", function(){
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de artículos vendidos.
        newMinCount = document.querySelector("#rangeFilterCountMin").value;
        newMaxCount = document.querySelector("#rangeFilterCountMax").value;

        if ((newMinCount != undefined) && (newMinCount != "") && newMinCount >= 0){
            minCount = newMinCount;
        }
        else{
            minCount = undefined;
        }

        if ((newMaxCount != undefined) && (newMaxCount != "") && newMaxCount >= 0){
            maxCount = newMaxCount;
        }
        else{
            maxCount = undefined;
        }

        showProductsList();
    });
});

//Buscador

var searchInput = document.querySelector("#search");

searchInput.addEventListener("input", event =>{
    let search = searchInput.value.toUpperCase();
    let container = document.querySelector("#cat-list-container");
    let articules = container.getElementsByTagName("a");

    for(let articule of articules){
        let name = articule.getElementsByClassName("name")[0].innerHTML;
        let desc = articule.getElementsByClassName("desc")[0].innerHTML;
        
        //Si el artículo no coincide con la busqueda lo oculta.
        if(name.toUpperCase().includes(search) || desc.toUpperCase().includes(search)){
            articule.style.display= "block";
        } else{
            articule.style.display= "none";
        }
    }

})