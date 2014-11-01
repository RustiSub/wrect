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
      Mover: {
        system: new wrect.ECS.System.Mover()
      },
      QuadTree: {
        system: new wrect.ECS.System.QuadTree()
      },
      Collision: {
        system: new wrect.ECS.System.Collision()
      },
      Input: {
        system: new wrect.ECS.System.Input()
      },
      BaseControl: {
        system: new wrect.ECS.System.Control.BaseControl()
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
    /*createBlock({
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

    block.addComponent(new wrect.ECS.Component.ControlScheme.Ship());

    //block.components.RigidBody.physicsBody.a = block.components.RigidBody.physicsBody.a.add(new wrect.Physics.Vector(10, 1));

    //for (var l= 0; l < 1; l++) {
    //  for (var t= 0; t < 2; t++) {
    //    createBlock({
    //      x: 10 + (t * (50 + 100)) ,
    //      y: 10 + l * (10 + 1),
    //      w: 40,
    //      h: 100,
    //      color: 0xFFFFFF
    //    });
    //  }
    //}
  });
};
