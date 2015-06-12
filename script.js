var gameWidth = 640,
    gameHeight = 480,
    gameCenterX = gameWidth/2,
    gameCenterY = gameHeight/2,
    gameQuarterX = gameWidth/4,
    gameQuarterY = gameHeight/4,
    gameEighthX = gameWidth/8,
    gameEighthY = gameHeight/8,
    paddleX = gameCenterX,
    paddleY = gameCenterY,
    ballWidth = 48,
    ballX = gameCenterX,
    ballY = gameCenterY,
    ballZ = 0,
    ballVelocityZ = 5,
    hallScale = 1000;

function setup() {
  createCanvas(gameWidth, gameHeight);
  noCursor();
}

function draw() {
  ballZ += ballVelocityZ;
  if ( (ballZ > hallScale/2) || (ballZ < 0)) { ballVelocityZ = - ballVelocityZ; }

  clear();
  drawHall();
  drawBall();
  drawPaddle();
}

function drawHall() {
  noFill();

  // ball position
  stroke(150);
  strokeWeight(1);
  rect(gameWidth * (ballZ / hallScale/2), gameHeight * (ballZ / hallScale/2), gameWidth * ((hallScale - ballZ) / hallScale), gameHeight * ((hallScale - ballZ) / hallScale));

  // middle
  stroke(0, 150, 0);
  strokeWeight(2);
  rect(gameEighthX, gameEighthY, gameWidth * 0.75, gameHeight * 0.75);

  // end
  stroke(0, 150, 0);
  strokeWeight(1);
  rect(gameQuarterX, gameQuarterY, gameCenterX, gameCenterY);

  // hall lines
  line(0, 0, gameQuarterX, gameQuarterY);
  line(0, gameHeight, gameQuarterX, gameHeight - gameQuarterY);
  line(gameWidth, 0, gameWidth - gameQuarterX, gameQuarterY);
  line(gameWidth, gameHeight, gameWidth - gameQuarterX, gameHeight - gameQuarterY);
}

function drawBall() {
  fill(255);
  strokeWeight(0);
  var ballScale = ballWidth * (hallScale - ballZ) / hallScale;
  ellipse(ballX, ballY, ballScale, ballScale);
}

function drawPaddle() {

  paddleX = mouseX || paddleX;
  paddleY = mouseY || paddleY;

  var paddleWidth = 150, paddleHeight = 100, paddleStroke = 4, paddleRounding = 20;

  // enforce boundary conditions
  var paddleXmin = (paddleWidth + paddleStroke)/2,
      paddleXmax = gameWidth - paddleXmin,
      paddleYmin = (paddleHeight + paddleStroke)/2,
      paddleYmax = gameHeight - paddleYmin;
  if (paddleX < paddleXmin) { paddleX = paddleXmin; }
  else if (paddleX > paddleXmax) { paddleX = paddleXmax; }
  if (paddleY < paddleYmin) { paddleY = paddleYmin; }
  else if (paddleY > paddleYmax) { paddleY = paddleYmax; }

  // paddle border
  noFill();
  stroke(0, 255, 0);
  strokeWeight(paddleStroke);
  rect( paddleX - paddleWidth/2, paddleY - paddleHeight/2,
        paddleWidth, paddleHeight,
        paddleRounding );

  // cross-hairs
  strokeWeight(1);
  //   vertical
  line( paddleX, paddleY - paddleHeight/2,
        paddleX, paddleY - paddleHeight/4 );
  line( paddleX, paddleY + paddleHeight/4,
        paddleX, paddleY + paddleHeight/2 );
  //   horizontal
  line( paddleX - paddleWidth/2, paddleY,
        paddleX - paddleWidth/4, paddleY );
  line( paddleX + paddleWidth/4, paddleY,
        paddleX + paddleWidth/2, paddleY );

  // inner border
  fill(color(0, 255, 0, 60));
  stroke(0, 255, 0);
  strokeWeight(paddleStroke/2);
  rect( paddleX - paddleWidth/4, paddleY - paddleHeight/4,
        paddleWidth/2, paddleHeight/2,
        paddleRounding/2 );

}
