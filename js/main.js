var wrect = {};
var game;

function component_test_1() {
  var block0 = game._builder.createBlock('b0', 120, 120 , 40, 40, 0xFFFFFF);
  game.addEntity(block0);

  var mover = new wrect.Entities.Component.Mover({
    distance : 1
  })
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
    component_test_1();

    //makeSpaceLevel();
    //buildShip_1();
    //var shield = game.getEntityManager().getEntityByName('1');
    //game.getCamera().follow(shield);

  });
};
