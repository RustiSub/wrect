window.onload = function() {

  var Game = require('./Game');
  var game = new Game();
  game.bootstrap();
  game.run();

  //game.tileMapManager.loadMap('resources/levels/tilemap/kitchen.json');
};
