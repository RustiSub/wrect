(function() {
  "use strict";

  wrect.ECS = wrect.ECS || {};
  wrect.ECS.Assemblage = wrect.ECS.Assemblage || {};

  var Entity = wrect.ECS.Entity;

  wrect.ECS.Assemblage.BaseEntity = function () {
    var entity = Entity();

    entity.addComponent( new ECS.Components.Appearance());
    //entity.addComponent( new ECS.Components.Position());
    //entity.addComponent( new ECS.Components.Collision());
  };
}());
