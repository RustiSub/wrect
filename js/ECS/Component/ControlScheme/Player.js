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

    this.lastJump = game.getPreviousTime();
    this.jumpCooldown = 250;
    this.jumpForce = 40;

    game.getEventManager().addListener('physics.collide', function(data) {
      var entityA = data.entity.components.ControlScheme;
      var entityB = data.otherEntity.components.ControlScheme;

      var controlScheme = entityA ? entityA : (entityB ? entityB : false);

      if (controlScheme && controlScheme.jumpMovement) {
        controlScheme.jumpMovement = false;

        controlScheme.movement = controlScheme.movement.add(new Vector(0, -controlScheme.jumpForce));
      }
    });

    this.moveCooldown = 0;
    this.lastMove = game.getPreviousTime();
    this.moveForce = 3;

    this.transform = new Vector(0, 0);
  };

  wrect.ECS.Component.ControlScheme.Player.prototype = Object.create(wrect.ECS.Component.ControlScheme.BaseScheme.prototype);
  wrect.ECS.Component.ControlScheme.Player.prototype.constructor = wrect.ECS.Component.ControlScheme;

  wrect.ECS.Component.ControlScheme.Player.prototype.keyspace = function() {
    if (this.lastJump === 0 || game.getPreviousTime() - this.lastJump >= this.jumpCooldown) {
      this.lastJump = game.getPreviousTime();
      this.jumpMovement = this.jumpForce;
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

