var PLAY = 1;
var END =0;
var gameState = PLAY;

var trex_2


var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var CloudsGroup, cloudImage;
var ObstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score = 0;

var gameover,restart;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  
  gameoverImg = loadImage("gameOver.png");
  
  restartImg = loadImage("restart.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  trex = createSprite(50,height-40,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.8;

  trex_2 = createSprite(50,height-50,20,50);
  trex_2.addImage(trex_collided);
  trex_2.scale = 0.8;
  trex_2.visible = false;
  
  
  ground = createSprite(width/2,height-10,width,2);
  ground.addImage(groundImage);
  ground.x = ground.width /2;
 
  
  invisibleGround = createSprite(width/2,height+50,width,125);
  invisibleGround.visible = false;
  
  CloudsGroup = new Group();
  ObstaclesGroup = new Group();
  
  score = 0;
  
  gameover = createSprite(width/2,height/2-80);
  gameover.addImage(gameoverImg);
  gameover.scale = 1;
  gameover.visible = false;
  
  restart = createSprite(width/2,height/2);
  restart.addImage(restartImg);
  restart.scale= 1; 
  restart.visible = false;
  
  
}

function draw() {
  background(180);
  
   if (gameState === PLAY) {
    
     ground.velocityX = -(6 + 3*score/130);
    
  score = score + Math.round(getFrameRate()/60); 
    
  if(keyDown(32)&& trex.y>=height-150) {
    trex.velocityY = -10;
  }
    
  trex.velocityY = trex.velocityY + 0.8  
 
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  
  spawnClouds();
  spawnObstacles();
    
  if (ObstaclesGroup.isTouching(trex)) {
    
  gameState = END;
  
  }
  }
  
  else if (gameState === END) {
  
    gameover.visible = true;
    restart.visible = true;
    trex.visible = false;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    ObstaclesGroup.setVelocityXEach(0);
    CloudsGroup.setVelocityXEach(0);
    
   //Change moving Trex animation to collided image of trex
    trex_2.visible = true;
    //set lifetime of the game objects so that they are never destroyed
    ObstaclesGroup.setLifetimeEach(-1);
    CloudsGroup.setLifetimeEach(-1);
    
     if(mousePressedOver(restart)) {
    reset();
  }
  
  }
  
  trex.collide(invisibleGround);
  
  
  drawSprites();

  fill("grey");
   stroke("white");
   strokeWeight(10);
   textSize(50);
   textFont("Algeria");
  text("Score: "+ score, 1500,60);
 
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 150 === 0) {
    cloud = createSprite(width/2+880,height,width,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 1;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 500;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    CloudsGroup.add(cloud);
  }
  
}

function spawnObstacles() {
  if(frameCount % 120 === 0) {
    var obstacle = createSprite(width/2+880,height-40,width,40);
    obstacle.velocityX = -4;
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.8;
    obstacle.lifetime = 500;
    //add each obstacle to the group
    ObstaclesGroup.add(obstacle);
  }
}

function reset(){
  gameState = PLAY;
  
  gameover.visible = false;
  restart.visible = false;
  trex_2.visible  =false;
  trex.visible = true;
  
  ObstaclesGroup.destroyEach();
  CloudsGroup.destroyEach();
  
  trex.changeAnimation("running",trex_running);
  
  score = 0;
  
}