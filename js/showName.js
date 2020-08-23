
  
  function showName(){
    var user = localStorage.getItem("user");
    var name = document.getElementById("name");

    console.log(user.value);
  
  
     name.innerHTML = user;
  }

  showName();

  