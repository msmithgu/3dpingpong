var gameWidth = 640,
    gameHeight = 480;

function setup() {
  createCanvas(gameWidth, gameHeight);
  noCursor();
}

function draw() {
  clear();
  // ball
  ellipse(50, 50, 50, 50);

  /**
   * paddle
   */
  var paddleX = mouseX || gameWidth/2, paddleY = mouseY || gameHeight/2;
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
  stroke(0, 255, 0);
  strokeWeight(paddleStroke/2);
  rect( paddleX - paddleWidth/4, paddleY - paddleHeight/4,
        paddleWidth/2, paddleHeight/2,
        paddleRounding/2 );

}
