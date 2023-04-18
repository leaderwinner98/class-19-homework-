var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
   doorGroup = new Group();
   climbersGroup = new Group();
   invisibleBlockGroup= new Group();

   ghost = createSprite(200,200,50,50);
   ghost.scale = 0.3
   ghost.addImage("ghost", ghostImg);
  
}

function draw() {
  background(0);
  if(gameState === "play"){
    spookySound.play();
  if(tower.y > 400){
      tower.y = 300
    }

  if(keyDown("left_arrow")){
    ghost.x = ghost.x -5;
  }
  if(keyDown("right_arrow")){
    ghost.x = ghost.x + 5;
  }
  if(keyDown("up_arrow")){
    ghost.velocityY= -10;
  }
  if(keyDown("down_arrow")){
    ghost.velocityY= 10
  }

  ghost.velocityY=ghost.velocityY +0.5
  spawnDoors();
  if(climbersGroup.isTouching(ghost)){
    ghost.velocityY=0
  }
  if(ghost.y>400){
    gameState = "end";
  }
}

if(gameState === "end"){
  text("gameover",200,200);
  tower.destory();

}

  drawSprites();


}
function spawnDoors(){
  if(frameCount %240 === 0) {
    var door = createSprite(200, -50);
    var climber = createSprite(200,10);
    door.x= Math.round(random(120,400));
    climber.x= door.x
    
    door.addImage(doorImg);
    climber.addImage(climberImg);
    
    door.velocityY=1;
    climber.velocityY= 1;

    door.lifetime = 800;
    climber.lifetime= 800;

    ghost.depth=climber.depth + 1;
    ghost.depth=door.depth + 1

    doorGroup.add(door);
    climbersGroup.add(climber);

  }
}

