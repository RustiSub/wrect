var wrect = {};
var game;

window.onload = function() {
  var block = new wrect.ECS.Assemblage.Block({
    x: 400,
    y: 100,
    w: 20,
    h: 40
  });
  block.components.RigidBody.physicsBody.a = new wrect.Physics.Vector(5, 0);
  var testEntities = [
    new wrect.ECS.Assemblage.BaseEntity(),
    block
  ];

  var testSystem = new wrect.ECS.System.Mover();

  testSystem.run(testEntities);

};
