(function() {
  "use strict";

  wrect.ECS = wrect.ECS || {};
  wrect.ECS.Component = wrect.ECS.Component || {};

  var Vector = wrect.Physics.Vector;

  wrect.ECS.Component.BaseMaterial = function (options) {
    wrect.ECS.Component.BaseComponent.call(this);

    this.options = options || {};
    this.absorb = this.options.absorb || new Vector(0, 0);

    game.getEventManager().addListener('physics.collide', function(data) {
      this.absorb = new Vector();
      //console.log(data.surface, data.force);

      //Split the force into perpendicular force and parallel force
      //1. Project the vector onto the perpendicular vector of the surface
      var perpProjectionVector = data.force.dot(data.surface.perpendicular());
      var perpForce = data.surface.perpendicular().unitScalar(perpProjectionVector);

      var parProjectionVector = data.force.dot(data.surface);
      var parForce = data.surface.unitScalar(parProjectionVector);

      data.force = data.force.subtract(perpForce);
      data.force = data.force.subtract(parForce);
      //Damp both forces according to type of material's absorb factor

    }, this);
  };

  wrect.ECS.Component.BaseMaterial.prototype = Object.create( wrect.ECS.Component.BaseComponent.prototype );
  wrect.ECS.Component.BaseMaterial.prototype.constructor = wrect.ECS.Component.BaseMaterial;
  wrect.ECS.Component.BaseMaterial.prototype.name = 'BaseMaterial';
}());
