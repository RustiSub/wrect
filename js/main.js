var game;

function createBorder(name, coords) {
  var width = coords.width;
  var height = coords.height;
  var blockGraphics = new PIXI.Graphics();

  var block = new Block(name, blockGraphics);
  block.name = name;
  block.position = blockGraphics.position;

  block.baseGraphicsCallback = function() {
    block._graphics.beginFill(0xFFFFFF);
    block._graphics.drawRect(0, 0, coords.width, coords.height);
    block._graphics.endFill();
  };

  block.baseGraphicsCallback();

  block.size = {x: width, y: height};

  blockGraphics.position.x = coords.x;
  blockGraphics.position.y = coords.y;

  return block;
}

function createBlock(name) {
  var width = 20;
  var height = 20;
  var blockGraphics = new PIXI.Graphics();

  var block = new Block(name, blockGraphics);
  block.name = name;
  block.position = blockGraphics.position;

  block.baseGraphicsCallback = function() {
    block._graphics.beginFill(0x00FF00);
    block._graphics.drawRect(0, 0, width, height);
    block._graphics.endFill();
  };

  block.selectedGraphicsCallback = function() {
    block._graphics.beginFill(0xFF0000);
    block._graphics.drawRect(0 - 1, 0- 1, width + 2, height + 2);
    block._graphics.endFill();

    block.baseGraphicsCallback();
  };

  block.baseGraphicsCallback();

  block.size = {x: width, y: height};

  blockGraphics.position.x = 50;
  blockGraphics.position.y = 50;

  return block;
}

function createCircle(name) {
  var radius = 20;
  var circleGraphics = new PIXI.Graphics();

  var circle = new Block(name, circleGraphics);
  circle.name = name;
  circle.position = circleGraphics.position;

  circle.baseGraphicsCallback = function() {
    circleGraphics.beginFill(0x00FF00);
    circleGraphics.drawCircle(0, 0, radius);
    circleGraphics.endFill();
  };

  circle.selectedGraphicsCallback = function() {
    circle._graphics.beginFill(0xFF0000, 90);
    circle._graphics.drawCircle(0,0, radius + 1);
    circle._graphics.endFill();

    circle.baseGraphicsCallback();
  };

  circle.baseGraphicsCallback();

  circle.size = {x: radius, y:radius};

  circleGraphics.position.x = 120;
  circleGraphics.position.y = 50;

  return circle;
}

window.onload = function() {
  game = new Game();
  game.getEntityManager().addEntity(createCircle('c1'));
  game.getEntityManager().addEntity(createBlock('b1'));

  game.getEntityManager().addEntity(createBorder('left', {
    x: 5,
    y: 5,
    width: 5,
    height: 400
  }));

  game.getEntityManager().addEntity(createBorder('right', {
    x: 5 + 400,
    y: 5,
    width: 5,
    height: 400
  }));

  game.getEntityManager().addEntity(createBorder('top', {
    x: 5,
    y: 5,
    width: 400,
    height: 5
  }));

  game.getEntityManager().addEntity(createBorder('bottom', {
    x: 5,
    y: 5 + 400,
    width: 400,
    height: 5
  }));
};
