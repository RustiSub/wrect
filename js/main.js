var wrect = {};
var game;

window.onload = function() {

  game = new Game({
    debug: true,
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
      Linker: {
        system: new wrect.ECS.System.Linker()
      },
      Input: {
        system: new wrect.ECS.System.Input()
      },
      BaseControl: {
        system: new wrect.ECS.System.Control.BaseControl()
      },
      Attack: {
        system: new wrect.ECS.System.Control.Attack()
      },
      Animator: {
        system: new wrect.ECS.System.Animator()
      }
    },
    post: {
      Mover: {
        system: new wrect.ECS.System.Mover()
      }
      //,
      //Transformer: {
      //  system: new wrect.ECS.System.Transformer()
      //}
    }
  };

  game.physicsEngine = new wrect.ECS.Assemblage.PhysicsEngine();

  var cube = new wrect.ECS.Assemblage.LineShape3D({
    vertices: [
      new wrect.Physics.Vector3D(0, 0, 0),
      new wrect.Physics.Vector3D(10, 0, 0),
      new wrect.Physics.Vector3D(10, 10, 0),
      new wrect.Physics.Vector3D(0, 10, 0)
    ]
  });

  //game.getEntityManager().addEntity(block);

  game.getStage().add(cube.components.Visual3D.graphics);
};
