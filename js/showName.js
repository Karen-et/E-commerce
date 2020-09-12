
  // Mostrar nombre
  function showName(){
    var user = localStorage.getItem("user");
    var name = document.querySelector("#name");
    
     name.innerHTML = user + " &#x2630";
  }

  showName();

  //Desplegar al poner el cursor encima
$('#options').hover(function(){	
	$(this).find('ul').slideToggle('slow');	
});


// Cerrar Sesión

var logOutBtn = document.querySelector("#logOut");

function logOut(){
  localStorage.removeItem("user");
  window.location.href="login.html"
}

logOutBtn.addEventListener("click", logOut);

  
