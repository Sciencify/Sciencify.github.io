var c = document.getElementById("tourCanvas");
var ctx = c.getContext("2d");

// 560 x 530
var size = {};
var selectedTour = null;
var transform = null;

var tours = [
    {
        name: "Our Solar System",
        currentPos: 0,
        places: [
            {
                name: "x",
                imgName: "logo.png",
                btns: [
                    {
                        x: 50,
                        y: 10,
                        w: 100,
                        h: 100,
                        dest: 1
                    }
                ],
            },
            {
                name: "y",
                imgName: "Yellow.png",
                btns: [
                    {
                        x: 50,
                        y: 10,
                        w: 100,
                        h: 100,
                        dest: 0
                    }
                ],
            }
        ]
    },
    {
        name: "Galaxies",
        currentPos: 0,
        places: [
            {
                name: "Tour Home",
                imgName: "galaxies/Slide1.PNG",
                btns: [
                    {
                        x: 25,
                        y: 145,
                        w: 250,
                        h: 185,
                        dest: 1
                    },
                    {
                        x: 340,
                        y: 150,
                        w: 285,
                        h: 190,
                        dest: 2
                    },
                    {
                        x: 705,
                        y: 160,
                        w: 245,
                        h: 185,
                        dest: 3
                    },
                    {
                        x: 1020,
                        y: 160,
                        w: 230,
                        h: 260,
                        dest: 4
                    },
                    {
                        x: 35,
                        y: 445,
                        w: 205,
                        h: 220,
                        dest: 5
                    },
                    {
                        x: 295,
                        y: 465,
                        w: 325,
                        h: 180,
                        dest: 6
                    },
                    {
                        x: 650,
                        y: 410,
                        w: 905-650,
                        h: 660-410,
                        dest: 7
                    },
                    {
                        x: 950,
                        y: 450,
                        w: 1235-950,
                        h: 640-450,
                        dest: 8
                    }
                ],
            },
            {
                name: "Galaxy Facts",
                imgName: "galaxies/Slide2.PNG",
                btns: [
                    {
                        x: 20,
                        y: 15,
                        w: 175,
                        h: 135,
                        dest: 3
                    },
                    {
                        x: 935,
                        y: 10,
                        w: 1095-935,
                        h: 140,
                        dest: 7
                    },
                    {
                        x: 435,
                        y: 600,
                        w: 150,
                        h: 100,
                        dest: 2
                    },
                    {
                        x: 615,
                        y: 600,
                        w: 160,
                        h: 105,
                        dest: 8
                    },
                    {
                        x: 1100,
                        y: 10,
                        w: 170,
                        h: 90,
                        dest: 0
                    },
                ],
            },
            {
                name: "More Galaxy Facts",
                imgName: "galaxies/Slide3.PNG",
                btns: [
                    {
                        x: 20,
                        y: 15,
                        w: 175,
                        h: 135,
                        dest: 3
                    },
                    {
                        x: 435,
                        y: 600,
                        w: 150,
                        h: 100,
                        dest: 2
                    },
                    {
                        x: 1035,
                        y: 295,
                        w: 160,
                        h: 135,
                        dest: 8
                    },
                    {
                        x: 1100,
                        y: 10,
                        w: 170,
                        h: 90,
                        dest: 0
                    },
                ],
            },
            {
                name: "Spiral Galaxies",
                imgName: "galaxies/Slide4.PNG",
                btns: [
                    {
                        x: 50,
                        y: 15,
                        w: 145,
                        h: 105,
                        dest: 7
                    },
                    {
                        x: 545,
                        y: 545,
                        w: 660-545,
                        h: 630-545,
                        dest: 1
                    },
                    {
                        x: 1055,
                        y: 95,
                        w: 120,
                        h: 95,
                        dest: 4
                    },
                    {
                        x: 1100,
                        y: 10,
                        w: 170,
                        h: 90,
                        dest: 0
                    },
                    {
                name: "More Galaxy Facts",
                imgName: "galaxies/Slide3.PNG",
                btns: [
                    {
                        x: 20,
                        y: 15,
                        w: 175,
                        h: 135,
                        dest: 3
                    },
                    {
                        x: 435,
                        y: 600,
                        w: 150,
                        h: 100,
                        dest: 2
                    },
                    {
                        x: 1035,
                        y: 295,
                        w: 160,
                        h: 135,
                        dest: 8
                    },
                    {
                        x: 1100,
                        y: 10,
                        w: 170,
                        h: 90,
                        dest: 0
                    },
                ],
            },
            
                ],
            },
            {
                name: "Irregular Galaxies",
                imgName: "galaxies/Slide5_new.PNG",
                btns: [
                    {
                        x: 97,
                        y: 5,
                        w: 140,
                        h: 115,
                        dest: 5
                    },
                    {
                        x: 475,
                        y: 615,
                        w: 120,
                        h: 90,
                        dest: 1
                    },
                    {
                        x: 954,
                        y: 0,
                        w: 130,
                        h: 100,
                        dest: 3
                    },
                    {
                        x: 1100,
                        y: 10,
                        w: 170,
                        h: 90,
                        dest: 0
                    },
                ],
            },
            {
                name: "Elliptical Galaxies",
                imgName: "galaxies/Slide6.PNG",
                btns: [
                    {
                        x: 0,
                        y: 0,
                        w: 100,
                        h: 125,
                        dest: 4
                    },
                    {
                        x: 485,
                        y: 615,
                        w: 150,
                        h: 100,
                        dest: 1
                    },
                    {
                        x: 1020,
                        y: 115,
                        w: 180,
                        h: 110,
                        dest: 6
                    },
                    {
                        x: 1100,
                        y: 10,
                        w: 170,
                        h: 90,
                        dest: 0
                    },
                ],
            },
            {
                name: "Active Galaxies",
                imgName: "galaxies/Slide7.PNG",
                btns: [
                    {
                        x: 55,
                        y: 0,
                        w: 100,
                        h: 100,
                        dest: 7
                    },
                    {
                        x: 465,
                        y: 615,
                        w: 170,
                        h: 100,
                        dest: 1
                    },
                    {
                        x: 935,
                        y: 70,
                        w: 140,
                        h: 110,
                        dest: 5
                    },
                    {
                        x: 1100,
                        y: 10,
                        w: 170,
                        h: 90,
                        dest: 0
                    },
                ],
            },
            {
                name: "The Milky Way",
                imgName: "galaxies/Slide8.PNG",
                btns: [
                    {
                        x: 0,
                        y: 0,
                        w: 190,
                        h: 100,
                        dest: 6
                    },
                    {
                        x: 475,
                        y: 615,
                        w: 140,
                        h: 100,
                        dest: 1
                    },
                    {
                        x: 660,
                        y: 615,
                        w: 130,
                        h: 100,
                        dest: 8
                    },
                    {
                        x: 920,
                        y: 70,
                        w: 160,
                        h: 110,
                        dest: 3
                    },
                    {
                        x: 1100,
                        y: 10,
                        w: 170,
                        h: 90,
                        dest: 0
                    },
                ],
            },
            {
                name: "Andromeda",
                imgName: "galaxies/Slide9.PNG",
                btns: [
                    {
                        x: 40,
                        y: 20,
                        w: 100,
                        h: 100,
                        dest: 7
                    },
                    {
                        x: 600,
                        y: 610,
                        w: 110,
                        h: 80,
                        dest: 1
                    },
                    {
                        x: 915,
                        y: 35,
                        w: 180,
                        h: 105,
                        dest: 6
                    },
                    {
                        x: 1100,
                        y: 10,
                        w: 170,
                        h: 90,
                        dest: 0
                    },
                ],
            }
        ]
    },
    {
        name: "Stars"
    },
    {
        name: "Exoplanets"
    },
    {
        name: "Life In Space"
    },
    {
        name: "Our Universe"
    }
];

var mouseX, mouseY = 0;
var mousePressed = false;

$("#tourCanvas").mousemove(function(event){            
    mouseX = event.pageX - $(this).offset().left;
    mouseY = event.pageY - $(this).offset().top;
    mousePressed = false;
});
$("#tourCanvas").mousedown(function(event){            
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
        if(transform == null){
            var currentTour = tours[selectedTour];
            // ctx.textAlign = "center";
            // ctx.fillStyle = "#EEE";
            // ctx.font = "30px sans-serif";
            // ctx.fillText(currentTour.places[currentTour.currentPos].name, width/2, 30);
            var img = new Image();
            img.src = "CosmosTourImages/"+currentTour.places[currentTour.currentPos].imgName;
            var imgW = img.width;
            var imgH = img.height;
            var scaleFactor = width/imgW;
            if(imgH*scaleFactor > height){
                scaleFactor = height/imgH;
            }
            var x = (width - imgW*scaleFactor)/2;
            var y = (height - imgH*scaleFactor)/2;
            ctx.drawImage(img, x, y, imgW*scaleFactor, imgH*scaleFactor);
            ctx.fillStyle = "#FFF";
            ctx.font = "10px sans-serif";
            ctx.fillText(Math.round((mouseX-x)/scaleFactor) + "    " + Math.round((mouseY-y)/scaleFactor), 10, 10);
            for(var i = 0; i < currentTour.places[currentTour.currentPos].btns.length; i++){
                var btnX = currentTour.places[currentTour.currentPos].btns[i].x;
                var btnY = currentTour.places[currentTour.currentPos].btns[i].y;
                var btnW = currentTour.places[currentTour.currentPos].btns[i].w;
                var btnH = currentTour.places[currentTour.currentPos].btns[i].h;
                ctx.strokeStyle = "#EEEEEE";
                ctx.strokeRect(btnX*scaleFactor + x, btnY*scaleFactor + y, btnW*scaleFactor, btnH*scaleFactor);
                if(mouseX > btnX*scaleFactor + x && mouseX < btnX*scaleFactor + x + btnW*scaleFactor && mouseY > btnY*scaleFactor + y && mouseY < btnY*scaleFactor + y + btnH*scaleFactor){
                    $("body").css({cursor: "pointer"});
                    if(mousePressed){
                        currentTour.currentPos = currentTour.places[currentTour.currentPos].btns[i].dest;
                        mousePressed = false;
                        transform = {
                            btnW: btnW*scaleFactor,
                            btnH: btnH*scaleFactor,
                            focusX: x + btnX*scaleFactor + btnW*scaleFactor / 2,
                            focusY: y + btnY*scaleFactor + btnH*scaleFactor / 2,
                            t: 0,
                            img: {
                                image: img,
                                imgW: imgW*scaleFactor,
                                imgH: imgH*scaleFactor,
                                imgX: x,
                                imgY: y
                            },
                            newImg: {
                                image: new Image(),
                            }
                        };
                        transform.newImg.image.src = "CosmosTourImages/"+currentTour.places[currentTour.currentPos].imgName;
                        var image = transform.newImg.image;
                        var imageW = image.width;
                        var imageH = image.height;
                        var sf = width/imageW;
                        if(imageH*sf > height){
                            sf = height/imageH;
                        }
                        var imgx = (width - imageW*sf)/2;
                        var imgy = (height - imageH*sf)/2;

                        transform.newImg.imgW = imageW;
                        transform.newImg.imgH = imageH;
                        transform.newImg.imgX = imgx;
                        transform.newImg.imgY = imgy;
                        console.log(sf);
                    }
                }
            }
        }else{
            ctx.globalAlpha = 1;
            
            ctx.setTransform((transform.t/50), 0, 0, (transform.t/50), transform.focusX, transform.focusY);
            ctx.drawImage(transform.newImg.image, transform.newImg.imgX - transform.focusX, transform.newImg.imgY - transform.focusY, transform.newImg.imgW, transform.newImg.imgH);
            ctx.setTransform(1+(transform.t/50), 0, 0, 1+(transform.t/50), transform.focusX, transform.focusY);
            ctx.globalAlpha = 1-transform.t/50;
            ctx.drawImage(transform.img.image, transform.img.imgX - transform.focusX, transform.img.imgY - transform.focusY, transform.img.imgW, transform.img.imgH);
            transform.t++;
            if(transform.t == 50){
                transform = null;
            }
            mousePressed = false;
        }
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





