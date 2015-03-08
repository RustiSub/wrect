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
    this.jumpForce = 60;

    game.getEventManager().addListener('physics.collide', function(data) {
      var entityA = data.entity.components.ControlScheme;
      var entityB = data.otherEntity.components.ControlScheme;

      var controlScheme = entityA ? entityA : (entityB ? entityB : false);

      if (controlScheme && controlScheme.jumpMovement) {
        controlScheme.jumpMovement = false;

        var perpSurface = data.surface.perpendicular();
        var forceSign = data.force.dot(perpSurface) > 0 ? 1 : -1;
        var jumpVector = perpSurface.unitScalar(forceSign *controlScheme.jumpForce);

        controlScheme.movement = controlScheme.movement.add(jumpVector);
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
      this.jumpMovement = true;
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

