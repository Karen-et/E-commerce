// var newComment = document.getElementById("newComment");

// newComment.addEventListener("input", event=>{
    
//     //Obtener fecha y hora del comentario.
//     function getDateTime(){
//         var dateTime = new Date();
//             var year = dateTime.getFullYear();
//             var month = dateTime.getMonth();
//             var day = dateTime.getUTCDay();
//             var hours = dateTime.getHours();
//             var minutes = dateTime.getMinutes();
//             var seconds = dateTime.getUTCSeconds();
//     }
//     getDateTime();

//     function addNewComment(){
//         let opinion = document.getElementById("opinion");
        
//     }

// });

document.addEventListener("DOMContentLoaded", event=>{
    var starsBox = document.getElementsByClassName("star");
    for(let star of starsBox){
        star.addEventListener("click", event=>{
            star.classList.add("checked");
        })
    }
});


