var game;
window.onload = function() {
  game = new Game();
  //game.addEntity(createCircle('c1'));
  var block = game._builder.createBlock('b1', 500, 50, 20, 20);
  game.addEntity(block);
  block._physics.xSpeed = 100;
  block._physics.ySpeed = 70;
//  block._physics.xSpeed = -5;
//  var block2 = game._builder.createBlock('b2', 250, 10, 20, 20);
//  game.addEntity(block2);
//  block2._physics.ySpeed = 0;
//  block2._physics.xSpeed = 5;
//  game.addEntity(game._builder.createBlock('b3', 190, 190, 20, 20));
//  game.addEntity(game._builder.createBlock('b4', 300, 250, 20, 20));
//  game.addEntity(game._builder.createBlock('b5', 170, 340, 20, 20));
//  game.addEntity(game._builder.createBlock('b6', 600, 50, 20, 20));
//  game.addEntity(game._builder.createBlock('b7', 540, 150, 20, 20));
//  game.addEntity(game._builder.createBlock('b8', 710, 190, 20, 20));
//  game.addEntity(game._builder.createBlock('b9', 670, 250, 20, 20));
//  game.addEntity(game._builder.createBlock('b10', 880, 340, 20, 20));

  var entity = game._builder.createBlock('_b10', 300, 200, 400, 20, 0xFFFFFF);
//  game.addEntity(entity);

//  entity.applyGlue();

  var height = 400;
  var width = 1000;

  game.addEntity(game._builder.createBorder('_left', {
    x: 5,
    y: 5,
    width: 5,
    height: height
  }));

  game.addEntity(game._builder.createBorder('_right', {
    x: 5 + width,
    y: 5,
    width: 5,
    height: height
  }));


  game.addEntity(game._builder.createBorder('_top', {
    x: 5,
    y: 5,
    width: width,
    height: 5
  }));

  game.addEntity(game._builder.createBorder('_bottom', {
    x: 5,
    y: 5 + height,
    width: width,
    height: 5
  }));
};
