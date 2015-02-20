(function() {
  "use strict";

  // Assign globals
  wrect.ECS = wrect.ECS || {};
  wrect.ECS.Component = wrect.ECS.Component || {};

  /**
   * @type {wrect.Physics.Vector|*}
   */
  var Vector = wrect.Physics.Vector;

  wrect.ECS.Component.ControlScheme.Player = function () {
    wrect.ECS.Component.ControlScheme.BaseScheme.call(this);

    this.jumpCooldown = 500;
    this.moveCooldown = 100;

    this.lastJump = game.getPreviousTime();
    this.lastMove = game.getPreviousTime();

    this.jumpForce = 55;
    this.moveForce = 10;

    this.transform = new Vector(0, 0);
  };

  wrect.ECS.Component.ControlScheme.Player.prototype = Object.create(wrect.ECS.Component.ControlScheme.BaseScheme.prototype);
  wrect.ECS.Component.ControlScheme.Player.prototype.constructor = wrect.ECS.Component.ControlScheme;

  wrect.ECS.Component.ControlScheme.Player.prototype.keyspace = function() {
    if (this.lastJump === 0 || game.getPreviousTime() - this.lastJump >= this.jumpCooldown) {
      this.lastJump = game.getPreviousTime();
      this.movement = this.movement.add(new Vector(0, -this.jumpForce));
      debugger;
    }
  };

  wrect.ECS.Component.ControlScheme.Player.prototype.keyright = function() {
    if (this.lastMove === 0 || game.getPreviousTime() - this.lastMove >= this.moveCooldown) {
      this.lastMove = game.getPreviousTime();
      this.movement = this.movement.add(new Vector(this.moveForce, 0));

      this.transform = this.transform.add(new Vector(1, 0));
    }
  };

  wrect.ECS.Component.ControlScheme.Player.prototype.keyleft = function() {
    if (this.lastMove === 0 || game.getPreviousTime() - this.lastMove >= this.moveCooldown) {
      this.lastMove = game.getPreviousTime();
      this.movement = this.movement.add(new Vector(-this.moveForce, 0));

      this.transform = this.transform.add(new Vector(-1, 0));
    }
  };
}());

