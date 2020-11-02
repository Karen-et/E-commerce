var products = {};

// Cotizar todos los productos en pesos UYU.
function priceInUYU(currency, price){
  if(currency === "USD"){
    return price * 40;
  }
  else{
    return price;
  }
};

// Calcular el precio final de los items de cada producto.
function itemSubTotal(product){
  let price = product.querySelector(".price");
  let count = product.querySelector(".count");

  return parseInt(price.innerHTML) * parseInt(count.value);
};

// Contar la cantidad de productos en el carrito y determinar el subtotal.
function totalItemsAndSubtotal(){
  var items = document.getElementsByClassName("count");
  let products = document.getElementsByClassName("product");
  let count = 0;
  let subTotal = 0;

  for(let item of items){
    count += parseInt(item.value);
  }
  document.getElementById("product_count").innerHTML = `${count}`;

  for(let item of products){
    subTotal += itemSubTotal(item);
  }
  document.getElementById("subtotal").innerHTML= `${subTotal}`;
  return subTotal;
};

// Calcular costo de envio
function shippingCost(){
  let shippingMethod = document.querySelector("#shipping");
  let option = shippingMethod.querySelector(":checked").value;
   
  let shippingCost = Math.round(option * totalItemsAndSubtotal());
  
  document.querySelector("#send").innerHTML = `${shippingCost}`;
  return shippingCost;
  }

// Determinar el precio final del pedido.

function finalPrice(){
  let total = totalItemsAndSubtotal() + shippingCost();
  document.getElementById("total").innerHTML = `${total}`;
}

// Actulizar la información si se agregan o quitan items.
function updateData(){
  totalItemsAndSubtotal();
  shippingCost();
  finalPrice();
}

// Actualizar la información si se cambia el método de envío.
function updateShipping(){
  shippingCost();
  finalPrice();
}

// Eliminar producto del carrito.
function deletedProduct(btn){
    let parent = document.getElementById("Cart");
    let product = document.getElementById(btn);

    parent.removeChild(product);
    updateData();
}

// Mostrar productos en el carrito.
function showProductsCart(array){
    var newItems = "";
    let subTotal = document.querySelector("#Cart").firstChild;
    let contadorID = 0;

    for(let item of array){
      let price = priceInUYU(item.currency, item.unitCost);
      contadorID += 1;
      newItems += `<li id="${contadorID}" class="list-group-item d-flex justify-content-between product">
          <div class="row">
            <div>
              <img src="${item.src}" style="height: 3.5em;">
            </div>
            <div>
              <h6 class="my-0">${item.name}</h6>
              </span><span>$</span><span class="text-muted price">${price}
            </div>
          </div>
          <div>
              <div>
                <small class="qty mt-5"><input type="number" onchange="updateData()" class="count" value="${item.count}" min="1" style="width: 3em ;"></small>
              </div>
              <div>
              <button type="button" class="btn btn-link trash" onclick="deletedProduct(${contadorID});"><i class="fas fa-trash-alt"></i></button>
              </div>
          </div>
        </li>`
    }
    $(newItems).insertBefore(subTotal);
};

getJSONData(CART_INFO_URL).then(resultObj =>{
  if (resultObj.status === "ok"){
  products = resultObj.data.articles;}
  showProductsCart(products);
  totalItemsAndSubtotal();
  shippingCost();
  finalPrice();
});

