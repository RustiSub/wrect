var wrect = {};
var game;

window.onload = function() {

  var loader = new PIXI.AssetLoader([
    'resources/gui/maximize.png',
    'resources/images/spritesheet/spriteSheetWalk.json',
    'resources/images/backgrounds/background_2.png'
  ]);
  loader.onComplete = makeSprites.bind(this);
  function makeSprites() {

  }
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
        },
        Transformer: {
          system: new wrect.ECS.System.Transformer()
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
      y: 620,
      w: 3000,
      h: 5,
      color: 0x000000,
      alpha: 0
    });

    var player = createBlock({
      x: 100,
      y: 0,
      w: 100,
      h: 150,
      color: 0xFFFFFF,
      useSprite: true,
      alpha: 0
    });

    //var enemy = createBlock({
    //  x: 800,
    //  y: 0,
    //  w: 100,
    //  h: 150,
    //  color: 0xFFFF00
    //});

    //enemy.components.RigidBody.frozen = false;
    //enemy.components.RigidBody.gravity = true;

    //createJumpBlock({
    //  x: 800,
    //  y: 350,
    //  w: 100,
    //  h: 150,
    //  color: 0xFFFF00
    //});
    //
    //createJumpBlock({
    //  x: 50,
    //  y: 350,
    //  w: 100,
    //  h: 150,
    //  color: 0xFFFF00
    //});


    player.components.RigidBody.frozen = false;
    player.components.RigidBody.gravity = true;

    player.addComponent(new wrect.ECS.Component.ControlScheme.Player());
    //var animation = new wrect.ECS.Component.Animation();
    //player.addComponent(animation);
    //
    //var sword = new wrect.ECS.Assemblage.Sword({});
    //game.getEntityManager().addEntity(sword);

    //player.addComponent(new wrect.ECS.Component.Link({
    //  linkedEntity: sword,
    //  joint: new wrect.Physics.Vector(100, 50)
    //}));
  });
};
