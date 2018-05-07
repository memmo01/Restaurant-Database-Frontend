let a =0;
let b =0;


$(".addRest").on("click",function(){
    populateAddRest()
    
})


function toPage(data){
     $(".results").empty()
    for(i=0;i<data.length;i++){
        var package={
            id:data[i].id,
        name:data[i].rest_name,
        location:data[i].location,
        nationality:data[i].nationality,
        category:data[i].category,
        rating:data[i].rating
        }

        createRow(package)
    }
    
     $(".moreInfoBtn").on("click",function(e){
         e.preventDefault()
         $(".modal-body").empty()
    var id=($(this).val())
        populateModalInfo(id)
})

}




function createRow(package){
    var stars="";
    var starIcon = "<i class='fas fa-star'></i>"
if(package.rating === 1){
    stars= starIcon;
}
else if(package.rating ===2){
    stars= starIcon+starIcon;

}else if(package.rating === 3){
stars =starIcon+starIcon+starIcon;
}
else if(package.rating === 4){
stars=starIcon+starIcon+starIcon+starIcon;
}else if(package.rating === 5){
stars=starIcon+starIcon+starIcon+starIcon+starIcon;}



    let row = $("<tr>");
    let data = "<td>"+package.name+"</td> <td>"+package.location+"</td><td>"+package.category+"</td><td>"+package.nationality+"</td><td>"+stars+"</td><td>";
    data+="<button type='button' class='btn btn-secondary moreInfoBtn'data-toggle='modal' data-target='#restModal' value="+package.id+"><i class='fas fa-utensils'></i></button></td>";
    row.addClass("col-lg-12 llll");
    (row).append(data);

    $(".results").append(row);

    
}

$(".ratingBtn").on("click",function(){
    let category =($(this).val())
     getInfo("rating",category)
})

$(".costBtn").on("click",function(){
    let category= ($(this).val())
      getInfo("cost",category)
})

$(".categoryBTN").on("click",function(){
   let category =($(this).val())
  getInfo("category",category)
})
$(".clear").on("click",function(){
    $(".results").empty()
    $(".results").css("display","none")
})

$(".findAllOption").on("click",function(){
    $(".results").css("display","block")
a=0;
b=10;
    trial1(a,b)
})





//this gathers the list of all restaurant results and controls how many are shown on the screen at once
function trial1(a,b){
    $(".results").empty()
        $.get("/api/list",function(results){

        for(i=a;i<b;i++){
           var package={
            id:results[i].id,
        name:results[i].rest_name,
        location:results[i].location,
        nationality:results[i].nationality,
        category:results[i].category,
        rating:results[i].rating
        }
    console.log(package.id+"here is this id")
        createRow(package)
        }

        
    var nextButton="<button id='next'>next</button>";
    var backButton="<button id='back'>back</button>";
    $(".results").append(nextButton);
    $(".results").append(backButton);


   $("#next").on("click",function(){
       if(b=== results.length){
           alert("there are no more results")
       }
    else{
       $(".results").empty()
      pages('increase',results)
        }
    })
       $("#back").on("click",function(){
        if(a === 0){
        alert("you cannot go back")
        }
    else{
       $(".results").empty()
      pages('decrease',results);
    }
    })
         $(".moreInfoBtn").on("click",function(e){
         e.preventDefault()
         $(".modal-body").empty()
    var id=($(this).val())
    console.log(id + "id")
        populateModalInfo(id)
})
    })

 
}


function pages(direction, results){
    if(direction === "increase"){
  a = 10+a
        if(10+b > results.length){
            b= results.length
            
            $("#next").css("visibility","hidden")
        }else{
        b= 10+b;
        }
        console.log(a)
        console.log(b)
        trial1(a,b)
    }
    else if(direction === "decrease"){
  if(b == results.length){
           b= b-(results.length%10);
       }
        else{
            b = b-10;
        }
       
       if(a<=0){
           a=0;
       }
        else{
            a = a-10;
        }
     
      
        console.log(a)
        console.log(b)
        trial1(a,b)
    }

}




function getInfo(group,category){
    $(".results").css("display","block")

     $.get("/api/"+group+"/"+category, function(results){
        toPage(results)
    })

}


function populateModalInfo(id){
    $.get("/api/list",function(results){

        yelpApiInfo(results,id)
        })
}

    function yelpApiInfo(results, id){

     var comments;
         for(i=0;i<results.length;i++){
          if(results[i].id == id){
              if(results[i].comments == null){
                  comments ="no comments added"
              }
                else{
                    comments=results[i].comments;
                }

            $(".modal-title").html(results[i].rest_name)

            var image =$("<img>");
                image.addClass("restImage");
                image.attr("src", "pic.js")
                image.attr("alt", "picture"+id)

                var pageDetails ="<div>Location: "+ results[i].location+"</div><br>";
                pageDetails+="<div> Style of food: "+ results[i].nationality+"</div><br>";
                pageDetails+="<div> comments: "+comments+"</div><br>";
                pageDetails+="<button id='edit'>Edit Info</button>";

           
           
           $(".modal-body").append(image)
           $(".modal-body").append(pageDetails)
      }
        } 

    }
















function populateAddRest(){
$(".modal-title").empty();
$(".modal-body").empty();

$(".modal-title").html("Add New Restaurant")


var  restInput="<form>  <div class='form-group'>";
    restInput+="<label for='restNameInput'>Restaurant Name</label>";
    restInput+="<input type='text' class='form-control' id='restNameInput' placeholder='Restaurant Name'>";
    restInput+="</div>";

    restInput+="<div class='form-group'>";
    restInput+="<label for='restLocationInput'>Location</label>";
    restInput+="<input type='text' class='form-control' id='restLocationInput' placeholder='Location'>";
    restInput+="</div>";

   

    restInput+="<div class='form-group'>";
    restInput+="<label for='categoryNameInput'>Select Category</label>";
    restInput+="<select class='form-control' id='categoryNameInput'>";
    restInput+="<option value='fast-food'>fast food</option>";
    restInput+="<option value='food truck'>food truck</option>";
    restInput+="<option value='fine dining'>Fine dining</option>";
    restInput+="<option value='casual dining'>Casual dining</option>";
    restInput+="<option value='cafe'>Cafe</option>";
    restInput+="</select>";
    restInput+="</div>";


    restInput+="<div class='form-group'>";
    restInput+="<label for='nationalityInput'>Select Region</label>";
    restInput+="<select multiple class='form-control' id='nationalityInput'>";
    restInput+="<option value='North America'>North American</option><option value='Asian'>Asian</option><option value='European'>European</option><option value='South American'>South American</option><option value='African'>African</option>";
    restInput+="</select>";
    restInput+="</div>";

    restInput+="<div class='form-group'>";
    restInput+="<label for='costInput'>Select Cost</label>";
    restInput+="<select class='form-control' id='costInput'>";
    restInput+="<option value='low'>$</option>";
    restInput+="<option value='medium'>$$</option>";
    restInput+="<option value='high'>$$$</option>";
    restInput+="</select>";
    restInput+="</div>";


     restInput+="<div class='form-group'>";
    restInput+="<label for='ratingInput'>Select Rating</label>";
    restInput+="<select multiple class='form-control' id='ratingInput'>";
    restInput+="<option value='1'>1 Star</option><option value='2'>2 Stars</option><option value='3'>3 Stars</option><option value='4'>4 Stars</option><option value='5'>5 Stars</option>";
    restInput+="</select>";
    restInput+="</div>";

    restInput+="<div class='form-group'>"
    restInput+="<label for='commentInput'>Example textarea</label>";
    restInput+="<textarea class='form-control' id='commentInput' rows='3'></textarea>";
    restInput+="</div><form>"

let submitBtn= "<button type='button' class='btn btn-primary restSubmit' data-dismiss='modal'>Submit Restaurant</button>";

    $(".modal-body").html(restInput)
    $(".modal-footer").html(submitBtn)

    $(".restSubmit").on("click",function(){
        let region = $("#nationalityInput").val();
        let rate=$("#ratingInput").val();

        var restData={
            rest_name:$("#restNameInput").val(),
            location: $("#restLocationInput").val(),
            category:$("#categoryNameInput").val(),
            nationality:region[0],
            cost:$("#costInput").val(),
            rating:rate[0],
            comments:$("#commentInput").val()
            
        }
        sendData(restData);
        
})
}

function sendData(data){
 $.post("/api/newRestaurant",data,function(){
     console.log("added")
 })
    runTextSearch(data.rest_name)


}

$(".searchSubmit").on("click",function(e){
    e.preventDefault()
    var name = $(".restSearch").val()
    runTextSearch(name)
  
})

function runTextSearch(name){    
    $(".results").css("display","block")

  $.get("/api/find/restaraunt/"+name,function(results){
    
      
            toPage(results)
    
    })
}



