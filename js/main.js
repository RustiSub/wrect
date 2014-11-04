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

     //createBlock({
     //x: 10,
     //y: 10,
     //w: 5,
     //h: 300,
     //color: 0xFFFFFF
     //});
     //createBlock({
     //x: 10,
     //y: 300,
     //w: 450,
     //h: 5,
     //color: 0xFFFFFF
     //});
     //createBlock({
     //x: 10,
     //y: 10,
     //w: 450,
     //h: 5,
     //color: 0xFFFFFF
     //});
     //createBlock({
     //x: 450,
     //y: 10,
     //w: 5,
     //h: 300,
     //color: 0xFFFFFF
     //});

    createBlock({
      x: 50,
      y: 300,
      w: 30,
      h: 5,
      color: 0xFF0000
    });

    createBlock({
      x: 50,
      y: 0,
      w: 30,
      h: 5,
      color: 0xFF0000
    });

    var block = createBlock({
      x: 50,
      y: 60,
      w: 20,
      h: 50,
      color: 0xFFFFFF
    });

    block.components.RigidBody.frozen = false;

    var childBlock = createBlock({
      x: 100,
      y: 60,
      w: 20,
      h: 50,
      color: 0xFFFFFF
    });
    childBlock.components.RigidBody.frozen = false;

    block.addComponent(new wrect.ECS.Component.ControlScheme.Ship());
    block.addComponent(new wrect.ECS.Component.Link({linkedEntity: childBlock}));

    block.components.RigidBody.physicsBody.f = block.components.RigidBody.physicsBody.f.add(new wrect.Physics.Vector(0, 100));
    block.components.RigidBody.gravity = false;
  });
};
