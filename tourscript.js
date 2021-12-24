var c = document.getElementById("tourCanvas");
var ctx = c.getContext("2d");

// 560 x 530
var size = {};
var selectedTour = null;

var tours = [
    {
        name: "a",
        currentPos: 0,
        places: [
            {
                
            }
        ]
    },
    {
        name: "b"
    },
    {
        name: "c"
    },
    {
        name: "d"
    },
    {
        name: "e"
    },
    {
        name: "f"
    }
];

var mouseX, mouseY = 0;
var mousePressed = false;

$("#tourCanvas").mousemove(function(event){            
    mouseX = event.pageX - $(this).offset().left;
    mouseY = event.pageY - $(this).offset().top;
    mousePressed = false;
});
$("#tourCanvas").click(function(event){            
    mousePressed = true;
});
window.setInterval(function(){
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, width, height);
    $("body").css({cursor: "auto"});
    var width = window.innerWidth - 2;
    var height = window.innerHeight * 0.875;
    size = {width: width, height: height};
    $("#tourCanvas").prop(size);

    if(selectedTour != null){
        ctx.textAlign = "center";
        ctx.fillStyle = "#EEE";
        ctx.font = "30px sans-serif";
        ctx.fillText(tours[selectedTour].name, width/2, 30);

    }else{
        ctx.textAlign = "center";
        ctx.fillStyle = "#EEE";
        ctx.font = "50px sans-serif";
        ctx.fillText("Choose a tour:", width/2, 50);
        for(var i = 0; i < tours.length; i++){
            // gap = height/25, s = 3gap
            ctx.fillStyle = "#EEE";
            var gap = height/29;
            ctx.fillRect(0.1*width, 5*gap + i*4*gap, 0.8*width, 3*gap);
            
            ctx.fillStyle = "#222";
            ctx.font = "50px sans-serif";
            ctx.fillText(tours[i].name, width/2, 7.5*gap + i*4*gap);

            if(mouseX > 0.1*width && mouseX < 0.9*width && mouseY > 5*gap + i*4*gap && mouseY < 8*gap + i*4*gap){
                $("body").css({cursor: "pointer"});
                if(mousePressed){
                    selectedTour = i;
                    mousePressed = false;
                }
            }
        }
    }

    
}, 10)





