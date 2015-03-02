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
      materialBlock.addComponent(new wrect.ECS.Component.BaseMaterial({absorb: new wrect.Physics.Vector(0, 0)}));

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

    var ball = createBall({
      x: 300,
      y: 100,
      radius: 25,
      color: 0xFFFFFF
    });

    //var topLeft = createPolygon({
    //  origin: new wrect.Physics.Vector(10, 20),
    //  vertices: [
    //    new wrect.Physics.Vector(10, 50),
    //    new wrect.Physics.Vector(100, 50),
    //    new wrect.Physics.Vector(50, 200),
    //    new wrect.Physics.Vector(10, 160)
    //  ],
    //  color: 0xFFFFFF
    //});
    //
    //var topRight = createPolygon({
    //  origin: new wrect.Physics.Vector(500, 20),
    //  vertices: [
    //    new wrect.Physics.Vector(10, 50),
    //    new wrect.Physics.Vector(100, 50),
    //    new wrect.Physics.Vector(80, 200),
    //    new wrect.Physics.Vector(50, 160)
    //  ],
    //  color: 0xFFFFFF
    //});
    //
    //var bottomRight = createPolygon({
    //  origin: new wrect.Physics.Vector(500, 300),
    //  vertices: [
    //    new wrect.Physics.Vector(10, 50),
    //    new wrect.Physics.Vector(100, 50),
    //    new wrect.Physics.Vector(80, 200),
    //    new wrect.Physics.Vector(-50, 160)
    //  ],
    //  color: 0xFFFFFF
    //});
    //
    //var bottomLeft = createPolygon({
    //  origin: new wrect.Physics.Vector(80, 250),
    //  vertices: [
    //    new wrect.Physics.Vector(10, 50),
    //    new wrect.Physics.Vector(100, 50),
    //    new wrect.Physics.Vector(80, 200),
    //    new wrect.Physics.Vector(-50, 160)
    //  ],
    //  color: 0xFFFFFF
    //});
    //
    //ball.components.RigidBody.physicsBody.f = ball.components.RigidBody.physicsBody.f.add(new wrect.Physics.Vector(15, 50));
    //
    //createJumpBlock({
    //  x: 10,
    //  y: 10,
    //  w: 1000,
    //  h: 5,
    //  color: 0x000000,
    //  alpha: 1
    //});
    //
    //createJumpBlock({
    //  x: 1005,
    //  y: 10,
    //  w: 5,
    //  h: 495,
    //  color: 0x000000,
    //  alpha: 1
    //});
    //
    //var block = createJumpBlock({
    //  x: 10,
    //  y: 500,
    //  w: 1000,
    //  h: 5,
    //  color: 0x000000,
    //  alpha: 1
    //});
    //
    //
    //createJumpBlock({
    //  x: 10,
    //  y: 10,
    //  w: 5,
    //  h: 495,
    //  color: 0x000000,
    //  alpha: 1
    //});

    wrect.getGame()._tileMapManager.loadMap('resources/levels/tilemap/kitchen.json');

  });
};
