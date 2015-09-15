window.onload = function() {

  var Game = require('./Game');
  var game = new Game(
    {
      renderer: require('./Core/Rendering/Renderer'),
      sceneManager: require('./Core/Rendering/SceneManager'),
      bundles: [
        require('./Bundles/ProtoDog/ProtoDog')
      ]
    }
  );
  game.bootstrap();
  game.run();

  game.tileMapManager.loadMap('resources/levels/tilemap/kitchen.json');
};
