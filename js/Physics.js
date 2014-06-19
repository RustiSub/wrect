/**
 * @type {void|*}
 */
var Physics = Class.extend({

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
    this.xSpeed = - this.xSpeed;
  },

  reverseSpeedY: function() {
    this.ySpeed = - this.ySpeed;
  },

  applyFriction: function(yPosition) {
//    this.xSpeed = this.xSpeed * 0.95;
//    console.log(this.ySpeed);

    if (yPosition <= 600 && this.ySpeed < 0) {
//      console.log(yPosition);
      this.ySpeed = this.ySpeed * 0.85;
    }
    else if (yPosition <= 600 && this.ySpeed > 0) {
      this.ySpeed = this.ySpeed * 1.15;
    }
//    if (this.ySpeed == 0) {
//      console.log(this.ySpeed);
//    }


    if (yPosition <= 600 && (this.ySpeed >= -0.5 && this.ySpeed <= 0.5)) {
      this.ySpeed = 0.6;
    }
  }
});
