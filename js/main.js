var wrect = {};
var game;

window.onload = function() {
  var testEntities = [
    new wrect.ECS.Assemblage.BaseEntity(),
    new wrect.ECS.Assemblage.Block(),
    new wrect.ECS.Assemblage.BaseEntity()
  ];
  console.log(testEntities);
  var testSystem = new wrect.ECS.System.Mover();

  testSystem.run(testEntities);

};
