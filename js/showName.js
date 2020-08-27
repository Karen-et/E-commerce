
  // Mostrar nommbre
  function showName(){
    var user = localStorage.getItem("user");
    var name = document.getElementById("name");

    console.log(user.value);
  
  
     name.innerHTML = user + " &#x2630";
  }

  showName();

  //Desplegar al poner el cursor encima
$('#options').hover(function(){	
	$(this).find('ul').slideToggle('slow');	
});


// Cerrar Sesión

var logOutBtn = document.getElementById("logOut");

function logOut(){
  localStorage.removeItem("user");
  window.location.href="login.html"
}

logOutBtn.addEventListener("click", logOut);

  