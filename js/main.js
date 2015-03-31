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
      eventManager: game.getEventManager(),
      frozen: options.frozen
    });
    game.getEntityManager().addEntity(block.entity);

    return block.entity;
  }

  var borderTop = createBlock({
    x: 0,
    y: 0,
    w: 100,
    h: 5,
    frozen: 1
  });

  console.log(borderTop);

  //createBlock({
  //  x: 0 - (5/2) + 50,
  //  y: (0 - (100/2) + 100) * -1,
  //  w: 5,
  //  h: 100,
  //  frozen: 1
  //});

  createBlock({
    x: 0,
    y: -100,
    w: 100,
    h: 5,
    frozen: 1
  });

  //createBlock({
  //  x: -50,
  //  y: (0 - (100/2) + 100) * -1,
  //  w: 5,
  //  h: 100
  //});

  var block = createBlock({
    x: 10,
    y: -10,
    w: 5,
    h: 5
  });

  var centerBlock = createBlock({
    x: 0,
    y: 0,
    w: 5,
    h: 5
  });

  //block.components.RigidBody.physicsBody.f = new wrect.Physics.Vector(0, -1);
};
