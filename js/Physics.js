/**
 * @type {void|*}
 */
var Physics = Class.extend({

  fallTime: 0,
  xSpeed: 0,
  ySpeed: 0,

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

/*    if (this.ySpeed < -0.5) {
     this.ySpeed *= 0.99;
    }*/
  },

  stop: function() {
    this.xSpeed = 0;
    this.ySpeed = 0;
  },

  isMoving: function() {
    return (this.xSpeed !== 0 || this.ySpeed !== 0);
  },

  applyFriction: function(yPosition, height) {
    this.fallTime += 1;

    this.xSpeed = this.xSpeed * 0.90;

    if (yPosition <= height && this.ySpeed < 0) {
      this.ySpeed = this.ySpeed * 0.90;
    }
    else if (yPosition <= height && this.ySpeed > 0) {
      this.ySpeed = this.ySpeed * 1.10;
    }

    if (yPosition <= height && (this.ySpeed >= -0.5 && this.ySpeed <= 0.5)) {
      this.ySpeed = 0.6;
    }
  },
  applyGravity: function(collision) {

    if (collision.rest.y && collision.rest.x) {
      this.ySpeed = 0;
      this.xSpeed = this.xSpeed * 0.95;
    } else {
      this.xSpeed = this.xSpeed * 0.99;
      if (this.ySpeed >= -0.1 && this.ySpeed <= 0.1) {
        this.ySpeed = 1;
      }

      if (this.ySpeed > 0) {
        this.ySpeed = this.ySpeed * 1.05;
      }
      else {
        this.ySpeed = this.ySpeed * 0.90;
      }
    }

    if (collision.y) {
      this.ySpeed = 0;
//      if (this.ySpeed == 0) {
//        this.ySpeed = 1;
//      }
//      this.ySpeed = this.ySpeed * 1.05;
    }
    else {

    }

    if (collision.x) {
//      this.xSpeed = 0;
//      this.xSpeed = this.xSpeed * 0.5;
    }
    else {

    }
  }
});
