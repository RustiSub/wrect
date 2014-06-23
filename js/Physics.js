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

  isMoving: function() {
    return (this.xSpeed !== 0 || this.ySpeed !== 0);
  },

  applyFriction: function(yPosition, height) {
    this.fallTime += 1;

    if (yPosition <= height && this.ySpeed < 0) {
      this.ySpeed = this.ySpeed * 0.95;
    }
    else if (yPosition <= height && this.ySpeed > 0) {
      //this.fallTime += 0.01;
      this.ySpeed = this.ySpeed * 1.05;
    }

    if (yPosition <= height && (this.ySpeed >= -0.5 && this.ySpeed <= 0.5)) {
      //this.fallTime = 0;
      this.ySpeed = 0.6;
    }
  }
});
