var CollisionManager = Class.extend({
  checkAxisCollisionRest: function() {

  },
  checkAxisCollision: function (mainBody, otherBody, debug, axis) {
    var yDist = null;

    var mainBodyAbsolutePosition = mainBody.position + mainBody.size;
    var otherBodyAbsolutePosition = otherBody.position + otherBody.size;

    if (mainBody.position == otherBody.position) {
//      if (debug) { console.log(axis, '1'); }
      return 0;
    }

    if (mainBody.position < otherBody.position) {
      if (mainBodyAbsolutePosition >= otherBody.position) {
//        if (debug) { console.log(axis,'2'); }
        return mainBodyAbsolutePosition - otherBody.position;
      }

      if (mainBodyAbsolutePosition + mainBody.speed > otherBody.position) {
//        if (debug) { console.log(axis, '3'); }
        return mainBodyAbsolutePosition - otherBody.position;
      }
    }

    if (mainBody.position > otherBody.position) {
      if (mainBody.position <= otherBodyAbsolutePosition) {
//        if (debug) { console.log(axis, '4'); }
        return otherBodyAbsolutePosition - mainBody.position;
      }

      if (mainBody.position + mainBody.speed < otherBody.position) {
//        if (debug) { console.log(axis, '5'); }
        return otherBody.position - mainBodyAbsolutePosition + mainBody.speed;
      }
    }

    return yDist;
  }, updateAllCollisions: function(bodies) {
    for (var x = 0; x < bodies.length; x++) {
      var mainBody = bodies[x];
      mainBody.collision.x = false;
      mainBody.collision.y = false;

      for (var y = 0; y < bodies.length; y++) {
        if (x !== y) {
          var otherBody = bodies[y];

          var debug = false;
          if (mainBody.name == 'b1') { //} && otherBody.name == '_left') {
            debug = true;
          }

          if (!mainBody._physics.isMoving() && !otherBody._physics.isMoving()) {
            if (debug) {
//              alert('rest');
            }
            //do simple check to see which other objects we are touching
            var restX = false;
            var restY = false;
            if (mainBody.position.y + mainBody.size.y == otherBody.position.y) {
              restY = true;
            }

            if (mainBody.position.x > otherBody.position.x) {
              if (mainBody.position.x < otherBody.position.x + otherBody.size.x) {
                restX = true;
              }
            }

            if (restX && restY) {
              mainBody.collision.rest.y = true;
              mainBody.collision.rest.x = true;
            }

            continue;
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
          if ((xDist != null) && (yDist != null)) {
            if (xDist < yDist) {
              mainBody._physics.reverseSpeedX();
              mainBody.collision.x = true;
            }
            else if(xDist > yDist) {
              mainBody._physics.reverseSpeedY();
              mainBody.collision.y = true;
            }
            else {
              mainBody._physics.reverseSpeedX();
              mainBody.collision.x = true;
              mainBody._physics.reverseSpeedY();
              mainBody.collision.y = true;
            }
          }
        }

        if (!mainBody.frozen) {
          mainBody._physics.applyGravity(mainBody.collision);
        }
      }
    }
  }
});
