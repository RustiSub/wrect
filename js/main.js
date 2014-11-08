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
        },
        RayCaster: {
          system: new wrect.ECS.System.RayCaster()
        }
      }
    };

    game.physicsEngine = new wrect.ECS.Assemblage.PhysicsEngine();

    function createJumpBlock(options) {
      var materialBlock = createBlock(options);
      materialBlock.addComponent(new wrect.ECS.Component.BaseMaterial({absorb: new wrect.Physics.Vector(0.01, 0.5)}));
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

      game.getEntityManager().addEntity(block, false);

      return block;
    }

    function createLiveBlock(options) {
      options = options || {
        x: 300,
        y: 100,
        w: 100,
        h: 40,
        color: 0xFFFFFF,
        light: true
      };

      var block = new wrect.ECS.Assemblage.Block(options);

      game.getEntityManager().addEntity(block);

      return block;
    }

    //createBlock({
    //  x: 50,
    //  y: 0,
    //  w: 30,
    //  h: 5,
    //  color: 0xFF0000
    //});
    //
    //createBlock({
    //  x: 100,
    //  //x: 50,
    //  y: 300,
    //  w: 30,
    //  h: 5,
    //  color: 0xFF0000
    //});

    //createJumpBlock({
    //  x: 10,
    //  y: 10,
    //  w: 750,
    //  h: 5,
    //  color: 0xFFFFFF
    //});
    //
    //createJumpBlock({
    //  x: 10,
    //  y: 500,
    //  w: 750,
    //  h: 5,
    //  color: 0xFFFFFF
    //});
    //
    //createJumpBlock({
    //  x: 10,
    //  y: 15,
    //  w: 5,
    //  h: 490,
    //  color: 0xFFFFFF
    //});
    //
    //createJumpBlock({
    //  x: 755,
    //  y: 15,
    //  w: 5,
    //  h: 490,
    //  color: 0xFFFFFF
    //});

    createJumpBlock({
      x: 50,
      y: 300,
      w: 100,
      h: 50,
      color: 0xFFFFFF
    });

    createJumpBlock({
      x: 200,
      y: 200,
      w: 20,
      h: 100,
      color: 0xFFFFFF
    });

    //createJumpBlock({
    //  x: 370,
    //  y: 250,
    //  w: 20,
    //  h: 120,
    //  color: 0xFFFFFF
    //});

    //createJumpBlock({
    //  x: 370,
    //  y: 150,
    //  w: 20,
    //  h: 150,
    //  color: 0xFFFFFF
    //});

    //createJumpBlock({
    //  x: 500,
    //  y: 300,
    //  w: 150,
    //  h: 50,
    //  color: 0xFFFFFF
    //});

    var block = createLiveBlock({
      x: 50,
      y: 60,
      w: 20,
      h: 50,
      color: 0xFFFFFF,
      light: true
    });

    block.components.RigidBody.frozen = false;


    block.addComponent(new wrect.ECS.Component.ControlScheme.Player());

    //block.components.RigidBody.physicsBody.f = block.components.RigidBody.physicsBody.f.add(new wrect.Physics.Vector(0, 5));
    block.components.RigidBody.gravity = true;

    var stageDarkLayer = new PIXI.Graphics();
    stageDarkLayer.beginFill(0x000000, 0.5);
    stageDarkLayer.drawRect(0, 0, 1000, 500);
    stageDarkLayer.endFill();

    game.getStage().addChildAt(stageDarkLayer, 1);

    var cameraDarkLayer = new PIXI.Graphics();
    cameraDarkLayer.beginFill(0xFFFFFF, 0.5);
    cameraDarkLayer.drawRect(0, 0, 1000, 500);
    cameraDarkLayer.endFill();

    game.getEntityManager().cameraContainer.addChild(cameraDarkLayer);

    game.systems.post.RayCaster.system.getLineIntersection(
      new wrect.Physics.Vector(0, 0),
      new wrect.Physics.Vector(20, 20),
      new wrect.Physics.Vector(10, 0),
      new wrect.Physics.Vector(0, 10)
    );
  });
};
