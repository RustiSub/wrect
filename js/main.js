var wrect = {};
var game;

window.onload = function() {

  game = new wrect.Game();
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

  createBlock({
    x: -100,
    y: 0,
    w: 300,
    h: 5,
    frozen: 1
  });

  createBlock({
    x: -100,
    y: -150,
    w: 300,
    h: 5,
    frozen: 1
  });

  //createBlock({
  //  x: -45,
  //  y: 40,
  //  w: 20,
  //  h: 50,
  //  frozen: 1
  //});
  //
  //createBlock({
  //  x: -70,
  //  y: 40,
  //  w: 20,
  //  h: 50,
  //  frozen: 1
  //});

  //createBlock({
  //  x: 0 - (5/2) + 50,
  //  y: (0 - (100/2) + 100) * -1,
  //  w: 5,
  //  h: 100,
  //  frozen: 1
  //});

  //createBlock({
  //  x: 0,
  //  y: -50,
  //  w: 100,
  //  h: 5,
  //  frozen: 1
  //});

  //createBlock({
  //  x: -50,
  //  y: (0 - (100/2) + 100) * -1,
  //  w: 5,
  //  h: 100
  //});

  //var centerBlock = createBlock({
  //  x: 0,
  //  y: 0,
  //  w: 10,
  //  h: 10
  //});

  var block = createBlock({
    x: 10,
    y: -30,
    w: 20,
    h: 20
  });

  console.log(block);
  //block.components.RigidBody.physicsBody.f = new wrect.Physics.Vector(0, 1);
};
