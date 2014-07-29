var game;
function test1() {
  var entity = game._builder.createBlock('_b10', 300, 250, 400, 20, 0xFFFFFF);
  game.addEntity(entity);

  var block = game._builder.createBlock('b1', 350, 60, 20, 20);
  block.frozen = false;
  game.addEntity(block);
  block._physics.xSpeed = 5;
  block._physics.ySpeed = 10;
}

function test2() {
  var block = game._builder.createBlock('b1', 350, 60, 20, 20);
  block.frozen = false;
  game.addEntity(block);
}

function test3() {
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
  var staticBlock1 = game._builder.createBlock('wall_left', 300, 300, 20, 100, 0xFFFFFF);
  staticBlock1.frozen = true;
  game.addEntity(staticBlock1);

  var staticBlock2 = game._builder.createBlock('wall_top', 300, 280, 400, 20, 0xFFFFFF);
  staticBlock2.frozen = true;
  game.addEntity(staticBlock2);

  var staticBlock4 = game._builder.createBlock('wall_bottom', 320, 360, 400, 20, 0xFFFFFF);
  staticBlock4.frozen = true;
  game.addEntity(staticBlock4);

  var staticBlock5 = game._builder.createBlock('wall_right', 680, 300, 20, 60, 0xFFFFFF);
  staticBlock4.frozen = true;
  game.addEntity(staticBlock5);

  var staticBlock6 = game._builder.createBlock('wall_left2', 500, 300, 20, 100, 0xFFFFFF);
  staticBlock6.frozen = true;
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

  var staticBlock5 = game._builder.createBlock('wall_small_top', 700, 100, 150, 5, 0xFFFFFF);
  staticBlock5.frozen = true;
  game.addEntity(staticBlock5);

  var staticBlock6 = game._builder.createBlock('wall_small_left', 645, 80, 55, 150, 0xFFFFFF);
  staticBlock6.frozen = true;
  game.addEntity(staticBlock6);

  var staticBlock7 = game._builder.createBlock('wall_small_bottom', 700, 200, 200, 5, 0xFFFFFF);
  staticBlock7.frozen = true;
  game.addEntity(staticBlock7);

  var staticBlock8 = game._builder.createBlock('wall_small_right', 850, 100, 5, 200, 0xFFFFFF);
  staticBlock8.frozen = true;
  game.addEntity(staticBlock8);
}

function testRooms3Closed() {
  var staticBlock1 = game._builder.createBlock('1', 55, 50, 500, 5, 0xFFFFFF);
  staticBlock1.frozen = true;
  game.addEntity(staticBlock1);

  var staticBlock2 = game._builder.createBlock('2', 555, 50, 5, 200, 0xFFFFFF);
  staticBlock2.frozen = true;
  game.addEntity(staticBlock2);

  var staticBlock3 = game._builder.createBlock('3', 555, 250, 50, 5, 0xFFFFFF);
  staticBlock3.frozen = true;
  game.addEntity(staticBlock3);

  var staticBlock4 = game._builder.createBlock('4', 600, 50, 5, 200, 0xFFFFFF);
  staticBlock4.frozen = true;
  game.addEntity(staticBlock4);

  var staticBlock5 = game._builder.createBlock('5', 600, 50, 200, 5, 0xFFFFFF);
  staticBlock5.frozen = true;
  game.addEntity(staticBlock5);

  var staticBlock6 = game._builder.createBlock('6', 800, 50, 5, 400, 0xFFFFFF);
  staticBlock6.frozen = true;
  game.addEntity(staticBlock6);

  var staticBlock7 = game._builder.createBlock('7', 55, 450, 750, 5, 0xFFFFFF);
  staticBlock7.frozen = true;
  game.addEntity(staticBlock7);

  var staticBlock8 = game._builder.createBlock('8', 55, 50, 5, 400, 0xFFFFFF);
  staticBlock8.frozen = true;
  game.addEntity(staticBlock8);
}

function testRooms4Closed() {
  var staticBlock1 = game._builder.createBlock('1', 55, 50, 500, 5, 0xFFFFFF);
  staticBlock1.frozen = true;
  game.addEntity(staticBlock1);

  var staticBlock2 = game._builder.createBlock('2', 555, 50, 45, 100, 0xFFFFFF);
  staticBlock2.frozen = true;
  game.addEntity(staticBlock2);

  var staticBlock5 = game._builder.createBlock('5', 600, 50, 200, 5, 0xFFFFFF);
  staticBlock5.frozen = true;
  game.addEntity(staticBlock5);

  var staticBlock6 = game._builder.createBlock('6', 800, 50, 5, 400, 0xFFFFFF);
  staticBlock6.frozen = true;
  game.addEntity(staticBlock6);

  var staticBlock7 = game._builder.createBlock('7', 55, 450, 750, 5, 0xFFFFFF);
  staticBlock7.frozen = true;
  game.addEntity(staticBlock7);

  var staticBlock8 = game._builder.createBlock('8', 55, 50, 5, 400, 0xFFFFFF);
  staticBlock8.frozen = true;
  game.addEntity(staticBlock8);
}

function builderTest1() {
  testRooms3Closed();
  test1();
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
  testRooms1();
  //testRooms2Closed();
  //testRooms3Closed();
  //testRooms4Closed();
  //builderTest1();
  //testRooms1();

  //game._builder.clearRooms();
  //game._builder.buildConnections(game.getEntityManager().getAllEntities());
};
