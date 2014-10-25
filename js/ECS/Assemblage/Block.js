(function() {
  "use strict";

  wrect.ECS = wrect.ECS || {};
  wrect.ECS.Assemblage = wrect.ECS.Assemblage || {};

  var Entity = wrect.ECS.Entity;

  wrect.ECS.Assemblage.Block = function () {
    this.entity = new Entity();

    this.entity.addComponent( new wrect.ECS.Component.BaseComponent());
    //entity.addComponent( new ECS.Components.Position());
    //entity.addComponent( new ECS.Components.Collision());
  };
}());
