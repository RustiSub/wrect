window.onload = function() {

  var Game = require('./Game');
  var game = new Game(
    {
      renderer: require('./Core/Rendering/Pixi/Renderer'),
      sceneManager: require('./Core/Rendering/Pixi/SceneManager')
    }
  );
  game.bootstrap();
  game.run();

  //game.tileMapManager.loadMap('resources/levels/tilemap/kitchen.json');
};
