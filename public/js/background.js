


var imageCount=0;

var backgroundImages={
    img:["'../wallpaper/restPic5.jpg'","../wallpaper/restPic2.jpg","../wallpaper/restPic3.jpg","../wallpaper/restPic4.jpg","../wallpaper/restPic6.jpg"],
}


imageCount = Math.floor(Math.random()*backgroundImages.img.length);

$("body").css("background-image","url("+backgroundImages.img[imageCount]+")")
console.log(imageCount)


setInterval(function(){
    $("body").css("background-image","url("+backgroundImages.img[imageCount]+")")
    checkCount()
},1000 *30)

function checkCount(){
    imageCount++;
    if(imageCount == backgroundImages.img.length ){
        imageCount=0
    }
}