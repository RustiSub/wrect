var Builder = Class.extend({
  createBorder: function (name, coords) {
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
  },

  createBlock: function (name, x, y, width, height, color) {
    color = typeof color !== 'undefined' ? color : 0x00FF00;

    var blockGraphics = new PIXI.Graphics();

    var block = new Block(name, blockGraphics);
    block.name = name;
    block.position = blockGraphics.position;

    block.baseGraphicsCallback = function() {
      block._graphics.beginFill(color);
      block._graphics.drawRect(0, 0, width, height);
      block._graphics.endFill();
    };

    block.selectedGraphicsCallback = function() {
      block._graphics.beginFill(0xFF0000);
      block._graphics.drawRect(0 - 1, 0- 1, width + 2, height + 2);
      block._graphics.endFill();
    };

    block.damagedGraphicsCallback = function(damage) {
      if (block.destructible == true) {
        block._graphics.clear();
        block._graphics.beginFill(color, damage);
        block._graphics.drawRect(0, 0, width, height);
        block._graphics.endFill();

        if (block.damage.health <= 0) {
          block.size.x = 0;
          block.size.y = 0;
          block.position.x = 0;
          block.position.y = 0;
          block._graphics.clear();
        }
      }
    };

    block.baseGraphicsCallback();

    block.size = {x: width, y: height};

    blockGraphics.position.x = x;
    blockGraphics.position.y = y;

    block.frozen = false;

    return block;
  },

  createCircle: function (name) {
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
  },

  createTriangle: function(name) {
    var color = typeof color !== 'undefined' ? color : 0xFFFFFF;

    var graphics = new PIXI.Graphics();

    var triangle = new Triangle(name, graphics);
    triangle.name = name;
    triangle.position = graphics.position;

    triangle.baseGraphicsCallback = function() {
      triangle._graphics.beginFill(color);
      triangle._graphics.lineTo(20,20);
      triangle._graphics.endFill();
    };

    triangle.baseGraphicsCallback();

    triangle.size = {x: width, y: height};

    graphics.position.x = x;
    graphics.position.y = y;

    triangle.frozen = false;

    return triangle;
  }
});
