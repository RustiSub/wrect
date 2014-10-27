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

    game.systems.Mover = {
      weight: 0,
      system: new wrect.ECS.System.Mover()
    };

    var block = new wrect.ECS.Assemblage.Block(
      {
        x: 300,
        y: 100,
        w: 100,
        h: 40,
        color: 0xFFFFFF
      }
    );
    //block.components.RigidBody.physicsBody.a = new wrect.Physics.Vector(5, 0);

    game.getEntityManager().addEntity(block);
  });
};
