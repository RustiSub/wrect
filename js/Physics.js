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
  },
  calculateSpeed: function() {
    this.deltaVector = new Vector(0, 0);
    for (var v = 0; v < this.forceVectors.length; v++) {
      var forceVector = this.forceVectors[v];
      forceVector.update(this.deltaVector, forceVector);
      this.deltaVector = this.deltaVector.add(forceVector);
    }

    //this.xSpeed = Math.round(this.deltaVector.x);
    //this.ySpeed = Math.round(this.deltaVector.y);
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
      forceVector.multiply(new Vector(-1, 1));
    }
  },

  reverseSpeedY: function() {
    for (var v = 0; v < this.forceVectors.length; v++) {
      var forceVector = this.forceVectors[v];
      forceVector.multiply(new Vector(1, -1));
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
