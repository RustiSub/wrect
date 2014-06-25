var CollisionManager = Class.extend({
  updateAllCollisions: function(bodies) {
    for (var x = 0; x < bodies.length; x++) {
      var mainBody = bodies[x];

      for (var y = 0; y < bodies.length; y++) {
        if (x !== y) {
          var xDist = 0;
          var yDist = 0;
          var xCollide = false;
          var yCollide = false;
          var otherBody = bodies[y];

          if (!mainBody._physics.isMoving() && !otherBody._physics.isMoving()) {
            continue;
          }


          if (mainBody._physics.xSpeed >= 0 && mainBody.position.x < otherBody.position.x ) {
            if (mainBody.position.x + mainBody.size.x >= otherBody.position.x) {
              xDist = otherBody.position.x - mainBody.position.x + mainBody.size.x;
              xCollide = true;
            }
          }

          if (mainBody._physics.xSpeed >= 0 && !xCollide && mainBody.position.x + mainBody.size.x < otherBody.position.x ) {
            if (mainBody.position.x + mainBody.size.x + mainBody._physics.xSpeed >= otherBody.position.x + otherBody._physics.xSpeed) {
              xDist = otherBody.position.x - mainBody.position.x + mainBody.size.x;
              xCollide = true;
            }
          }

          if (mainBody._physics.ySpeed >= 0 && mainBody.position.y < otherBody.position.y ) {
            if (mainBody.position.y + mainBody.size.y >= otherBody.position.y) {
              yDist = otherBody.position.y - mainBody.position.y + mainBody.size.y;
              yCollide = true;
            }
          }

          if (mainBody._physics.ySpeed >= 0 && !yCollide && mainBody.position.y + mainBody.size.y < otherBody.position.y) {
            if (mainBody.position.y + mainBody.size.y + mainBody._physics.ySpeed >= otherBody.position.y + otherBody._physics.ySpeed) {
              yDist = otherBody.position.y - mainBody.position.y + mainBody.size.y;
              yCollide = true;
            }
          }

          if (xCollide && yCollide) {
            alert(mainBody.position.y);
            alert(mainBody.size.y);
            alert(mainBody._physics.ySpeed);
            alert(otherBody.position.y);
            alert(otherBody._physics.ySpeed);

            if (xDist > yDist) {
              mainBody._physics.reverseSpeedX();
              otherBody._physics.reverseSpeedY();
            }

            if (xDist < yDist) {
              mainBody._physics.reverseSpeedY();
              otherBody._physics.reverseSpeedX();
            }
          }
        }
      }
    }
  }
});
