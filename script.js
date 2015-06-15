var gameWidth,
    gameHeight,
    gameCenterX,
    gameCenterY,
    gameQuarterX,
    gameQuarterY,
    gameEighthX,
    gameEighthY,
    paddleX,
    paddleY,
    ballRadius,
    ballWidth,
    ballX,
    ballY,
    ballZ,
    ballVelocityX,
    ballVelocityY,
    ballVelocityZ,
    hallScale;

function setup() {
  gameWidth = windowWidth - 8;
  gameHeight = windowHeight - 8;
  gameCenterX = gameWidth/2;
  gameCenterY = gameHeight/2;
  gameQuarterX = gameWidth/4;
  gameQuarterY = gameHeight/4;
  gameEighthX = gameWidth/8;
  gameEighthY = gameHeight/8;
  paddleX = gameCenterX;
  paddleY = gameCenterY;
  ballRadius = 24;
  ballWidth = ballRadius * 2;
  ballX = gameCenterX;
  ballY = gameCenterY;
  ballZ = 0;
  ballVelocityX = 5;
  ballVelocityY = 5;
  ballVelocityZ = 1;
  hallScale = 200;
  createCanvas(gameWidth, gameHeight);
  noCursor();
}

function draw() {
  clear();
  drawHall();
  drawBall();
  drawPaddle();
}

function drawHall() {
  noFill();

  // middle
  stroke(0, 150, 0);
  strokeWeight(2);
  rect(gameEighthX, gameEighthY, gameWidth * 0.75, gameHeight * 0.75);

  // end
  fill(0, 150, 0, 60);
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
  var ballScale = ballWidth * (hallScale - ballZ) / hallScale;
      leftBound = gameWidth * (ballZ / hallScale/2),
      topBound = gameHeight * (ballZ / hallScale/2),
      scaledGameWidth = gameWidth * ((hallScale - ballZ) / hallScale),
      scaledGameHeight = gameHeight * ((hallScale - ballZ) / hallScale),
      rightBound = leftBound + scaledGameWidth,
      bottomBound = topBound + scaledGameHeight,
      ballXscaled = leftBound + ballX * ballScale / ballWidth,
      ballYscaled = topBound + ballY * ballScale / ballWidth;
  ballX += ballVelocityX;
  ballY += ballVelocityY;
  ballZ += ballVelocityZ;
  if ( (ballX + ballRadius > gameWidth) || (ballX - ballRadius < 0)) { ballVelocityX = - ballVelocityX; }
  if ( (ballY + ballRadius > gameHeight) || (ballY - ballRadius < 0)) { ballVelocityY = - ballVelocityY; }
  if ( (ballZ > hallScale/2) || (ballZ < 0)) { ballVelocityZ = - ballVelocityZ; }

  // ball position markers
  noFill();
  stroke(150);
  strokeWeight(1);
  rect(leftBound, topBound, scaledGameWidth, scaledGameHeight);
  line(leftBound, ballYscaled, rightBound, ballYscaled);
  line(ballXscaled, topBound, ballXscaled, bottomBound);

  // ball itself
  fill(255);
  strokeWeight(0);
  ellipse(ballXscaled, ballYscaled, ballScale, ballScale);
}

function drawPaddle() {

  // player control
  paddleX = mouseX || paddleX;
  paddleY = mouseY || paddleY;

  // auto-play override
  paddleX = ballX;
  paddleY = ballY;

  var paddleWidth = 150,
      paddleHeight = 100,
      paddleStroke = 4,
      paddleRounding = 20,
      paddleColor = color(0, 200, 0),
      paddleInnerColor = color(0, 200, 0, 60),
      paddleHitColor = color(0, 255, 0);

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
  fill(paddleInnerColor);
  strokeWeight(paddleStroke/2);
  rect( paddleX - paddleWidth/4, paddleY - paddleHeight/4,
        paddleWidth/2, paddleHeight/2,
        paddleRounding/2 );

}
