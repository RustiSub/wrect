/**
 * @augments MovableEntity
 * @type {void|*}
 */
var SpaceEngine = BaseEntity.extend({

  params: {},
  speed: {},
  attachedEntity: {},
  pulseTimer: {
    interval: 100,
    timeLapsed: 0
  },

  drawEngine: function () {
    var graphics = this._graphics;
    //var dimensions = this.dimensions;
    //var math = window.game.getHelpers().math;
    //
    graphics.beginFill(0xFFFFFF, 1);
    graphics.drawCircle(this.dimensions.origin.x, this.dimensions.origin.y, this.dimensions.length);
    graphics.endFill();
    //
    ////graphics.moveTo(dimensions.origin.x, dimensions.origin.y);
    //var baseVector = dimensions.origin.add(new Vector(dimensions.length, 0));
    //var engineLeft = baseVector.rotate(math.toRadians(dimensions.angle + 20), dimensions.origin);
    //var engineRight = baseVector.rotate(math.toRadians(dimensions.angle - 20), dimensions.origin);
    ////graphics.lineTo(engineLeft.x, engineLeft.y);
    ////graphics.lineTo(engineRight.x, engineLeft.y);
    ////graphics.lineTo(dimensions.origin.x, dimensions.origin.y);
    //graphics.lineTo(dimensions.origin.x, dimensions.origin.y);
    //graphics.lineTo(dimensions.origin.x+100, dimensions.origin.y);
    //graphics.lineTo(dimensions.origin.x+100, dimensions.origin.y+100);
    //graphics.endFill();
  },
  /**
   *
   * @param {Vector}origin
   * @param {BaseEntity} attachedEntity
   * @param options
   */
  init: function(origin, attachedEntity, options) {
    var graphics = new PIXI.Graphics();
    this.speed = new Vector(5, 0);

    this.dimensions = {
      origin: origin,
      length: 20,
      size: 40,
      angle: 0
    };
    this._super('engine', graphics);
    this._physics.solid = false;
    this.frozen = true;

    this.dimensions.vertices = function (dimensions) {
      return [this.origin];
    };

    this.dimensions.bounds = function() {
      return {
        topLeft : this.origin,
        topRight : this.origin,
        bottomRight : this.origin,
        bottomLeft : this.origin
      };
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

    this.attachToEntity(attachedEntity);
    this.drawEngine();
  },
  adjustAngle: function(angle) {
    this._graphics.clear();
    this.params.forceAngle = angle;
    this.params = this.createCone(this.params.origin, this.params.length, this.params.forceAngle, this.params.angle);
    this.drawCone(this._graphics, this.params);
  },
  attachToEntity: function(entity) {
    this.dimensions.origin = entity.dimensions.topLeft;
    this._graphics.position = entity.dimensions.topLeft;
    this.attachedEntity = entity;
  },
  update: function() {
    //this.updateAngle();
    this._graphics.position = this.attachedEntity.dimensions.topLeft;
  },
  updateAngle: function() {
    //var helpers = game.getHelpers();
    //var mousePos = Container.getGame().getInputHandler().getMouseWorldPosition();
    //if (mousePos) {
    //  // Calculate the angle between the mouse and the current shield position
    //  var targetVector = mousePos.subtract(this.params.origin);
    //  var targetAngle = helpers.math.toDegrees(Math.atan2(targetVector.y, targetVector.x));
    //
    //  // Calculate the difference in degrees between the current and the target anglen modulo'd by 360 to keep things working after doing a full circle
    //  var diff = Math.round(targetAngle - this.params.forceAngle)%360;
    //  if (Math.abs(diff) > this.rotationSpeed) {
    //
    //    // Prevents choosing the wrong turning direction
    //    if (diff > 180) {
    //      diff -= 360;
    //    }
    //    else if (diff < -180) {
    //      diff += 360;
    //    }
    //
    //    // Apply the rotationspeed in the correct direction. Modulo'd by 360 to keep things working after doing a full circle
    //    if (diff < 0) {
    //      this.adjustAngle(Math.round(this.params.forceAngle - this.rotationSpeed)%360);
    //    }
    //    else {
    //      this.adjustAngle(Math.round(this.params.forceAngle + this.rotationSpeed)%360);
    //    }
    //  }
    //}
  },
  handleCollision: function(collisionShape, axes1Overlap, axes2Overlap) {
    if (this.pulseTimer.checkInterval()) {
      var speed = collisionShape.physicsBody.v;

      var penetrationVector = this.params.origin.subtract(collisionShape.dimensions.center());
      var newSpeed = speed.add(penetrationVector.multiply(-0.05));
      var speedValue = Math.abs(newSpeed.distance(new Vector(0, 0)));

      if (speedValue > this.strength) {
        newSpeed = newSpeed.unitScalar(this.strength);
      }

      collisionShape.physicsBody.v = newSpeed;
    }
  },
  apply: function() {
    //Draw
    //Detect entities
    //Calculate distance
    //Apply force
  }
});

