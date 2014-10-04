var game;

function test1() {
  var forceGenerator = game._builder.createBlock('wall_1', 600, 250, 20, 20, 0xFFFFFF);
//  forceGenerator.glueSource = true;
  game.addEntity(forceGenerator);

  for (var l= 0; l < 20; l++) {
    for (var t= 0; t < 50; t++) {
      game.addEntity(game._builder.createBlock('wall_spam_' + t + '_' + l, 50 + t * 21, 50 + l * 21, 20, 20, 0xFFFFFF));
    }
  }
}

function vectorTest_pivot_1() {
  //createFrame();

  var circle1 = game._builder.createCircle({
    name: 'c1',
    origin: new Vector(200, 250),
    radius: 25,
    color: 0xFFFFFF
  });
  circle1.physicsBody.v = new Vector(0, 10);
  game.addEntity(circle1);

//  var block0 = game._builder.createBlock('b0', 120, 120 , 40, 40, 0xFFFFFF);
//  block0.physicsBody.v = new Vector(0, 0);
//  game.addEntity(block0);

  var block2 = game._builder.createBlock('b2', 100, 500 , 250, 20);
  block2.dimensions.rotate(block2.physicsBody, game._helpers.math.toRadians(45));
  block2.frozen = true;
  game.addEntity(block2);

  var block3 = game._builder.createBlock('b3', 500, 500 , 250, 20);
  block3.dimensions.rotate(block3.physicsBody, game._helpers.math.toRadians(-45));
  block3.frozen = true;
  game.addEntity(block3);

  var block4 = game._builder.createBlock('b4', 100, 150 , 250, 20);
  block4.dimensions.rotate(block4.physicsBody, game._helpers.math.toRadians(-45));
  block4.frozen = true;
  game.addEntity(block4);

  var block5 = game._builder.createBlock('b5', 500, 150 , 250, 20);
  block5.dimensions.rotate(block5.physicsBody, game._helpers.math.toRadians(45));
  block5.frozen = true;
  game.addEntity(block5);
}

function shieldCircleSpamTest() {
  var block2 = game._builder.createBlock('left', 100, 150 , 20, 350);
  block2.frozen = true;
  game.addEntity(block2);

  var block3 = game._builder.createBlock('top', 120, 150 , 800, 20);
  block3.frozen = true;
  game.addEntity(block3);

  var block4 = game._builder.createBlock('right', 900, 150 , 20, 350);
  block4.frozen = true;
  game.addEntity(block4);

  var block5 = game._builder.createBlock('bottom', 120, 500 , 800, 20);
  block5.frozen = true;
  game.addEntity(block5);

  for(var i = 0; i < 5; i++) {
    var circle1 = game._builder.createCircle({
      name: 'c1' + i,
      origin: new Vector(800, 250 + (i * 40)),
      radius: 10,
      color: 0xFFFF00
    });
    circle1.physicsBody.v = new Vector(-5, 1);
    game.addEntity(circle1);
//    var meteor_left = game._builder.createBlock('meteor_left_' + i, 800, 50 + (i * 40), 20, 20, 0xFFFFFF);
//    meteor_left.physicsBody.v = new Vector(-(5) , 0);
//    game.addEntity(meteor_left);
  }

  for(var i = 0; i < 5; i++) {
    var circle1 = game._builder.createCircle({
      name: 'c2' + i,
      origin: new Vector(600, 250 + (i * 40)),
      radius: 25,
      color: 0xFFFFFF
    });
    circle1.physicsBody.v = new Vector(10, -2);
    game.addEntity(circle1);
//    var meteor_right = game._builder.createBlock('meteor_right_' + i, 600, 150 + (i * 40), 20, 20, 0xFFFFFF);
//    meteor_right.physicsBody.v = new Vector(0 , 0);
//    game.addEntity(meteor_right);
  }

//  var force = new Force(
//      new Vector(200, 250),
//      400,
//      90,
//      0
//  );
//
//  game.addEntity(force);
}

function buildShip_1() {
  var wall_size = 20;
  var origin = new Vector(250, 200);

  var block1 = game._builder.createBlock('1', origin.x, origin.y, wall_size, 200, 0xB5B5B5);
  block1.frozen = true;
  game.addEntity(block1);

  var block2 = game._builder.createBlock('2', origin.x + wall_size, origin.y, 450, wall_size, 0xB5B5B5);
  block2.frozen = true;
  game.addEntity(block2);

  var block3 = game._builder.createBlock('3', origin.x + wall_size, 180 + origin.y , 450, wall_size, 0xB5B5B5);
  block3.frozen = true;
  game.addEntity(block3);

  var block4 = game._builder.createBlock('4', 470 + origin.x, origin.y , wall_size, 200, 0xB5B5B5);
  block4.frozen = true;
  game.addEntity(block4);

  var force = new Force(
      new Vector(origin.x + 200, origin.y + 120),
      400,
      45,
      -25
  );

  game.addEntity(force);
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

function makeSpaceLevel() {
  var level = new window.SpaceLevel('space');
  game.getLevelManager().switchLevel(level);
  var builder = game._builder;
  var i;
  var optionsSmall = {
    x: 0,
    y: 0,
    width: 10,
    height: 10,
    mass: 1,
    color: 0xFF0000,
    alpha: 1,
    health: {
      max: 5
    }
  };
  var optionsMedium = {
    x: 0,
    y: 0,
    width: 20,
    height: 20,
    mass: 3,
    color: 0xFF0000,
    alpha: 1,
    health: {
      max: 5
    }
  };
  var optionsLarge = {
    x: 0,
    y: 0,
    width: 40,
    height: 40,
    mass: 5,
    color: 0xFF0000,
    alpha: 1,
    health: {
      max: 5
    }
  };
  for (i = 0; i < 20; i++) {
    optionsSmall.name = 'smallMeteor' + i;
    level.levelData.meteors.push(builder.createMeteor(optionsSmall));
  }
  for (i = 0; i < 10; i++) {
    optionsSmall.name = 'mediumMeteor' + i;
    level.levelData.meteors.push(builder.createMeteor(optionsMedium));
  }
  for (i = 0; i < 1; i++) {
    optionsSmall.name = 'bigAssMeteor' + i;
    level.levelData.meteors.push(builder.createMeteor(optionsLarge));
  }
}

window.onload = function() {
  // The assetloader makes sure our required textures are loaded before we use them.
  var loader = new PIXI.AssetLoader([
      'resources/gui/maximize.png',
      'resources/images/rsz_sheet_suit_one3.png',
      'resources/images/sheet_suit_one3-aligned.png',
      'resources/images/sheet_suit_one3-aligned-25.png',
      'resources/images/sheet_suit_one3-aligned-25-2.png'
  ]);
  loader.load();
  loader.addEventListener('onComplete', function() {
    game = new Game({
      debug: true,
      width: window.innerWidth,
      height: window.innerHeight,
      defaultLevel: false
    });
    makeSpaceLevel();
    buildShip_1();
    var shield = game.getEntityManager().getEntityByName('1');
    game.getCamera().follow(shield);
  });

  shieldCircleSpamTest();
};
