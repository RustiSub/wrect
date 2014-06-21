var game;
window.onload = function() {
  game = new Game();

  var blockGraphics = new PIXI.Graphics();
  blockGraphics.beginFill(0x00FF00);
  blockGraphics.drawRect(100, 100, 10, 10);
  blockGraphics.endFill();

  var block = new Block(blockGraphics);
  block.name = 'block1';

  game.getEntityManager().addEntity(block);

  var circleGraphics = new PIXI.Graphics();
  circleGraphics.beginFill(0x00FF00);
  circleGraphics.drawCircle(200, 100, 10);
  circleGraphics.endFill();

  var circle = new Block(circleGraphics);
  circle.name = 'circle1';

  game.getEntityManager().addEntity(circle);

  
};
