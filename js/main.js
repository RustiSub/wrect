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

    game.timeStepSystem = new wrect.ECS.System.TimeStep();

    game.systems = {
      Gravity: {
        system: new wrect.ECS.System.Gravity()
      },
      QuadTree: {
        system: new wrect.ECS.System.QuadTree()
      },
      Mover: {
        system: new wrect.ECS.System.Mover()
      },
      Collision: {
        system: new wrect.ECS.System.Collision()
      },
      Input: {
        system: new wrect.ECS.System.Input()
      }
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

      return block;
    }

    createBlock({
      x: 50,
      y: 500,
      w: 700,
      h: 5,
      color: 0xFFFFFF
    });
    createBlock({
      x: 10,
      y: 10,
      w: 450,
      h: 5,
      color: 0xFFFFFF
    });
    createBlock({
      x: 450,
      y: 10,
      w: 5,
      h: 300,
      color: 0xFFFFFF
    });

    var block = createBlock({
      x: 10,
      y: 50,
      w: 20,
      h: 50,
      color: 0xFFFFFF
    });

    block.components.RigidBody.physicsBody.a = block.components.RigidBody.physicsBody.a.add(new wrect.Physics.Vector(10, 1));

    //block.components.RigidBody.physicsBody.a = new wrect.Physics.Vector(0, 9.81);
    //block.components.RigidBody.frozen = false;

    for (var l= 0; l < 1; l++) {
      for (var t= 0; t < 5; t++) {
        var block = createBlock({
          x: 200 + (t * (50 + 60)) ,
          y: 10 + l * (10 + 1) + (50 * t),
          w: 40,
          h: 100,
          color: 0xFFFFFF
        });
        block.components.RigidBody.gravity = true;
        block.components.RigidBody.frozen = false;
      }
    }
  });
};
