var wrect = {};
var game;

window.onload = function() {

  game = new wrect.Game();
  game.bootstrap();
  game.run();

  //game.tileMapManager.loadMap('resources/levels/tilemap/kitchen.json');
};
