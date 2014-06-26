var CollisionManager = Class.extend({
  checkAxisCollision: function (mainBody, otherBody, debug) {
    var yDist = null;

    if (mainBody.speed >= 0) {
      if (mainBody.position < otherBody.position) {
        if (mainBody.position + mainBody.size >= otherBody.position + otherBody.size) {
          return (mainBody.position + mainBody.size) - (otherBody.position + otherBody.size);
        }
      }
      if (mainBody.position > otherBody.position) {
        if (mainBody.position + mainBody.size <= otherBody.position + otherBody.size) {
          return (otherBody.position + otherBody.size) - (mainBody.position + mainBody.size);
        }
      }

      if (mainBody.position + mainBody.size < otherBody.position + otherBody.size) {
        if (mainBody.position + mainBody.size + mainBody.speed >= otherBody.position + otherBody.speed) {
          return (otherBody.position + otherBody.size) - (mainBody.position + mainBody.size);
        }
      }
    } else {
      if (mainBody.position === otherBody.position) {
        return  0;
      }

      if (mainBody.position > otherBody.position) {
        if (mainBody.position + mainBody.speed <= otherBody.position + otherBody.speed) {
          return  mainBody.position - otherBody.position;
        }
      }
    }

    return yDist;
  }, updateAllCollisions: function(bodies) {
    for (var x = 0; x < bodies.length; x++) {
      var mainBody = bodies[x];

      for (var y = 0; y < bodies.length; y++) {
        if (x !== y) {
          var otherBody = bodies[y];

          if (!mainBody._physics.isMoving() && !otherBody._physics.isMoving()) {
            continue;
          }
          var debug = false;
          if (mainBody.name == 'b1' && otherBody.name == '_top') {
            debug = true;
          }

          var xDist = this.checkAxisCollision(
              {
                position: mainBody.position.x,
                size: mainBody.size.x,
                speed: mainBody._physics.xSpeed
              },
              {
                position: otherBody.position.x,
                size: otherBody.size.x,
                speed: otherBody._physics.xSpeed
              },debug
          );

          //Y collision
          //Check for objects that currently lie below the main object
          var yDist = this.checkAxisCollision(
              {
                position: mainBody.position.y,
                size: mainBody.size.y,
                speed: mainBody._physics.ySpeed
              },
              {
                position: otherBody.position.y,
                size: otherBody.size.y,
                speed: otherBody._physics.ySpeed
              }, debug
          );
          if (debug) {
//            console.log(xDist, yDist);
//            alert('collide');
          }
          if ((xDist != null) && (yDist != null)) {
            console.log(xDist, yDist);
alert('collide');
            if (xDist < yDist) {
              mainBody._physics.reverseSpeedX();
            }
            else {
              if (mainBody._physics.xSpeed < 0) {
                mainBody._physics.reverseSpeedX();
              }
              else {
                mainBody._physics.reverseSpeedY();
              }
            }

//            if (mainBody._physics.ySpeed > 0) {
//              if (xDist < yDist) {
//                mainBody._physics.reverseSpeedX();
//                otherBody._physics.reverseSpeedY();
//              }
//
//              if (xDist > yDist) {
//                mainBody._physics.reverseSpeedY();
//                otherBody._physics.reverseSpeedX();
//              }
//            }
//            else {
//              if (xDist > yDist) {
//                mainBody._physics.reverseSpeedX();
//                otherBody._physics.reverseSpeedY();
//              }
//
//              if (xDist < yDist) {
//                mainBody._physics.reverseSpeedY();
//                otherBody._physics.reverseSpeedX();
//              }
//            }
          }
        }
      }
    }
  }
});
