var CollisionManager = Class.extend({
  checkAxisCollision: function (mainBody, otherBody, debug, axis) {
    var yDist = null;

//    if (mainBody.speed >= 0) {
    var mainBodyAbsolutePosition = mainBody.position + mainBody.size;
    var otherBodyAbsolutePosition = otherBody.position + otherBody.size;

    if (mainBody.position == otherBody.position) {
      if (debug) { console.log(axis, '1'); }
      return 0;
    }

    if (mainBody.position < otherBody.position) {
      if (mainBodyAbsolutePosition >= otherBody.position) {
        if (debug) { console.log(axis,'2'); }
        return mainBodyAbsolutePosition - otherBody.position;
      }

      if (mainBodyAbsolutePosition + mainBody.speed > otherBody.position) {
        if (debug) { console.log(axis, '3'); }
        return mainBodyAbsolutePosition - otherBody.position;
      }
    }

    if (mainBody.position > otherBody.position) {
      if (mainBody.position <= otherBodyAbsolutePosition) {
        if (debug) { console.log(axis, '4'); }
        return otherBodyAbsolutePosition - mainBody.position;
      }

      if (mainBody.position + mainBody.speed < otherBody.position) {
        if (debug) { console.log(axis, '5'); }
        return otherBody.position - mainBodyAbsolutePosition + mainBody.speed;
      }
    }

    return yDist;
  }, updateAllCollisions: function(bodies) {
    for (var x = 0; x < bodies.length; x++) {
      var mainBody = bodies[x];

      for (var y = 0; y < bodies.length; y++) {
        if (x !== y) {
          var otherBody = bodies[y];

          if (!mainBody._physics.isMoving()) { //} && !otherBody._physics.isMoving()) {
            continue;
          }
          var debug = false;
          if (mainBody.name == 'b1' && otherBody.name == '_left') {
            debug = false;
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
              },debug, 'x'
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
              }, debug, 'y'
          );
          if (debug) {
//            console.log(xDist, yDist);
//            alert('collide');
          }
          if ((xDist != null) && (yDist != null)) {
//            console.log(xDist, yDist, mainBody._physics.xSpeed, mainBody._physics.ySpeed, mainBody.name, otherBody.name);
//alert('collision');
            if (xDist < yDist) {
              mainBody._physics.reverseSpeedX();
            }
            else if(xDist > yDist) {
              mainBody._physics.reverseSpeedY();
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
