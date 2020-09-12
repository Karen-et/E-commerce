function showImages(array){
    let images = document.querySelector("#images");
    let main_img = array[0];

    //Agregar imagenes
    images.innerHTML= `<img src="${main_img}" id="main_img">`;
    for(let img of array){
        images.innerHTML+=`<input type="image" src="${img}" class="img_input">`;
    }
    //Cambiar la imagen principal
    var slider =document.getElementsByClassName("img_input");
    for(let input of slider){
        input.addEventListener("click", event=>{
            document.querySelector("#main_img").src= input.src;
        });
    }

}

//Mostrar la info del producto 
function showProductInfo(product){
    
var name = document.querySelector("#prodName").innerHTML= `${product.name}` ;
var desc = document.querySelector("#desc").innerHTML= `${product.description}` ;
var cost = document.querySelector("#cost").innerHTML= `${product.cost} ${product.currency}` ;
var sold = document.querySelector("#sold").innerHTML=`${product.soldCount} vendidos`;
var category = document.querySelector("#category").innerHTML=`Categoría: <a href="products.html">${product.category}</a>`;
};

//Mostrar artículos relacionados
var products;
function showRelatedProducts(array){
   
    for(let related of array){
        document.querySelector("#relatedProducts").innerHTML+=`<div class="card" style="width: 15rem;">
        <img class="card-img-top" src="${products[related].imgSrc}">
        <div class="card-body">
        <h5 class="card-title">${products[related].name}</h5>
        <h4>${products[related].cost} ${products[related].currency}</h4>
        <p class="card-text">${products[related].description}</p>
        <a href="#" class="btn btn-primary">Ver producto</a>
        </div>
        </div>`
    }
}

//Mostrar comentarios.

function showComments(array){
    for(let comment of array){
            
        var stars = `<span class="fa fa-star checked"></span>`.repeat(comment.score);
        var restStars = `<span class="fa fa-star"></span>`.repeat(5-comment.score);

        document.querySelector("#comments").innerHTML+= `<section class="row">
        <div>
        <h3><i class="fas fa-user"></i></h3s>
        </div>
        <div class="col">
            <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1 name">${comment.user}</h5>
                <br>
                <small>${stars}${restStars}</small>
            </div>
            <div class="d-flex w-100 justify-content-between">
                <p class="mb-1 desc">${comment.description}</p>
                <br>
                <small>${comment.dateTime}</small>
            </div>
        </div>
        </section>
        <hr>`;
    }
};


document.addEventListener("DOMContentLoaded", event=>{
    
    //Trae el JSON con la info y llama a las funciones que la muestran.
     getJSONData(PRODUCT_INFO_URL).then( info =>{
        if (info.status === "ok"){
            showProductInfo(info.data);
            showImages(info.data.images);

            //Trae el JSON de todos los productos
            getJSONData(PRODUCTS_URL).then( array =>{
                if(array.status === "ok"){
                    products = array.data;
                    showRelatedProducts(info.data.relatedProducts);
                    //Trae el JSON de comentarios.
                    getJSONData(PRODUCT_INFO_COMMENTS_URL).then( comments =>{
                        if(comments.status === "ok"){
                           showComments(comments.data);
                        };
                    });
                };
            });
        };
    });
});