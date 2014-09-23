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
  torque: 0,

  init: function() {
    this.deltaVector = new Vector(0, 0);
    this.forceVectors = [];
  },
  apply: function(physicsBody, dimensions, dt) {
    var f = new Vector(0, 0);
    var b = -5;

    var dr = physicsBody.v; //.scale(dt).add(physicsBody.a.scale(0.5 * dt * dt));
    this.move(dimensions, dr);//.scale(100));

    /* Add Gravity */
//    f = f.add(new Vector(0, physicsBody.m * 9.81));

    /* Add damping */
//    f = f.add( physicsBody.v.scale(b) );

    var deltaTheta = 0.05;
    this.rotate(physicsBody, dimensions, deltaTheta);
  },
  center: function(dimensions) {
    var diagonal = dimensions.bottomRight.subtract(dimensions.topLeft);
    return dimensions.topLeft.add(diagonal.scale(0.5));
  },
  move: function(dimensions, v) {
    dimensions.topLeft = dimensions.topLeft.add(v);
    dimensions.topRight = dimensions.topRight.add(v);
    dimensions.bottomRight = dimensions.bottomRight.add(v);
    dimensions.bottomLeft = dimensions.bottomLeft.add(v);

    return dimensions;
  },
  rotate: function(physicsBody, dimensions, angle) {
//    console.log('angle', angle);
    physicsBody.theta += angle;
    var center = this.center(dimensions);

//    console.log('before', dimensions.topLeft, angle, center);
    dimensions.topLeft = dimensions.topLeft.rotate(angle, center);
    dimensions.topRight = dimensions.topRight.rotate(angle, center);
    dimensions.bottomRight = dimensions.bottomRight.rotate(angle, center);
    dimensions.bottomLeft = dimensions.bottomLeft.rotate(angle, center);

    return this;
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
