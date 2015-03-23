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

  function createBlock(options) {
    var block = new wrect.ECS.Assemblage.Block(options);

    game.getEntityManager().addEntity(block);

    return block;
  }

  //createBlock({
  //  x: 100,
  //  y: 100,
  //  w: 100,
  //  h: 150,
  //  color: 0xFFFFFF,
  //  alpha: 1
  //});
};
