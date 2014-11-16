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
      debugTilemap: false,
      width: window.innerWidth,
      height: window.innerHeight,
      defaultLevel: false
    });

    wrect.getGame = function() {
      return game;
    };

    game.timeStepSystem = new wrect.ECS.System.TimeStep();

    game.systems = {
      pre: {
        Input: {
          system: new wrect.ECS.System.Input()
        },
        BaseControl: {
          system: new wrect.ECS.System.Control.BaseControl()
        }
      },
      post: {
        Linker: {
          system: new wrect.ECS.System.Linker()
        },
        Mover: {
          system: new wrect.ECS.System.Mover()
        }
      }
    };

    game.physicsEngine = new wrect.ECS.Assemblage.PhysicsEngine();

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

      return block;
    }

    var block = createBlock({
      x: 0,
      y: 0,
      w: 32,
      h: 32,
      color: 0xFFFFFF
    });

    createBlock({
      x: 50,
      y: 500,
      w: 30,
      h: 5,
      color: 0xFFFFFF
    });

    block.components.RigidBody.frozen = false;

    block.addComponent(new wrect.ECS.Component.ControlScheme.Ship());
    wrect.getGame().getCamera().follow(block);

    // TileMap stuff!
    wrect.getGame()._tileMapManager.loadMap('resources/levels/tilemap/tiled.json');

  });
};
