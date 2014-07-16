var game;
function test1() {
  var entity = game._builder.createBlock('_b10', 300, 250, 400, 20, 0xFFFFFF);
  game.addEntity(entity);

  var block = game._builder.createBlock('b1', 350, 60, 20, 20);
  block.frozen = false;
  game.addEntity(block);
  block._physics.xSpeed = 0;
  block._physics.ySpeed = 5;
}

function test2() {
  var block = game._builder.createBlock('b1', 350, 60, 20, 20);
  block.frozen = false;
  game.addEntity(block);
  block._physics.xSpeed = 1;
  block._physics.ySpeed = 5;
}

function test3() {
  //game.addEntity(createCircle('c1'));

  //block._physics.ySpeed = -5;
//  block._physics.xSpeed = -5;
//  var block2 = game._builder.createBlock('b2', 250, 10, 20, 20);
//  game.addEntity(block2);
//  block2._physics.ySpeed = 0;
//  block2._physics.xSpeed = 5;
  var entity = game._builder.createBlock('b1', 190, 190, 20, 20);
  game.addEntity(entity);

  game.addEntity(game._builder.createBlock('b4', 300, 250, 20, 20));
  game.addEntity(game._builder.createBlock('b5', 170, 340, 20, 20));
  game.addEntity(game._builder.createBlock('b6', 600, 50, 20, 20));
  game.addEntity(game._builder.createBlock('b7', 540, 150, 20, 20));
  game.addEntity(game._builder.createBlock('b8', 710, 190, 20, 20));
  game.addEntity(game._builder.createBlock('b9', 670, 250, 20, 20));
  game.addEntity(game._builder.createBlock('b10', 880, 340, 20, 20));

  var staticBlock1 = game._builder.createBlock('_b1', 300, 100, 400, 20, 0xFFFFFF);
  staticBlock1.frozen = true;
  game.addEntity(staticBlock1);

  var staticBlock2 = game._builder.createBlock('_b2', 300, 300, 400, 20, 0xFFFFFF);
  staticBlock2.frozen = true;
  game.addEntity(staticBlock2);

  var staticBlock3 = game._builder.createBlock('_b2', 450, 100, 20, 200, 0xFFFFFF);
  staticBlock2.frozen = true;
  game.addEntity(staticBlock3);
}

function createFrame() {
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
}
function triangleTest1() {
  var entity = game._builder.createBlock('b3', 190, 190, 20, 20);
  game.addEntity(entity);
}
function testCollide1() {
  var speed = 5;
  var block1 = game._builder.createBlock('b1', 185, 50, 20, 20);
  game.addEntity(block1);
  block1._physics.xSpeed = speed;
  var block2 = game._builder.createBlock('b2', 810, 50, 20, 20, 0xFF0000);
  game.addEntity(block2);
  block2._physics.xSpeed = -speed;
}
function testCollide2() {
  var speed = 5;
  var block1 = game._builder.createBlock('b1', 185, 50, 20, 20);
  game.addEntity(block1);
  block1._physics.xSpeed = speed;
  var block2 = game._builder.createBlock('b2', 250, 50, 20, 20, 0xFF0000);
  game.addEntity(block2);
  block2._physics.xSpeed = 4;
}

function testRooms1() {
  var staticBlock1 = game._builder.createBlock('wall_left', 300, 100, 20, 100, 0xFFFFFF);
  staticBlock1.frozen = true;
  game.addEntity(staticBlock1);

  var staticBlock2 = game._builder.createBlock('wall_top', 300, 200, 400, 20, 0xFFFFFF);
  staticBlock2.frozen = true;
  game.addEntity(staticBlock2);

//  var staticBlock3 = game._builder.createBlock('wall_right', 700, 100, 20, 200, 0xFFFFFF);
//  staticBlock.frozen = true;
//  game.addEntity(staticBlock3);

  var staticBlock4 = game._builder.createBlock('wall_bottom', 320, 350, 400, 20, 0xFFFFFF);
  staticBlock4.frozen = true;
  game.addEntity(staticBlock4);

  var staticBlock5 = game._builder.createBlock('wall_bottom2', 720, 350, 20, 60, 0xFFFFFF);
  staticBlock4.frozen = true;
  game.addEntity(staticBlock5);

  var staticBlock6 = game._builder.createBlock('wall_bottom3', 740, 380, 80, 20, 0xFFFFFF);
  staticBlock4.frozen = true;
  game.addEntity(staticBlock6);
}

function testRooms2Closed() {
  var staticBlock1 = game._builder.createBlock('wall_top', 55, 50, 500, 20, 0xFFFFFF);
  staticBlock1.frozen = true;
  game.addEntity(staticBlock1);

  var staticBlock2 = game._builder.createBlock('wall_left', 20, 70, 50, 500, 0xFFFFFF);
  staticBlock2.frozen = true;
  game.addEntity(staticBlock2);

  var staticBlock3 = game._builder.createBlock('wall_bottom', 70, 500, 460, 20, 0xFFFFFF);
  staticBlock3.frozen = true;
  game.addEntity(staticBlock3);

  var staticBlock4 = game._builder.createBlock('wall_right', 530, 70, 20, 500, 0xFFFFFF);
  staticBlock4.frozen = true;
  game.addEntity(staticBlock4);
}

function builderTest1() {
  var entity = game._builder.createBlock('b1', 190, 190, 20, 20);
  game.addEntity(entity);
}

window.onload = function() {
  game = new Game();
  //entity.applyGlue();

  //createFrame();
  //test1();
  //test2();
  //test3();
  //testCollide1();
  //testCollide2();
  //testRooms1();
  //testRooms1();
  testRooms2Closed();
  //builderTest1();

  game._builder.buildConnections(game.getEntityManager().getAllEntities());
};
