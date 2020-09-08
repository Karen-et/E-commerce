var newComment = document.getElementById("commentBtn");

newComment.addEventListener("click", event=>{
    //Obtener fecha y hora del comentario.
    var dateTime = new Date();
        var year = dateTime.getFullYear();
        var month = dateTime.getMonth();
        var day = dateTime.getDate();
        var hours = dateTime.getHours();
        var minutes = dateTime.getMinutes();
        var seconds = dateTime.getUTCSeconds();

    //Capturar puntuación que da el usuario.
    var starsBox = document.getElementsByName("star");
    for(let star of starsBox){
        if(star.checked == true){
            var stars = `<span class="fa fa-star checked"></span>`.repeat(star.value);
            var restStars = `<span class="fa fa-star"></span>`.repeat(5-star.value); 
        }
    }

    //Capturar nombre y opinion del usuario.
    var user = localStorage.getItem("user");
    var opinion = document.getElementById("opinion").value;


    document.getElementById("comments").innerHTML+= `<div class="row">
    <div>
    <h3><i class="fas fa-user"></i></h3s>
    </div>
    <div class="col">
        <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1 name">${user}</h5>
            <br>
            <small>${stars}${restStars}</small>
        </div>
        <div class="d-flex w-100 justify-content-between">
            <p class="mb-1 desc">${opinion}</p>
            <br>
            <small>${year}-${month+1}-${day} ${hours}:${minutes}:${seconds}</small>
        </div>
    </div>
    </div>
    <hr>`;
});


