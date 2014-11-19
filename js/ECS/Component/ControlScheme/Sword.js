(function() {
  "use strict";

  // Assign globals
  wrect.ECS = wrect.ECS || {};
  wrect.ECS.Component = wrect.ECS.Component || {};

  /**
   * @type {wrect.Physics.Vector|*}
   */
  var Vector = wrect.Physics.Vector;

  wrect.ECS.Component.ControlScheme.Sword = function () {
    wrect.ECS.Component.ControlScheme.BaseScheme.call(this);

    this.stabCooldown = 500;

    this.lastStab = game.getPreviousTime();

    this.moveForce = 10;
  };

  wrect.ECS.Component.ControlScheme.Sword.prototype = Object.create(wrect.ECS.Component.ControlScheme.BaseScheme.prototype);
  wrect.ECS.Component.ControlScheme.Sword.prototype.constructor = wrect.ECS.Component.ControlScheme;

  wrect.ECS.Component.ControlScheme.Sword.prototype.keyattack = function() {
    if (this.lastStab === 0 || game.getPreviousTime() - this.lastStab >= this.stabCooldown) {
      this.lastStab = game.getPreviousTime();
      console.log('stab');
      //this.movement = this.movement.add(new Vector(this.moveForce, 0));
    }
  };
}());

