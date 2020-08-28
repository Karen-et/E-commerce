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
                        <h4 class="mb-1" .name>`+ product.name +`</h4>
                        <small class="text-muted">` + product.soldCount + ` vendidos</small>
                    </div>
                    <p class="mb-1" id="description">` + product.description + `</p>
                    <br>
                    <h5>` + product.cost + ` ` + product.currency + `.</h5>
                </div>
            </div>
            </a>
        `
        }

        console.log(typeof product.soldCount)

        document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
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
    document.getElementById("sortAsc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_ASC_BY_PRICE);
    });

    // El usuario selecciona ordenar por mayor precio.
    document.getElementById("sortDesc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_DESC_BY_PRICE);
    });

    // El usuario selecciona ordenar por relevancia.
    document.getElementById("sortByCount").addEventListener("click", function(){
        sortAndShowProducts(ORDER_BY_SOLD_COUNT);
    });

    // Limpia el filtro de precios
    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        showProductsList();
    });

    document.getElementById("rangeFilterCount").addEventListener("click", function(){
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de artículos vendidos.
        newMinCount = document.getElementById("rangeFilterCountMin").value;
        newMaxCount = document.getElementById("rangeFilterCountMax").value;

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
