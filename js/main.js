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

  var left = game._builder.createBlock('_left',
    5,
    5,
    5,
    height
  );


  var right = game._builder.createBlock('_right',
      5 + width,
    5,
    5,
    height
  );



  var top = game._builder.createBlock('_top',
    5,
    5,
    width,
    5
  );


  var bottom = game._builder.createBlock('_bottom',
    5,
      5 + height,
    width,
    5
  );
  bottom.frozen = true;
  left.frozen = true;
  right.frozen = true;
  top.frozen = true;

  game.addEntity(bottom);
  game.addEntity(left);
  game.addEntity(right);
  game.addEntity(top);
}
function triangleTest1() {
    var entity = game._builder.createBlock('b3', 190, 190, 20, 20);
    game.addEntity(entity);
}
function testCollide1() {
  var speed = 10;
  var block1 = game._builder.createBlock('b1', 185, 50, 20, 20);

  game.addEntity(block1);

  block1._physics.forceVectors.push(new Vector(speed, speed / 2,
      function(delta, vector) {
        if (vector.x != 0) {
          //vector.x *= 0.95;
        }
      }
  ));
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
    var staticBlock1 = game._builder.createBlock('wall_left', 300, 310, 20, 100, 0xFFFFFF);
    staticBlock1.frozen = true;
    staticBlock1.glueSource = true;
    staticBlock1.baseGraphicsCallback();
    game.addEntity(staticBlock1);

    var staticBlock2 = game._builder.createBlock('wall_top', 320, 280, 400, 20, 0xFFFFFF);
    staticBlock2.frozen = true;
    game.addEntity(staticBlock2);

    var staticBlock4 = game._builder.createBlock('wall_bottom', 320, 410, 400, 20, 0xFFFFFF);
    staticBlock4.frozen = true;
    game.addEntity(staticBlock4);

    var staticBlock5 = game._builder.createBlock('wall_right', 680, 300, 20, 60, 0xFFFFFF);
    staticBlock5.frozen = true;
    game.addEntity(staticBlock5);

    var staticBlock6 = game._builder.createBlock('wall_left2', 500, 300, 20, 100, 0xFFFFFF);
    staticBlock6.frozen = true;
    staticBlock6.glueSource = true;
    game.addEntity(staticBlock6);
}

function builderTest2() {
    var staticBlock1 = game._builder.createBlock('wall_left', 300, 310, 20, 200, 0xFFFFFF);
    staticBlock1.frozen = true;
    staticBlock1.glueSource = true;
    staticBlock1.baseGraphicsCallback();
    game.addEntity(staticBlock1);
}

function builderTest3() {
    var staticBlock1 = game._builder.createBlock('wall_0', 500, 215, 200, 20, 0xFFFFFF);
    game.addEntity(staticBlock1);

    var staticBlock2 = game._builder.createBlock('wall_1', 500, 310, 200, 20, 0xFFFFFF);
    staticBlock2.glueSource = true;
    game.addEntity(staticBlock2);

    var staticBlock3 = game._builder.createBlock('wall_2', 500, 515, 200, 20, 0xFFFFFF);
    game.addEntity(staticBlock3);

    game.addEntity(game._builder.createBlock('wall_3', 300, 220, 20, 200, 0xFFFFFF));
    game.addEntity(game._builder.createBlock('wall_4', 900, 215, 20, 200, 0xFFFFFF));
}

function builderTest4() {
    var staticBlock1 = game._builder.createBlock('wall_0', 10, 515, 20, 20, 0xFFFFFF);
    game.addEntity(staticBlock1);

    var staticBlock2 = game._builder.createBlock('wall_1', 10, 610, 20, 20, 0xFFFFFF);
    staticBlock2.glueSource = true;
    game.addEntity(staticBlock2);

    game.addEntity(game._builder.createBlock('wall_2', 100, 515, 20, 20, 0xFFFFFF));
    game.addEntity(game._builder.createBlock('wall_3', 200, 515, 20, 20, 0xFFFFFF));
    game.addEntity(game._builder.createBlock('wall_4', 300, 515, 20, 20, 0xFFFFFF));
}

function builderTest5() {
    var staticBlock2 = game._builder.createBlock('wall_1', 600, 400, 20, 20, 0xFFFFFF);
    staticBlock2.glueSource = true;
    game.addEntity(staticBlock2);

    game.addEntity(game._builder.createBlock('wall_u_4', 500, 300, 20, 20, 0xFFFFFF));
    game.addEntity(game._builder.createBlock('wall_u_5', 600, 300, 20, 20, 0xFFFFFF));
    game.addEntity(game._builder.createBlock('wall_u_6', 700, 300, 20, 20, 0xFFFFFF));

    game.addEntity(game._builder.createBlock('wall_u2_4', 500, 250, 20, 20, 0xFFFFFF));
    game.addEntity(game._builder.createBlock('wall_u2_5', 600, 250, 20, 20, 0xFFFFFF));
    game.addEntity(game._builder.createBlock('wall_u2_6', 700, 250, 20, 20, 0xFFFFFF));

    game.addEntity(game._builder.createBlock('wall_d_4', 500, 500, 20, 20, 0xFFFFFF));
    game.addEntity(game._builder.createBlock('wall_d_5', 600, 500, 20, 20, 0xFFFFFF));
    game.addEntity(game._builder.createBlock('wall_d_6', 700, 500, 20, 20, 0xFFFFFF));

    game.addEntity(game._builder.createBlock('wall_d2_4', 500, 550, 20, 20, 0xFFFFFF));
    game.addEntity(game._builder.createBlock('wall_d2_5', 600, 550, 20, 20, 0xFFFFFF));
    game.addEntity(game._builder.createBlock('wall_d2_6', 700, 550, 20, 20, 0xFFFFFF));

    game.addEntity(game._builder.createBlock('wall_l_4', 500, 350, 20, 20, 0xFFFFFF));
    game.addEntity(game._builder.createBlock('wall_l_5', 500, 400, 20, 20, 0xFFFFFF));
    game.addEntity(game._builder.createBlock('wall_l_6', 500, 450, 20, 20, 0xFFFFFF));

    game.addEntity(game._builder.createBlock('wall_l1_4', 450, 350, 20, 20, 0xFFFFFF));
    game.addEntity(game._builder.createBlock('wall_l1_5', 450, 400, 20, 20, 0xFFFFFF));
    game.addEntity(game._builder.createBlock('wall_l1_6', 450, 450, 20, 20, 0xFFFFFF));

    game.addEntity(game._builder.createBlock('wall_r_4', 700, 350, 20, 20, 0xFFFFFF));
    game.addEntity(game._builder.createBlock('wall_r_5', 700, 400, 20, 20, 0xFFFFFF));
    game.addEntity(game._builder.createBlock('wall_r_6', 700, 450, 20, 20, 0xFFFFFF));

    game.addEntity(game._builder.createBlock('wall_r1_4', 750, 350, 20, 20, 0xFFFFFF));
    game.addEntity(game._builder.createBlock('wall_r1_5', 750, 400, 20, 20, 0xFFFFFF));
    game.addEntity(game._builder.createBlock('wall_r1_6', 750, 450, 20, 20, 0xFFFFFF));
}

function builderTest6() {
    var staticBlock2 = game._builder.createBlock('wall_1', 600, 400, 20, 20, 0xFFFFFF);
    staticBlock2.glueSource = true;
    game.addEntity(staticBlock2);

    game.addEntity(game._builder.createBlock('wall_u_3', 300, 300, 20, 20, 0xFFFFFF));
    game.addEntity(game._builder.createBlock('wall_u_4', 900, 300, 20, 20, 0xFFFFFF));

}


function buildShip1() {
    var forceGenerator = game._builder.createBlock('wall_1', 600, 300, 20, 20, 0xFFFFFF);
    forceGenerator.glueSource = true;
    game.addEntity(forceGenerator);

    game.addEntity(game._builder.createBlock('r', 620, 300, 200, 20, 0xFFFFFF));
    game.addEntity(game._builder.createBlock('l', 400, 300, 200, 20, 0xFFFFFF));

    game.addEntity(game._builder.createBlock("created_block_3",380, 208, 20, 200, 0xFFFFFF));
    game.addEntity(game._builder.createBlock("created_block_4",382, 188, 200, 20, 0xFFFFFF));
    game.addEntity(game._builder.createBlock("created_block_5",582, 186.5, 200, 20, 0xFFFFFF));
    game.addEntity(game._builder.createBlock("created_block_6",782, 187, 200, 20, 0xFFFFFF));
    game.addEntity(game._builder.createBlock("created_block_7",400, 385.5, 200, 20, 0xFFFFFF));
    game.addEntity(game._builder.createBlock("created_block_8",600, 384.5, 200, 20, 0xFFFFFF));
    game.addEntity(game._builder.createBlock("created_block_9",800, 384.5, 200, 20, 0xFFFFFF));
    game.addEntity(game._builder.createBlock("created_block_10",982, 184.5, 20, 200, 0xFFFFFF));

    game.addEntity(game._builder.createBlock('wall_5', 690, 345, 20, 20, 0xFFFFFF));
    game.addEntity(game._builder.createBlock('wall_6', 750, 250, 20, 20, 0xFFFFFF));
}

function vectorTest1() {
  //createFrame();
  var block2 = game._builder.createBlock('b2', 500, 0 , 20, 400);
  game.addEntity(block2);
  var block1 = game._builder.createBlock('b1', 100, 150 , 150, 20, 0xFFFFFF);
  block1.physicsBody.v = new Vector(4 ,1);
  game.addEntity(block1);
}

function vectorTest2() {
  //createFrame();
  var block2 = game._builder.createBlock('b2', 10, 400 , 700, 20);
  game.addEntity(block2);
  var block1 = game._builder.createBlock('b1', 100, 150 , 20, 150, 0xFFFFFF);
  block1.physicsBody.v = new Vector(1, 4);
  game.addEntity(block1);
}

function vectorTest_pivot_1() {
  //createFrame();

  var block1 = game._builder.createBlock('b1', 200, 350 , 20, 50, 0xFFFFFF);
  block1.physicsBody.v = new Vector(0, 10);
  game.addEntity(block1);

  var block0 = game._builder.createBlock('b0', 200, 190 , 20, 50, 0xFFFFFF);
  block0.physicsBody.v = new Vector(0, 10);
  game.addEntity(block0);

  var block2 = game._builder.createBlock('b2', 100, 500 , 250, 20);
  block2._physics.rotate(block2.physicsBody, block2.dimensions, game._helpers.math.toRadians(45));
  block2.frozen = true;
  game.addEntity(block2);

  var block3 = game._builder.createBlock('b3', 500, 500 , 250, 20);
  block3._physics.rotate(block3.physicsBody, block3.dimensions, game._helpers.math.toRadians(-45));
  block3.frozen = true;
  game.addEntity(block3);

  var block4 = game._builder.createBlock('b4', 100, 150 , 250, 20);
  block4._physics.rotate(block4.physicsBody, block4.dimensions, game._helpers.math.toRadians(-45));
  block4.frozen = true;
  game.addEntity(block4);

  var block5 = game._builder.createBlock('b5', 500, 150 , 250, 20);
  block5._physics.rotate(block5.physicsBody, block5.dimensions, game._helpers.math.toRadians(45));
  block5.frozen = true;
  game.addEntity(block5);
}

function vectorTest_moving_1() {
  var block2 = game._builder.createBlock('left', 100, 150 , 20, 350);
  block2.frozen = true;
  game.addEntity(block2);

  var block1 = game._builder.createBlock('block1',150, 250 , 20, 50, 0xFFFFFF);
  block1.physicsBody.v = new Vector(10, 0);
  game.addEntity(block1);

  var block3 = game._builder.createBlock('block2', 650, 250 , 20, 50, 0xFFFFFF);
  block3.physicsBody.v = new Vector(-10, 0);
  game.addEntity(block3);

  var block4 = game._builder.createBlock('right', 900, 150 , 20, 350);
  block4.frozen = true;
  game.addEntity(block4);
}

function quadTreeTest1() {
  var blockSize = 30;
  for (var l= 0; l < 1; l++) {
    for (var t= 0; t < 10; t++) {
      game.addEntity(game._builder.createBlock(
          'wall_spam_left_' + t + '_' + l,
          50 + t * (blockSize + 5) + l * 50,
          50 + l  * (blockSize + 5) + t * 50,
        blockSize, blockSize, 0xFFFFFF));
    }
  }
}


function quadTreeTest2() {
  var forceGenerator = game._builder.createBlock('wall_1', 600, 250, 20, 20, 0xFFFFFF);
//  forceGenerator.glueSource = true;
  game.addEntity(forceGenerator);

    for (var l= 0; l < 20; l++) {
        for (var t= 0; t < 50; t++) {
            game.addEntity(game._builder.createBlock('wall_spam_' + t + '_' + l, 50 + t * 21, 50 + l * 21, 20, 20, 0xFFFFFF));
        }
    }
}

function quadTreeTest3() {
  createFrame();

//  var forceGenerator = game._builder.createBlock('force_generator', 500, 200, 20, 20, 0xFFFFFF);
////  forceGenerator.glueSource = true;
//  game.addEntity(forceGenerator);

  var blockSize = 30;
  for (var l= 0; l < 4; l++) {
    for (var t= 0; t < 15; t++) {
      var entity = game._builder.createBlock(
          'wall_spam_top_' + t + '_' + l,
          55 + t * (blockSize + 25),
          50 + l * (blockSize + 5) ,
          blockSize, blockSize, (Math.random()*0xFFFFFF<<0), 0.7);
      entity._physics.ySpeed = t;
      entity._physics.xSpeed = t;
      game.addEntity(entity);
    }
  }
}

function quadTreeTest4() {
  createFrame();

  var blockSize = 20;
  var xSpeed = 0;
  var ySpeed = 10;
  var stack = 10;

  var colorLeft = (Math.random() * 0xFFFFFF << 0);
  for (var l= 0; l < stack; l++) {
    for (var t= 0; t < 1; t++) {

      var entity = game._builder.createBlock(
          'wall_spam_left_' + t + '_' + l,
          55 + t * (blockSize),
          50 + l * (blockSize  + 2),
          blockSize, blockSize, colorLeft, 1);
      entity._physics.ySpeed = ySpeed;
      entity._physics.xSpeed = xSpeed;
      game.addEntity(entity);
    }
  }
  var colorRight = (Math.random() * 0xFFFFFF << 0);
  for (var l= 0; l < stack; l++) {
    for (var t= 0; t < 1; t++) {

      var entity = game._builder.createBlock(
          'wall_spam_right_' + t + '_' + l,
          900 + t * (blockSize),
          50 + l * (blockSize + 2),
          blockSize, blockSize, colorRight, 1);
      entity._physics.ySpeed = ySpeed;
      entity._physics.xSpeed = -xSpeed;
      game.addEntity(entity);
    }
  }
}

function entityStressTest2() {
//  createFrame();

  var forceGenerator = game._builder.createBlock('force_generator', 300, 150, 20, 20, 0xFFFFFF);
  forceGenerator.glueSource = true;
  game.addEntity(forceGenerator);

  var blockSize = 20;

  for (var l= 1; l < 25 ; l++) {
    for (var t= 1; t < 50; t++) {
      game.addEntity(game._builder.createBlock
        (
          'wall_spam_' + t,
           t * (blockSize),  l * (blockSize),
          blockSize,
          blockSize,
          0xFFFFFF
        )
      );
    }
  }

  console.log(game.getEntityManager().getAllEntities().length);
}

function addGui() {
    /* var fullscreenButton = new window.ImageButton('resources/gui/maximize.png', 24, 24, {right: 0, bottom: 0});
     fullscreenButton.addEvent('click', function(){game.goFullscreen();});
     game.getGuiManager().addElement(fullscreenButton);

     var panel = new window.Panel({
     backgroundColor: '#ccc',
     width: 160,
     height: 160,
     defaultState: 'closed',
     panelPosition: 'left'
     });
     game.getGuiManager().addElement(panel);

     var secondButton = new window.ImageButton('resources/gui/plus.png', 24, 24, {top: "20px", left: "20px"});
     secondButton.addEvent('click', function(){
     window.game._builder.createObject(false);
     });
     panel.addChild(secondButton);*/
    var rootGui = game.getGuiManager().getRoot();
    var panel = new window.Panel({
        name: 'panel1',
        cols: 5,
        rows: 1,
        css: {
            border: '1px solid white',
            backgroundColor: '#CCC'
        },
        position: {
            x: 8,
            y: 8
        }
    });
    rootGui.addElement(panel);
    var inputBox = game.getGuiManager().createElement('Textbox', {
        name: 'text1',
        rows: 1,
        cols: 5,
        position: {
            x: 8,
            y: 8
        }
    });
    rootGui.addElement(inputBox);
    var checkbox = game.getGuiManager().createElement('Checkbox', {
        name: 'chk1',
        value: true,
        rows: 1,
        cols: 1,
        position: {
            x: 9,
            y: 8
        }
    });
    rootGui.addElement(checkbox);
}

window.onload = function() {
    game = new Game({
        debug: true,
        width: window.innerWidth,
        height: window.innerHeight,
        defaultLevel: 'test1'
    });
    //entity.applyGlue();

    //createFrame();
    //test1();
    //test2();
    //test3();
    //testCollide1();
    //testCollide2();

  addGui();
  //testRooms1();
  //testRooms1();
  //testRooms2Closed();
  //testRooms3Closed();
  //testRooms4Closed();
  //builderTest1();
  //builderTest2();
  //builderTest3();
  //builderTest5();
  //buildShip1();

  //vectorTest1();
  //vectorTest2();
  vectorTest_pivot_1();
  //vectorTest_moving_1();
  //entityStressTest2();
  //game._builder.clearRooms();
  //game._builder.buildConnections(game.getEntityManager().getAllEntities());
};
