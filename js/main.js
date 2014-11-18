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

    game.systems = {
      pre: {
        Linker: {
          system: new wrect.ECS.System.Linker()
        },
        Input: {
          system: new wrect.ECS.System.Input()
        },
        BaseControl: {
          system: new wrect.ECS.System.Control.BaseControl()
        }
      },
      post: {
        Mover: {
          system: new wrect.ECS.System.Mover()
        }
      }
    };

    game.physicsEngine = new wrect.ECS.Assemblage.PhysicsEngine();

    function createJumpBlock(options) {
      var materialBlock = createBlock(options);
      materialBlock.addComponent(new wrect.ECS.Component.BaseMaterial({absorb: new wrect.Physics.Vector(0.1, 0.9)}));
    }

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

    createJumpBlock({
      x: 10,
      y: 500,
      w: 1500,
      h: 5,
      color: 0xFFFFFF
    });

    var player = createBlock({
      x: 500,
      y: 0,
      w: 100,
      h: 150,
      color: 0xFFFFFF
    });

    player.components.RigidBody.frozen = false;


    player.addComponent(new wrect.ECS.Component.ControlScheme.Player());

    //block.components.RigidBody.physicsBody.f = block.components.RigidBody.physicsBody.f.add(new wrect.Physics.Vector(0, 5));
    player.components.RigidBody.gravity = true;

    var sword = new wrect.ECS.Assemblage.Sword({});
    game.getEntityManager().addEntity(sword);

    player.addComponent(new wrect.ECS.Component.Link({
      linkedEntity: sword,
      joint: new wrect.Physics.Vector(100, 50)
    }));
  });
};
