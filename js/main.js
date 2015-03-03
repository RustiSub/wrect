var wrect = {};
var game;

window.onload = function() {

  var loader = new PIXI.AssetLoader([
    'resources/gui/maximize.png',
    'resources/images/spritesheet/spriteSheetWalk.json'
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
      //materialBlock.addComponent(new wrect.ECS.Component.BaseMaterial({absorb: new wrect.Physics.Vector(0.01, 0.9)}));

      return materialBlock;
    }

    function createBlock(options) {
      var block = new wrect.ECS.Assemblage.Block(options);

      game.getEntityManager().addEntity(block);

      return block;
    }

    function createBall(options) {
      var ball = new wrect.ECS.Assemblage.Ball(options);
      game.getEntityManager().addEntity(ball);

      return ball;
    }

    function createPolygon(options) {
      var polygon = new wrect.ECS.Assemblage.LineShape(options);
      game.getEntityManager().addEntity(polygon);

      return polygon;
    }

    //var ball = createBall({
    //  x: 1200,
    //  y: 200,
    //  radius: 25,
    //  color: 0xFFFFFF
    //});

    //var ball = createBlock({
    //  x: 1200,
    //  y: 200,
    //  w: 25,
    //  h: 25,
    //  color: 0xFFFFFF
    //});

    //  createJumpBlock({
    //  x: 0,
    //  y: 0,
    //  w: 1500,
    //  h: 5,
    //  color: 0x000000,
    //  alpha: 1
    //});
    //
    //createJumpBlock({
    //  x: 1500,
    //  y: 0,
    //  w: 5,
    //  h: 600,
    //  color: 0x000000,
    //  alpha: 1
    //});
    //
    //createJumpBlock({
    //  x: 0,
    //  y: 600,
    //  w: 1500,
    //  h: 5,
    //  color: 0x000000,
    //  alpha: 1
    //});
    //
    //createJumpBlock({
    //  x: 0,
    //  y: 0,
    //  w: 5,
    //  h: 600,
    //  color: 0x000000,
    //  alpha: 1
    //});

    wrect.getGame()._tileMapManager.loadMap('resources/levels/tilemap/kitchen.json');


    //var player = createBlock({
    //  x: 100,
    //  y: 100,
    //  w: 100,
    //  h: 150,
    //  color: 0xFFFFFF,
    //  useSprite: true,
    //  alpha: 0
    //});
    //
    //player.components.RigidBody.frozen = false;
    //player.components.RigidBody.gravity = false;
    //
    //player.addComponent(new wrect.ECS.Component.ControlScheme.Player());
  });
};
