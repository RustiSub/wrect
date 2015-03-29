var wrect = {};

window.onload = function() {

  var game = new wrect.Game();
  game.bootstrap();
  game.run();

  function createBlock(options) {
    var block = new wrect.ECS.Assemblage.Block({
      x: options.x,
      y: options.y,
      w: options.w,
      h: options.h,
      color: 0x000000,
      alpha: 1,
      renderer: game.getRenderer(),
      eventManager: game.getEventManager()
    });
    game.getEntityManager().addEntity(block.entity);

    return block.entity;
  }

  var block = createBlock({
    x: 0,
    y: 0,
    w: 50,
    h: 30
  });

  block.components.RigidBody.physicsBody.f = new wrect.Physics.Vector(0, 0);
};
