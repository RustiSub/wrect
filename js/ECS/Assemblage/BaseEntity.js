(function() {
  "use strict";

  wrect.ECS = wrect.ECS || {};
  wrect.ECS.Assemblage = wrect.ECS.Assemblage || {};

  var Entity = wrect.ECS.Entity;

  wrect.ECS.Assemblage.BaseEntity = function () {
    this.entity = new Entity();

    //entity.addComponent( new ECS.Components.Appearance());
    //entity.addComponent( new ECS.Components.Position());
    //entity.addComponent( new ECS.Components.Collision());

    return this.entity;
  };

  /**
   * @returns {string|*}
   */
  wrect.ECS.Assemblage.getId = function() {
    return this.entity.getId();
  };
}());
