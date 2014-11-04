(function() {
  "use strict";

  // Assign globals
  wrect.ECS = wrect.ECS || {};
  wrect.ECS.Component = wrect.ECS.Component || {};

  /**
   * @type {wrect.Physics.Vector|*}
   */
  var Vector = wrect.Physics.Vector;

  wrect.ECS.Component.ControlScheme.Ship = function () {
    wrect.ECS.Component.ControlScheme.BaseScheme.call(this);
    this.movement = new Vector(0, 0);
    this.maxSpeed = new Vector(10, 10);

    this.force = 2;
  };

  wrect.ECS.Component.ControlScheme.Ship.prototype = Object.create(wrect.ECS.Component.ControlScheme.BaseScheme.prototype);
  wrect.ECS.Component.ControlScheme.Ship.prototype.constructor = wrect.ECS.Component.ControlScheme;

  wrect.ECS.Component.ControlScheme.Ship.prototype.keyup = function() {
    if (Math.abs(this.movement.y) < this.maxSpeed.y) {
      this.movement = this.movement.add(new Vector(0, -this.force));
    }
  };

  wrect.ECS.Component.ControlScheme.Ship.prototype.keyright = function() {
    if (Math.abs(this.movement.x) < this.maxSpeed.x) {
      this.movement = this.movement.add(new Vector(this.force, 0));
    }
  };

  wrect.ECS.Component.ControlScheme.Ship.prototype.keydown = function() {
    if (Math.abs(this.movement.y) < this.maxSpeed.y) {
      this.movement = this.movement.add(new Vector(0, this.force));
    }
  };

  wrect.ECS.Component.ControlScheme.Ship.prototype.keyleft = function() {
    if (Math.abs(this.movement.x) < this.maxSpeed.x) {
      this.movement = this.movement.add(new Vector(-this.force, 0));
    }
  };
}());
