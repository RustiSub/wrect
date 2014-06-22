var game;

function createBlock() {
  var width = 20;
  var height = 20;
  var blockGraphics = new PIXI.Graphics();
  blockGraphics.position.x = 100;
  blockGraphics.position.y = 100;

  var block = new Block(blockGraphics);
  block.name = 'block1';
  block.position = blockGraphics.position;

  block.baseGraphicsCallback = function() {
    block._graphics.beginFill(0x00FF00);
    block._graphics.drawRect(this._graphics.position.x, this._graphics.position.y, width, height);
    block._graphics.endFill();
  };

  block.selectedGraphicsCallback = function() {
    block._graphics.beginFill(0xFF0000);
    block._graphics.drawRect(this._graphics.position.x - 1, this._graphics.position.y - 1, width + 2, height + 2);
    block._graphics.endFill();

    block.baseGraphicsCallback();
  };

  block.baseGraphicsCallback();

  block.size = {x: width, y: height};

  return block;
}

function createCircle() {
  var radius = 20;
  var circleGraphics = new PIXI.Graphics();
  circleGraphics.position.x = 200;
  circleGraphics.position.y = 100;

  var circle = new Block(circleGraphics);
  circle.name = 'circle1';
  circle.position = circleGraphics.position;

  circle.baseGraphicsCallback = function() {
    circleGraphics.beginFill(0x00FF00);
    circleGraphics.drawCircle(this._graphics.position.x, this._graphics.position.y, radius);
    circleGraphics.endFill();
  };

  circle.selectedGraphicsCallback = function() {
    circle._graphics.beginFill(0xFF0000, 90);
    circle._graphics.drawCircle(this._graphics.position.x, this._graphics.position.y, radius + 1);
    circle._graphics.endFill();

    circle.baseGraphicsCallback();
  };

  circle.baseGraphicsCallback();

  circle.size = {x: radius, y:radius};

  return circle;
}

window.onload = function() {
   game = new Game();

  game.getEntityManager().addEntity(createBlock());
  game.getEntityManager().addEntity(createCircle());
};
