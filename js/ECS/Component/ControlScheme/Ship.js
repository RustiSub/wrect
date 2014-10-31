(function() {
  "use strict";
  
  // Assign globals
  wrect.ECS = wrect.ECS || {};
  wrect.ECS.Component = wrect.ECS.Component || {};

  /**
   * @type {wrect.Physics.Vector|*}
   */
  var Vector = wrect.Physics.Vector;

  wrect.ECS.Component.ControlScheme.Ship = function (options) {
    wrect.ECS.Component.ControlScheme.BaseScheme.call(this);
    this.movement = new Vector(0, 0);
  };
  
  wrect.ECS.Component.ControlScheme.Ship.prototype.keyup = function() {
    this.movement = this.movement.add(new Vector(0, 5));
  };

  wrect.ECS.Component.ControlScheme.Ship.prototype.keyright = function() {
    this.movement = this.movement.add(new Vector(5, 0));
  };

  wrect.ECS.Component.ControlScheme.Ship.prototype.keydown = function() {
    this.movement = this.movement.add(new Vector(0, -5));
  };

  wrect.ECS.Component.ControlScheme.Ship.prototype.keyleft = function() {
    this.movement = this.movement.add(new Vector(-5, 0));
  };
  

  wrect.ECS.Component.ControlScheme.Ship.prototype = Object.create( wrect.ECS.Component.ControlScheme.BaseScheme.prototype );
  wrect.ECS.Component.ControlScheme.Ship.prototype.constructor = wrect.ECS.Component.ControlScheme;
}());
