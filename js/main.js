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

    function createJumpBlock(options) {
      var materialBlock = createBlock(options);
      materialBlock.addComponent(new wrect.ECS.Component.BaseMaterial({absorb: new wrect.Physics.Vector(0.1, 0.5)}));
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
        color: 0xFFFFFF
      };
      var block = new wrect.ECS.Assemblage.Block(options);

      game.getEntityManager().addEntity(block);

      var theLight = new PIXI.Graphics();
      theLight.beginFill(0xFFFFFF, 1);
      theLight.drawCircle(100, 300, 50);
      theLight.endFill();

      var theDark = new PIXI.Graphics();
      theDark.beginFill(0xFFFFFF, 0.5);
      theDark.drawRect(0, 0, 1000, 500);
      theDark.endFill();

      game.getEntityManager().cameraContainer.addChild(theDark);

      game.getEntityManager().cameraContainer.mask = theLight;

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

    createJumpBlock({
      x: 10,
      y: 300,
      w: 150,
      h: 5,
      color: 0xFFFFFF
    });

    createJumpBlock({
      x: 500,
      y: 300,
      w: 150,
      h: 5,
      color: 0xFFFFFF
    });

    var block = createLiveBlock({
      x: 50,
      y: 60,
      w: 20,
      h: 50,
      color: 0xFFFFFF
    });

    block.components.RigidBody.frozen = false;

    block.addComponent(new wrect.ECS.Component.ControlScheme.Ship());

    //block.components.RigidBody.physicsBody.f = block.components.RigidBody.physicsBody.f.add(new wrect.Physics.Vector(0, 5));
    block.components.RigidBody.gravity = true;

    var theDark = new PIXI.Graphics();
    theDark.beginFill(0x000000, 0.5);
    theDark.drawRect(0, 0, 1000, 500);
    theDark.endFill();

    game.getStage().addChildAt(theDark, 1);


//    theDark.mask = theLight;
//    game.getStage().mask = theLight;


    //game.getStage().addChild(theLight);

    //game.getStage().addChild(theLight);
    //
    ////theLight.mask = theDark;
    //theDark.mask = theLight;
    //
    //var theDarkBackground = new PIXI.Graphics();
    //theDarkBackground.beginFill(0x000000, 0.5);
    //theDarkBackground.drawRect(0, 0, 1000, 500);
    //theDarkBackground.endFill();
    //
    //game.getStage().addChild(theDarkBackground);
  });
};
