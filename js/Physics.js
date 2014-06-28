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
      //console.log('before', this.xSpeed);
      //alert('reverseSpeedX');
      this.reverseSpeedX();
      //console.log('after', this.xSpeed);
      collision.x = false;
      //alert('speed reversed');
    }

    if (collision.y) {
      //console.log('before', this.ySpeed);
      //alert('reverseSpeedY');
      this.reverseSpeedY();
      //console.log('after', this.ySpeed);
      collision.y = false;
      //alert('speed reversed');
    }
  },
  absorbSpeed: function(speed) {
//    return ;
  }
});
