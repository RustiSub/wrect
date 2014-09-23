/**
 * @type {void|*}
 */
var Physics = Class.extend({

  fallTime: 0,
  xSpeed: 0,
  ySpeed: 0,
  vectors: [],
  forceVectors: [],
  deltaVector: {},

  init: function() {
    this.deltaVector = new Vector(0, 0);
    this.forceVectors = [];
  },
  apply: function(physicsBody, dimensions, dt) {
    var dr = physicsBody.v.scale(dt).add(physicsBody.a.scale(0.5 * dt * dt));
    this.move(dimensions, dr.scale(100));
  },
  move: function(dimensions, v) {
    dimensions.topLeft = dimensions.topLeft.add(v);
    dimensions.topRight = dimensions.topRight.add(v);
    dimensions.bottomRight = dimensions.bottomRight.add(v);
    dimensions.bottomLeft = dimensions.bottomLeft.add(v);

    return dimensions;
  },
  rotate: function(dimensions, v) {

  },
  calculateSpeed: function() {
    this.deltaVector = new Vector(0, 0);
    for (var v = 0; v < this.forceVectors.length; v++) {
      var forceVector = this.forceVectors[v];

      forceVector.update(this.deltaVector, forceVector);
      this.deltaVector = this.deltaVector.add(forceVector);
    }

    this.xSpeed = this.deltaVector.x;
    this.ySpeed = this.deltaVector.y;
    //this.deltaVector = new Vector(0, 0);
  },
  increaseSpeedX: function(increase) {
    this.xSpeed += increase;
  },

  increaseSpeedY: function(increase) {
    this.ySpeed += increase;
  },

  reverseSpeedX: function() {
    for (var v = 0; v < this.forceVectors.length; v++) {
      var forceVector = this.forceVectors[v];
      forceVector = forceVector.multiply({x: -1, y: 1});
      this.forceVectors[v].x = forceVector.x;
      this.forceVectors[v].y = forceVector.y;
    }
  },

  reverseSpeedY: function() {
    for (var v = 0; v < this.forceVectors.length; v++) {
      var forceVector = this.forceVectors[v];
      forceVector = forceVector.multiply({x: 1, y: -1});
      this.forceVectors[v].x = forceVector.x;
      this.forceVectors[v].y = forceVector.y;
    }
  },

  stop: function() {
    this.xSpeed = 0;
    this.ySpeed = 0;
  },

  isMoving: function() {
    return (this.xSpeed !== 0 || this.ySpeed !== 0);
  },

  applyFriction: function(friction) {
      var reduceSpeed = function(speed, friction) {
          var zeroBarrier = 0.01;
          if ((speed > - zeroBarrier && speed < 0) || (speed > 0 && speed < zeroBarrier)) {
              return 0;
          }
          return speed * (1 - (friction / 100));
      };
      this.xSpeed = reduceSpeed(this.xSpeed, friction);
      this.ySpeed = reduceSpeed(this.ySpeed, friction);
  },

  applyGravity: function(collision) {

    if (collision.rest.y && collision.rest.x) {
//      this.ySpeed = 0;
//      this.xSpeed = this.xSpeed * 0.70;
    } else {
//      this.xSpeed = this.xSpeed * 0.99;
      if (this.ySpeed >= -0.1 && this.ySpeed <= 0.1) {
        this.ySpeed = 1;
      }
//
      if (this.ySpeed > 0) {
        this.ySpeed = this.ySpeed * 1.05;
      }
      else {
        this.ySpeed = this.ySpeed * 0.95;
      }
    }

    if (collision.y) {
//      this.ySpeed = 0;
    }
  },
  applyCollision: function(collision) {
    if (collision.x) {
      this.reverseSpeedX();
    }

    if (collision.y) {
      this.reverseSpeedY();
    }
  },
  absorbSpeed: function(speed) {
//    return ;
  }
});
