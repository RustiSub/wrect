/**
 * @type {void|*}
 */
var Physics = Class.extend({

  fallTime: 0,
  xSpeed: 0,
  ySpeed: 0,

  init: function() {

  },
  increaseSpeedX: function(increase) {
    this.xSpeed += increase;
  },

  calculateSpeedX: function() {
    return this.xSpeed;
  },

  increaseSpeedY: function(increase) {
    this.ySpeed += increase;
  },

  calculateSpeedY: function() {
    return this.ySpeed;
  },

  reverseSpeedX: function() {
    this.xSpeed = - this.xSpeed ;
  },

  reverseSpeedY: function() {
    this.ySpeed = - this.ySpeed;
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
