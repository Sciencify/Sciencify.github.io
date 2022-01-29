var canvasWidth = /*window.innerWidth*/626;
var canvasHeight = /*window.innerHeight*/465;
var doorsLocked = true;
var gameOver = false;
var win = false;
var isQuestion = false;
var question;
var questions = [
  {
    question: "Which of the following is always constant no matter where it is measured from?",
    options: ["The speed of sound", "The speed of light", "Time", "The speed of anything"],
    correctInd: 1
  },
  {
    question: "Choose the densest substance",
    options: ["Osmium", "Red Supergiant Star", "Neutron Star", "The Milky Way Galaxy"],
    correctInd: 2
  },
  {
    question: "I was once a massive star and soon I will be a brightly colored gas cloud. For now, I am a massive explosion. What am I?",
    options: ["Supernova", "Big Bang", "Space Explosion", "Star Burst"],
    correctInd: 0
  },
  {
    question: "What is the full form of DNA and where is it stored?",
    options: ["Deoxyribenucloic acid, Mitochondria", "Dionetribucelic acid, Ribosomes", "Dextrinacentadine, Endoplasmic Reticulum", "Deoxyribonucleic acid, Nucleus"],
    correctInd: 3
  },
  {
    question: "What is Electrical Current and what unit is it measured in?",
    options: ["Amount of electricity, Volt", "Flow of electrons, Ampere", "Speed of flow of charged particles, Amps", "The amount of electricity flowing, Coulombs"],
    correctInd: 1
  },
  {
    question: "Name the best conductor and best insulator of electricity, respectively:",
    options: ["Copper, Plastic", "Aluminium, Carbon", "Silver, Rubber", "Water, Cotton"],
    correctInd: 2
  },
  {
    question: "A light-year is a unit of:",
    options: ["Speed", "Distance", "Time", "Brightness"],
    correctInd: 1
  },
  {
    question: "What is the size of a neutron star?",
    options: ["The size of our sun", "The size of our galaxy, the Milky Way", "The size of Neptune", "The size of a city"],
    correctInd: 3
  },
];
function setup() {
  createCanvas(canvasWidth, canvasHeight);
  keys[LEFT_ARROW] = false;
  keys[RIGHT_ARROW] = false;
  keys[UP_ARROW] = false;
  keys[DOWN_ARROW] = false;
}
let size = 40;
let player = {
  x: 0,
  y: 0,
  xVel: 0,
  yVel: 0,
  speed: 7.5,
  touchingGround: false
};
let keys = [];
let map = [
    "               |####   ",
    "               |   #####",
    "               |       #################",
    "               |                       #",
    "               |                        #",
    "               |       ",
    "               |              G     G     G#",
    "               |           ###########<>####",
    "               |          ##        #      #",
    "               G        ####        #   G  #",
    "            |  |      G#####        #####  #",
    "           ||  |      ######        ###    #",
    "          |||  |      ######        #   G  #",
    "         ||||| |     #######        #   ####",
    "        |||||  |    ########       #      ##",
    "     @  |     G|   #########     G#      #",
    "     ####<>#######################     G#",
    "    ||||||                       #   G #",
    "    |||||||                      #  ###",
    "   #||||||||                    #<>##    *#",
    "   ##||||||||                   #        ##",
    "   ###||||||||             G     ######### ",
    "   ####||||||||         ||||     ",
    "   #####||||||||        |  ||    ",
    "   ######||||||||      G|q |||   ",
    "   ######################<>|     ",
    "                              |||",
    "                        |||||||||",
    "                                 ",
];

var Block = function(x, y){
  this.x = x;
  this.y = y;
}
Block.prototype.display = function(){
  fill(150);
  noStroke();
  square(this.x, this.y, size);
}
Block.prototype.collideX = function(px, py){
  if(py > this.y - size && py < this.y + size){
    if(px < this.x + size && px > this.x){
      return this.x + size;
    }else if(px > this.x - size && px < this.x){
      return this.x - size;
    }else{
      return px;
    }
  }else{
    return px;
  }
};
Block.prototype.collideY = function(px, py){
  if(px > this.x - size && px < this.x + size){
    if(py < this.y + size && py > this.y){
      return this.y + size;
    }else if(py > this.y - size && py < this.y){
      player.touchingGround = true;
      return this.y - size;
    }else{
      return py;
    }
  }else{
    return py;
  }
};


var Door = function(x, y){
  this.x = x;
  this.y = y;
}
Door.prototype.display = function(){
  var alpha = 255;
  if(!doorsLocked){
    alpha = 50;
  }
  fill(166, 0, 255, alpha);
  noStroke();
  square(this.x, this.y, size);
}
Door.prototype.collideX = function(px, py){
  if(py > this.y - size && py < this.y + size && doorsLocked){
    if(px < this.x + size && px > this.x){
      return this.x + size;
    }else if(px > this.x - size && px < this.x){
      return this.x - size;
    }else{
      return px;
    }
  }else{
    return px;
  }
};
Door.prototype.collideY = function(px, py){
  if(px > this.x - size && px < this.x + size && doorsLocked){
    if(py < this.y + size && py > this.y){
      return this.y + size;
    }else if(py > this.y - size && py < this.y){
      player.touchingGround = true;
      return this.y - size;
    }else{
      return py;
    }
  }else{
    return py;
  }
};


var Key = function(x, y){
  this.x = x;
  this.y = y;
}
Key.prototype.display = function(){
  if(doorsLocked){
    noFill();
    strokeWeight(3);
    stroke(242, 255, 0);
    ellipse(this.x+size/4, this.y+size/2, size/4);
    line(this.x+size/4+size/8, this.y+size/2, this.x+size, this.y+size/2);
    line(this.x+3*size/4, this.y+size/2, this.x+3*size/4, this.y + 2*size/3);
    line(this.x+15*size/16, this.y+size/2, this.x+15*size/16, this.y + 2*size/3);
    noStroke();
  }
}
Key.prototype.collideX = function(px, py){
  if(py > this.y - size && py < this.y + size){
    if(px < this.x + size && px > this.x){
      doorsLocked = false;
      return px;
    }else if(px > this.x - size && px < this.x){
      doorsLocked = false;
      return px;
    }else{
      return px;
    }
  }else{
    return px;
  }
};
Key.prototype.collideY = function(px, py){
  if(px > this.x - size && px < this.x + size){
    if(py < this.y + size && py > this.y){
      doorsLocked = false;
      return py;
    }else if(py > this.y - size && py < this.y){
      doorsLocked = false;
      return py;
    }else{
      return py;
    }
  }else{
    return py;
  }
};

var mode = false;
var Trapdoor = function(x, y, dir){
  this.x = x;
  
  this.y = y;
  this.originalX = x;
  this.dir = dir;
}
Trapdoor.prototype.display = function(){
  fill(180);
  noStroke();
  
  if(mode){
    this.x += this.dir*2;
  }else{
    this.x += -2*this.dir;
  }
  this.x = constrain(this.x, min(this.originalX, this.originalX + this.dir*size), max(this.originalX, this.originalX + this.dir*size));
  let w = size-abs(this.x - this.originalX);
  if(this.dir == -1){                       
    rect(this.originalX, this.y, w, size);
  }
  if(this.dir == 1){
    rect(this.originalX - w + size, this.y, w, size);
  }
}
Trapdoor.prototype.collideX = function(px, py){
  if(py > this.y - size && py < this.y + size){
    if(px < this.x + size && px > this.x){
      return this.x + size;
    }else if(px > this.x - size && px < this.x){
      return this.x - size;
    }else{
      return px;
    }
  }else{
    return px;
  }
};
Trapdoor.prototype.collideY = function(px, py){
  if(px > this.x - size && px < this.x + size){
    if(py < this.y + size && py > this.y){
      return this.y + size;
    }else if(py > this.y - size && py < this.y){
      player.touchingGround = true;
      return this.y - size;
    }else{
      return py;
    }
  }else{
    return py;
  }
};

var Guard = function(x, y){
  this.health = 20;
  this.shootRate = 100;
  this.x = x;
  this.y = y;
}
Guard.prototype.display = function(){
  if(this.health > 0){
  fill(0);
  circle(this.x + size/2, this.y + size/2, size);
  fill(255, 0, 0);
  rect(this.x, this.y - 15, size, 7.5);
  fill(0, 255, 0);
  rect(this.x, this.y - 15, size * this.health / 20, 7.5);
  }
};
Guard.prototype.shoot = function(){
  if(this.health > 0){
                qbombs.push(new QBomb(this.x + size/2, this.y + size/2, player.x + size/2, player.y + size/2));
  }
};
Guard.prototype.checkHit = function(shots){
  if(this.health > 0){
  for(var i = 0; i < shots.length; i++){
    if(dist(shots[i].x, shots[i].y, this.x + size/2, this.y + size/2) < size/2){
      this.health--;
      return i;
    }
  }
  return -1;
  }
}

var Shot = function(orgX, orgY, shX, shY){
  this.x = orgX;
  this.y = orgY;
  this.vx = 5*shX/Math.sqrt(shX*shX + shY*shY);
  this.vy = 5*shY/Math.sqrt(shX*shX + shY*shY);
}
Shot.prototype.update = function(){
  this.x += this.vx;
  this.y += this.vy;
  this.vy += 0.07;
}
Shot.prototype.display = function(){
  strokeWeight(3);
  stroke(0);
  line(this.x, this.y, this.x + this.vx, this.y + this.vy);
  noStroke();
}
var QBomb = function(orgX, orgY, targX, targY){
  this.x = orgX;
  this.y = orgY;
  this.vx = 5*(targX - orgX) / Math.sqrt((targX - orgX)*(targX - orgX) + (targY - orgY)*(targY - orgY));
  this.vy = 5*(targY - orgY)/ Math.sqrt((targX - orgX)*(targX - orgX) + (targY - orgY)*(targY - orgY));
}
QBomb.prototype.update = function(){
  this.x += this.vx;
  this.y += this.vy;
}
QBomb.prototype.display = function(){
  fill(0);
  circle(this.x, this.y, size/4);
}
let crystal = {
  
};
let blocks = [];
let enemies = [];
let shots = [];
let qbombs = [];

  for(var i = 0; i < map.length; i++){
    for(var j = 0; j < map[i].length; j++){
      let bx = j*size;
      let by = i*size;
      switch(map[i][j]){
        case "#":
          blocks.push(new Block(bx, by));
          break;
        case "@":
          player.x = bx;
          player.y = by;
          break;
        case "|":
          blocks.push(new Door(bx, by));
          break;
        case "q":
          blocks.push(new Key(bx, by));
          break;
        case "<":
          blocks.push(new Trapdoor(bx, by, -1));
          break;
        case ">":
          blocks.push(new Trapdoor(bx, by, 1));
          break;
        case "G":
          enemies.push(new Guard(bx, by));
          break;
        case "*":
          crystal.x = bx;
          crystal.y = by;
          break;
      }
    }
  }
window.setInterval(function(){
  for(var i = 0; i < enemies.length; i++){
    enemies[i].shoot();
  }
}, 2500);
function draw() {
  background(77,195,255);
  if(!isQuestion){
    player.xVel = player.speed*(keys[RIGHT_ARROW] - keys[LEFT_ARROW]);
    player.x += player.xVel;
    for(var i = 0; i < blocks.length; i++){
      player.x = blocks[i].collideX(player.x, player.y);
    }

    if(player.touchingGround){
      if(keys[UP_ARROW]){
        player.yVel = -15;
        player.touchingGround = false;
      }else{
        player.yVel = 0;
      }
    }else{
      player.yVel++;
    }
    player.y += player.yVel;
    player.touchingGround = false;
    for(i = 0; i < blocks.length; i++){
      player.y = blocks[i].collideY(player.x, player.y);
    }
    push();
    translate((canvasWidth/2)-player.x, (canvasHeight/2)-player.y);

    for(i = 0; i < blocks.length; i++){
      var lowerx = -size + player.x - canvasWidth/2;
      var lowery = -size + player.y - canvasHeight/2;
      var upperx = size + player.x + canvasWidth/2;
      var uppery = size + player.y + canvasHeight/2;
      if(blocks[i].x > lowerx && blocks[i].y > lowery && blocks[i].x < upperx && blocks[i].y < uppery){
        blocks[i].display();
      }

    }
    for(i = 0; i < enemies.length; i++){
      var lowerx = -size + player.x - canvasWidth/2;
      var lowery = -size + player.y - canvasHeight/2;
      var upperx = size + player.x + canvasWidth/2;
      var uppery = size + player.y + canvasHeight/2;
      if(enemies[i].x > lowerx && enemies[i].y > lowery && enemies[i].x < upperx && enemies[i].y < uppery){
        var h = enemies[i].checkHit(shots);
        if(h != -1 && h != undefined){
          shots.splice(h, 1);
        }
        enemies[i].display();
      }

    }
    for(i = 0; i < shots.length; i++){
      var lowerx = -size + player.x - canvasWidth/2;
      var lowery = -size + player.y - canvasHeight/2;
      var upperx = size + player.x + canvasWidth/2;
      var uppery = size + player.y + canvasHeight/2;
      if(shots[i].x > lowerx && shots[i].y > lowery && shots[i].x < upperx && shots[i].y < uppery){
        shots[i].update();
        shots[i].display();
      }

    }
    for(i = 0; i < qbombs.length; i++){
        var lowerx = -size + player.x - canvasWidth/2;
        var lowery = -size + player.y - canvasHeight/2;
        var upperx = size + player.x + canvasWidth/2;
        var uppery = size + player.y + canvasHeight/2;
        if(qbombs[i].x > lowerx && qbombs[i].y > lowery && qbombs[i].x < upperx && qbombs[i].y < uppery){
          qbombs[i].update();
          qbombs[i].display();
          if(qbombs[i].x > player.x && qbombs[i].y > player.y && qbombs[i].y < player.y + size && qbombs[i].x < player.x + size){
            isQuestion = true;
           question=questions[floor(Math.random()*questions.length)];
            
          }
        }
    }
    fill(0, 255, 0);
    square(player.x, player.y, size, 10);
    fill(0, 175, 0);
  circle(crystal.x+size/2, crystal.y+size/2, size);
    pop();
  }
  else{
    fill(0);
    textSize(40);
    textAlign(CENTER);
    text(question.question, 0, 10, canvasWidth, canvasHeight/2);
    
    for(var i = 0; i < 4; i++){
      fill(127.5 + i*127.5/4)
      rect(0, canvasHeight/2 + i*canvasHeight/8, canvasWidth, canvasHeight/8);
      fill(0);
      text(question.options[i], 0, 10 + canvasHeight/2 + i*canvasHeight/8, canvasWidth, canvasHeight/8);
    }  

  }
  if(gameOver){
    textAlign(CENTER);
    background(255, 40, 40);
    fill(255, 255, 255);
    textSize(70);
    text("Game Over", canvasWidth/2, canvasHeight*2/5)
    textSize(30);
    text("The guards captured you :(\n\n--Refresh to replay--", canvasWidth/2, canvasHeight/2);
  }
  if(player.y > 3000){
    gameOver = true;
  }
  if(player.x >= crystal.x && player.y >= crystal.y && player.x <= crystal.x + size && player.y <= crystal.y + size){
    win = true;
  }
  if(win && enemies.length == 0){
  background(0, 175, 0);
  textAlign(CENTER);
  fill(255, 255, 255);
    textSize(70);
    text("Mission Successful!", canvasWidth/2, canvasHeight*2/5)
    textSize(30);
    text("You managed to destroy all guards \n and found the crystal of wisdom, which\n restored everyone's knowledge!", canvasWidth/2, canvasHeight/2);
  }
}
function keyPressed(){
  keys[keyCode] = true;
  if(keyCode == 32){
    mode = !mode
    window.setTimeout(function(){
      mode = 0;
    }, 3000);
  }
}
function keyReleased(){
  keys[keyCode] = false;
}
function mousePressed(){
  // option ind = floor((mouseY - canvasHeight/2)*8/canvasHeight)
  if(isQuestion && mouseY > canvasHeight / 2 && mouseY <= canvasHeight - 1){
    if(floor((mouseY - canvasHeight/2)*8/canvasHeight) == question.correctInd){
      qbombs = [];
      shots = [];
      isQuestion = false;
    }else{
      gameOver = true;
    }
    
  }else{
    shots.push(new Shot(player.x + size/2, player.y + size/2, mouseX - (canvasWidth/2 + size/2), mouseY - (canvasHeight/2 + size/2)));
  }
}
