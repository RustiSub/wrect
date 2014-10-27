var wrect = {};
var game;

window.onload = function() {

  var loader = new PIXI.AssetLoader([
    'resources/gui/maximize.png'
  ]);
  loader.load();
  loader.addEventListener('onComplete', function() {
    game = new Game({
      debug: true,
      width: window.innerWidth,
      height: window.innerHeight,
      defaultLevel: false
    });

    game.systems.Mover = {
      system: new wrect.ECS.System.Mover()
    };

    game.systems.QuadTree = {
      system: new wrect.ECS.System.QuadTree()
    };

    function createBlock(options) {
      options = options || {
        x: 300,
        y: 100,
        w: 100,
        h: 40,
        color: 0xFFFFFF
      };
      var block = new wrect.ECS.Assemblage.Block(options);

      game.getEntityManager().addEntity(block);
    }

    for (var l= 0; l < 1; l++) {
      for (var t= 0; t < 10; t++) {
        createBlock({
          x: 10 + (t * (50 + 1)) ,
          y: 10 + l * (10 + 1),
          w: 5,
          h: 10,
          color: 0xFFFFFF
        });
      }
    }
  });
};
