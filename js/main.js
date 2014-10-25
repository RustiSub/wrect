var wrect = {};
var game;

window.onload = function() {
  var testEntities = [
    new wrect.ECS.Assemblage.BaseEntity(),
    new wrect.ECS.Assemblage.BaseEntity(),
    new wrect.ECS.Assemblage.BaseEntity()
  ];

  var testSystem = new wrect.ECS.System.Mover();

  testSystem.run(testEntities);

};
