function showImages(array){
let images = document.getElementById("images");
let main_img = array[0];

//Agregar imagenes
images.innerHTML= `<img src="`+main_img+`" id="main_img">`;
for(let img of array){
    images.innerHTML+=`<input type="image" src="`+img+`" class="img_input">`;
}
//Cambiar la imagen principal
var slider =document.getElementsByClassName("img_input");
for(let input of slider){
    input.addEventListener("click", event=>{
    document.getElementById("main_img").src= input.src;
    });
}

}

//Mostrar la info del producto 
function showProductInfo(product){
    
var name = document.getElementById("prodName").innerHTML= ``+product.name+`` ;
var desc = document.getElementById("desc").innerHTML= ``+product.description+`` ;
var cost = document.getElementById("cost").innerHTML= ``+product.cost+` `+product.currency+`` ;
var sold = document.getElementById("sold").innerHTML=`` + product.soldCount + ` vendidos`;
var category = document.getElementById("category").innerHTML=`Categoría: <a href="products.html">`+product.category+`</a>`;
};

//Mostrar artículos relacionados
var products;
function showRelatedProducts(array){
   
    for(let related of array){
    document.getElementById("relatedProducts").innerHTML+=`<div class="card" style="width: 18rem;">
    <img class="card-img-top" src="`+products[related].imgSrc+`" alt="Card image cap">
    <div class="card-body">
      <h5 class="card-title">`+products[related].name+`</h5>
      <h4>`+products[related].cost+``+products[related].currency+`</h4>
      <p class="card-text">`+products[related].description+`</p>
      <a href="#" class="btn btn-primary">Ver producto</a>
    </div>
  </div>`
    }
}

//Trae el JSON de productos
document.addEventListener("DOMContentLoaded", event=>{
    getJSONData(PRODUCTS_URL).then( array =>{
        if(array.status === "ok"){
        products = array.data;
        }
    })
})

document.addEventListener("DOMContentLoaded", event =>{

//Trae el JSON con la info y llama a las funciones que la muestran.
getJSONData(PRODUCT_INFO_URL).then( info =>{
    if (info.status === "ok"){
        showProductInfo(info.data);
        showImages(info.data.images)
        showRelatedProducts(info.data.relatedProducts)
    }
});

});