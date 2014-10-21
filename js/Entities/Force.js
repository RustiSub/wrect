(function() {
  "use strict";

  wrect.Entities = wrect.Entities || {};

  /**
   * @augments MovableEntity
   * @type {void|*}
   */
  wrect.Entities.Force = wrect.Entities.BaseEntity.extend({

    params: {},
    pulseTimer: {
      interval: 100,
      timeLapsed: 0
    },
    rotationSpeed: 2,
    drawCone: function (forceGraphics, params) {
      forceGraphics.beginFill(0xD281F7, 0.5);
      forceGraphics.moveTo(params.origin.x, params.origin.y);
      forceGraphics.lineTo(params.begin.x, params.begin.y);
      forceGraphics.lineTo(params.top.x, params.top.y);
      forceGraphics.lineTo(params.end.x, params.end.y);
      forceGraphics.lineTo(params.origin.x, params.origin.y);
      forceGraphics.endFill();

      this.dimensions.topLeft = params.origin;
      this.dimensions.topRight = params.begin;
      this.dimensions.bottomRight = params.top;
      this.dimensions.bottomLeft = params.end;
    },
    createCone: function (origin, length, forceAngle, angle) {
      var params = {};
      params.length= length;
      params.forceAngle = forceAngle;
      params.angle = angle;
      params.origin = origin;
      params.begin = new Vector(origin.x + length, params.origin.y);
      forceAngle = window.game.getHelpers().math.toRadians(forceAngle);
      params.begin = params.begin.rotate(forceAngle, origin);

      angle = window.game.getHelpers().math.toRadians(angle);
      params.begin = params.begin.rotate(-(angle / 2), origin);
      params.top = params.begin.rotate((angle / 2), origin);
      params.end = params.top.rotate((angle / 2), params.origin);

      return params;
    }, /**
     *
     * @param {Vector}origin
     * @param {Number}length
     * @param {Number}angle
     * @param {Number}forceAngle
     */
    init: function(origin, length, angle, forceAngle) {
      this.params = this.createCone(origin, length, forceAngle, angle);

      var graphics = new PIXI.Graphics();
      this.dimensions = {};
      this.drawCone(graphics, this.params);
      this._super('shield', graphics);

      this._physics.solid = false;
      this.frozen = true;

      this.dimensions.vertices = function (dimensions) {
        return [
          dimensions.topLeft,
          dimensions.topRight,
          dimensions.bottomRight,
          dimensions.bottomLeft
        ];
      };

      this.physicsBody = {};
      this.physicsBody.v = new Vector(0, 0);
      this.physicsBody.a = new Vector(0, 0);
      this.physicsBody.m = 1;
      this.physicsBody.theta = 0;
      this.physicsBody.omega = 0;
      this.physicsBody.alpha = 0;
      this.physicsBody.collided = false;

      this.physicsBody.J = 1;//this.m * (dimensions.height * dimensions.height + dimensions.width * this.width) / 12000;

      this.pulseTimer.checkInterval = function() {
        this.timeLapsed += game.timeDelta;

        if (this.timeLapsed >= this.interval) {
          this.timeLapsed = 0;

          return true;
        }

        return false;
      };
    },
    adjustWidth: function(angle) {
      this._graphics.clear();
      this.params.angle = angle;
      this.params = this.createCone(this.params.origin, this.params.length, this.params.forceAngle, this.params.angle);
      this.drawCone(this._graphics, this.params);
    },
    adjustAngle: function(angle) {
      this._graphics.clear();
      this.params.forceAngle = angle;
      this.params = this.createCone(this.params.origin, this.params.length, this.params.forceAngle, this.params.angle);
      this.drawCone(this._graphics, this.params);
    },
    update: function() {
      this.updateAngle();
      this.updateWidth();

    },
    updateAngle: function() {
      var helpers = game.getHelpers();
      var mousePos = Container.getGame().getInputHandler().getMouseWorldPosition();
      if (mousePos) {
        // Calculate the angle between the mouse and the current shield position
        var targetVector = mousePos.subtract(this.params.origin);
        var targetAngle = helpers.math.toDegrees(Math.atan2(targetVector.y, targetVector.x));

        // Calculate the difference in degrees between the current and the target anglen modulo'd by 360 to keep things working after doing a full circle
        var diff = Math.round(targetAngle - this.params.forceAngle)%360;
        if (Math.abs(diff) > this.rotationSpeed) {

          // Prevents choosing the wrong turning direction
          if (diff > 180) {
            diff -= 360;
          }
          else if (diff < -180) {
            diff += 360;
          }

          // Apply the rotationspeed in the correct direction. Modulo'd by 360 to keep things working after doing a full circle
          if (diff < 0) {
            this.adjustAngle(Math.round(this.params.forceAngle - this.rotationSpeed)%360);
          }
          else {
            this.adjustAngle(Math.round(this.params.forceAngle + this.rotationSpeed)%360);
          }
        }
      }
    },
    updateWidth: function() {
      var inputHandler = Container.getGame().getInputHandler();
      if (inputHandler.key('up') || inputHandler.key('right')) {
        this.adjustWidth(this.params.angle+2);
      }
      else if (inputHandler.key('down') || inputHandler.key('left')) {
        this.adjustWidth(this.params.angle-2);
      }
    },
    handleCollision: function(collisionShape, axes1Overlap, axes2Overlap) {
      if (this.pulseTimer.checkInterval()) {
        var speed = collisionShape.physicsBody.v;
        var n = this.params.origin.subtract(collisionShape.dimensions.center());
        var v = collisionShape.physicsBody.v;

        var vn = v.dot(n);
        var nn = n.dot(n);
        var penetrationSpeedVector = n.multiply(vn / nn);
        var penetrationSpeed = penetrationSpeedVector.len();

        var shieldSpeedLimit = 2;
        var pulseDampStrength = 2;

        if (penetrationSpeed > shieldSpeedLimit) {
          var overSpeedLimit = penetrationSpeed - shieldSpeedLimit;
          var dampStrength = overSpeedLimit > pulseDampStrength ? pulseDampStrength : overSpeedLimit;
          var dampForceVector = penetrationSpeedVector.unitScalar(-(dampStrength));
          collisionShape.physicsBody.v = speed.add(dampForceVector);
        }
  //
        //=> this is the working repulsion
  //      newSpeed = newSpeed.add(penetrationVector.unitScalar(-1));

  //      var repulsionVector = collisionShape.dimensions.center().add(this.params.origin.subtract(collisionShape.dimensions.center()).unitScalar(-50));
  //      console.log(collisionShape.physicsBody.v, repulsionVector);
  ////      collisionShape.physicsBody.v = collisionShape.physicsBody.v.add(repulsionVector);
  //      console.log(collisionShape.physicsBody.v);
  //
  ////      console.log(penetrationVector);
  //      this._graphics.beginFill(0xFFFFFF, 0.5);
  //      this._graphics.moveTo(center.x, center.y);
  //      this._graphics.lineTo(repulsionVector.x, repulsionVector.y);
  //      this._graphics.lineTo(repulsionVector.x, repulsionVector.y + 10);
  ////      this._graphics.lineTo(center.x, center.y);
  ////      this._graphics.lineTo(center.x, center.y + 10);
  //      this._graphics.lineTo(center.x, center.y);
  //      this._graphics.endFill();
  //      collisionShape.physicsBody.v = newSpeed;

      }
    },
    apply: function() {
      //Draw
      //Detect entities
      //Calculate distance
      //Apply force
    }
  });

}());
