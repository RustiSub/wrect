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

    game.singleSystems = {
      Input: {
        system: new wrect.ECS.System.Input()
      },
      BaseControl: {
        system: new wrect.ECS.System.Control.BaseControl()
      }
    };

    game.systems = {
      Gravity: {
        system: new wrect.ECS.System.Gravity()
      },
      QuadTree: {
        system: new wrect.ECS.System.QuadTree()
      },
      Collision: {
        system: new wrect.ECS.System.Collision()
      },
      Linker: {
        system: new wrect.ECS.System.Linker()
      },
      Mover: {
        system: new wrect.ECS.System.Mover()
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
    /*
    createBlock({
      x: 10,
      y: 10,
      w: 5,
      h: 300,
      color: 0xFFFFFF
    });
    createBlock({
      x: 10,
      y: 300,
      w: 450,
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
    });*/

    var block = createBlock({
      x: 50,
      y: 50,
      w: 20,
      h: 50,
      color: 0xFFFFFF
    });

    var childBlock = createBlock({
      x: 100,
      y: 50,
      w: 20,
      h: 50,
      color: 0xFFFFFF
    });

    //createBlock({
    //  x: 50,
    //  y: 500,
    //  w: 700,
    //  h: 5,
    //  color: 0xFFFFFF
    //});

    block.components.RigidBody.frozen = false;
    childBlock.components.RigidBody.frozen = false;

    block.addComponent(new wrect.ECS.Component.ControlScheme.Ship());
    block.addComponent(new wrect.ECS.Component.Link({linkedEntity: childBlock}));
    //childBlock.addComponent(new wrect.ECS.Component.Link({entity: block}));

    //block.components.RigidBody.physicsBody.f = block.components.RigidBody.physicsBody.f.add(new wrect.Physics.Vector(10, 0));
    //block.components.RigidBody.gravity = true;
    //console.log(block);
    //console.log(block);
  });
};
