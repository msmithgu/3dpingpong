var gameWidth = 640,
    gameHeight = 480,
    gameCenterX = gameWidth/2,
    gameCenterY = gameHeight/2,
    gameQuarterX = gameWidth/4,
    gameQuarterY = gameHeight/4,
    gameEighthX = gameWidth/8,
    gameEighthY = gameHeight/8,
    paddleX = gameCenterX,
    paddleY = gameCenterY;

function setup() {
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
  stroke(0, 255, 0);

  strokeWeight(2);
  rect(gameEighthX, gameEighthY, gameWidth * 0.75, gameHeight * 0.75);

  strokeWeight(1);
  rect(gameQuarterX, gameQuarterY, gameCenterX, gameCenterY);
  line(0, 0, gameQuarterX, gameQuarterY);
  line(0, gameHeight, gameQuarterX, gameHeight - gameQuarterY);
  line(gameWidth, 0, gameWidth - gameQuarterX, gameQuarterY);
  line(gameWidth, gameHeight, gameWidth - gameQuarterX, gameHeight - gameQuarterY);
}

function drawBall() {
  var ballWidth = 48;
  fill(255);
  strokeWeight(0);
  ellipse(gameCenterX, gameCenterY, ballWidth, ballWidth);
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
