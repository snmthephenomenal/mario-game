
var gameState = "PLAY";

var mario, mario_running, mario_collided;
var bg, bgImage;
var coinsGroup, coinImage;
var brickGroup, brickImage;
var obstaclesGroup, obstacle1, turtleObstacleImage, obstacle3;
var invisibleGround;
var coinScore=0;
var gameOver, restart;
var jumpSound,dieSound;

function preload(){
  mario_running =  loadAnimation("images/mar1.png","images/mar2.png","images/mar3.png",
  "images/mar4.png","images/mar5.png","images/mar6.png","images/mar7.png");
  mario_collided = loadAnimation("images/dead.png");
  bgImage = loadImage("images/bgnew.jpg");
  coinImage = loadAnimation("images/con1.png","images/con2.png","images/con3.png","images/con4.png","images/con5.png","images/con6.png");
  brickImage = loadImage("images/brick.png");
  mushObstacleImage = loadAnimation("images/mush1.png","images/mush2.png","images/mush3.png","images/mush4.png","images/mush5.png","images/mush6.png",);
  turtleObstacleImage = loadAnimation("images/tur1.png","images/tur2.png","images/tur3.png","images/tur4.png","images/tur5.png",);
  //obstacle3 = loadImage("images/obs3.png");
  jumpSound = loadSound("sounds/jump.mp3");
  coinSound = loadSound("sounds/coinSound.mp3");
  dieSound = loadSound("sounds/dieSound.mp3");
}

function setup() {
  createCanvas(1000, 600);
  textSize(20);
  fill("green");
  
  bg = createSprite(580,300);
  bg.addImage(bgImage);
  bg.scale =0.5;
  bg.x=bg.width/4;
  bg.velocityX = -6;
  
  mario = createSprite(200,585,20,50);
  mario.addAnimation("running", mario_running);
  mario.addAnimation("collided", mario_collided);
  mario.setCollider("rectangle",0,0,300,600);
  mario.scale =0.3;

  //restart = createSprite(300,140);
  //gameOver.scale = 0.5;
  //restart.scale = 0.5;

  
  invisibleGround = createSprite(200,585,400,10);
  invisibleGround.visible = false;
  
  coinsGroup = new Group();
  obstaclesGroup = new Group();
  bricksGroup = new Group();
  coinScore = 0;
}

function draw() {
  
  background(255);
  if(mario.x<200){
    mario.x=200;
  }

  if (gameState==="PLAY"){
    
    
    console.log(bg.x)
    if(keyDown("space") && mario.y >= 309) {
      mario.velocityY = -16;
      jumpSound.play();
    }
    mario.velocityY = mario.velocityY + 0.5
  
    if (bg.x < 100){
      bg.x = 400;
    }
    for(var i = 0 ; i< (bricksGroup).length ;i++){
      var temp = (bricksGroup).get(i) ;
      
      if (temp.isTouching(mario)) {
         mario.collide(temp);
        }
          
      }

      for(var i = 0 ; i< (coinsGroup).length ;i++){
        var temp = (coinsGroup).get(i) ;
        
        if (temp.isTouching(mario)) {
          coinSound.play();
          coinScore++;
          temp.destroy();
          temp=null;
          }
            
        }
    spawnCoins();
    spawnObstacles();
    spawnBricks();
  
    if(obstaclesGroup.isTouching(mario)){
        dieSound.play();
        mario.scale=0.4
        mario.setCollider("rectangle",0,0,300,10);
        mario.y=570
        gameState = "END";
    }
  }
  else if (gameState === "END") {
   
    
    bg.velocityX = 0;
    mario.velocityY = 0;
    
    mario.changeAnimation("collided",mario_collided);
    obstaclesGroup.setLifetimeEach(-1);
    coinsGroup.setLifetimeEach(-1);
    bricksGroup.setLifetimeEach(-1);
    obstaclesGroup.setVelocityXEach(0);
    coinsGroup.setVelocityXEach(0);
    bricksGroup.setVelocityXEach(0);
  }
  mario.collide(invisibleGround);
  drawSprites();
  text("Coins Collected: "+ coinScore, 500,50);
  
}

function spawnCoins() {
  if (frameCount % 50 === 0) {
    var coin = createSprite(1200,120,40,10);

    coin.addAnimation("coin", coinImage);
    coin.y = Math.round(random(80,350));
   // coin.addImage(coinImage);
    coin.scale = 0.1;
    coin.velocityX = -3;
    coin.lifetime = 1200;
    coinsGroup.add(coin);
  }
}

function spawnObstacles() {
  if(frameCount % 100 === 0) {
    var obstacle = createSprite(1200,545,10,40);
    obstacle.velocityX = -4;
    obstacle.scale=0.2
    switch(Math.round(random(1,2))){
    case 1:
        obstacle.addAnimation("mush",mushObstacleImage);
        break;
    case 2:
      obstacle.addAnimation("turtle", turtleObstacleImage);
        break;
    case 3:
        obstacle.addImage(obstacle3);
        break;    
    }
             
  
    obstacle.lifetime = 300;
    obstaclesGroup.add(obstacle);
  }
}

function spawnBricks() {
  if (frameCount % 70 === 0) {
    var brick = createSprite(1200,120,40,10);
    brick.y = Math.round(random(50,450));
    brick.addImage(brickImage);
    brick.scale = 0.5;
    brick.velocityX = -5;
    bricksGroup.add(brick);
  }
  
}