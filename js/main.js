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

    var blockGraphics = new PIXI.Graphics();
    blockGraphics.beginFill(0x0080FF);
    blockGraphics.drawCircle(100, 100, 50);
    blockGraphics.endFill();

    var block = new wrect.ECS.Assemblage.Block(
      {
        x: 400,
        y: 100,
        w: 20,
        h: 40,
        Visual: new wrect.ECS.Component.Visual({
          graphics: blockGraphics
        })
      }
    );
    block.components.RigidBody.physicsBody.a = new wrect.Physics.Vector(5, 0);

    game.getEntityManager().addEntity(block);
    game.systems.Mover = {
      weight: 0,
      system: new wrect.ECS.System.Mover()
    };
  });
};
