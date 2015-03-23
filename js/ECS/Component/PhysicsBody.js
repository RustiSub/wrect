(function() {
  "use strict";

  wrect.ECS = wrect.ECS || {};
  wrect.ECS.Component = wrect.ECS.Component || {};

  var Vector = wrect.Physics.Vector;

  wrect.ECS.Component.PhysicsBody = function (options) {
    wrect.ECS.Component.BaseComponent.call(this);

    this.options = options || {};

    this.v = options.v || new Vector(0, 0);
    this.a = options.a || new Vector(0, 0);
    this.m =  options.m || 1;
    this.theta = options.theta || 0;
    this.omega = options.omega || 0;
    this.alpha = options.alpha || 0;

    this.J = 0;
  };

  wrect.ECS.Component.PhysicsBody.prototype = Object.create(wrect.ECS.Component.BaseComponent.prototype);
  wrect.ECS.Component.PhysicsBody.prototype.constructor = wrect.ECS.Component.PhysicsBody;
  wrect.ECS.Component.PhysicsBody.prototype.name = 'PhysicsBody';
}());
