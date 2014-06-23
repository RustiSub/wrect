var CollisionManager = Class.extend({
  updateAllCollisions: function(bodies) {
    for (var x = 0; x < bodies.length; x++) {
      var mainBody = bodies[x];

      for (var y = 0; y < bodies.length; y++) {
        if (x !== y) {
          var xCollide = false;
          var yCollide = false;
          var otherBody = bodies[y];

          if (!mainBody._physics.isMoving() && !otherBody._physics.isMoving()) {
            continue;
          }

          var xDist = otherBody.position.x - mainBody.position.x;
          var yDist = otherBody.position.y - mainBody.position.y;

          if (xDist > 0) {
            xDist -= mainBody.size.x;
            xDist -= otherBody.size.x;

            if (xDist <= 0 ) {
              xCollide = true;
            }
          }
          else {
            xDist += mainBody.size.x;
            xDist += otherBody.size.x;

            if (xDist >= 0 ) {
              xCollide = true;
            }
          }

          if (yDist > 0) {
            yDist -= mainBody.size.y;
            yDist -= otherBody.size.y;

            if (yDist <= 0 ) {
              yCollide = true;
            }
          }
          else {
            yDist += mainBody.size.y;
            yDist += otherBody.size.y;

            if (yDist >= 0 ) {
              yCollide = true;
            }
          }

          if (xCollide && yCollide) {
//            alert(xDist);
//            alert(yDist);
            console.log(mainBody.name, otherBody.name);
            mainBody.applyCollision();
          }

//0
//0 > -10
//0 < 10

          //mainBody.applyCollision();
          /*if (xDist > -otherBody.size.x/2 && xDist < otherBody.size.x/2){

            var yDist = otherBody.position.y - mainBody.position.y;
            if (yDist > -otherBody.size.y/2 && yDist < otherBody.size.y/2)
            {
              mainBody.collides = true;
              otherBody.collides = true;
              mainBody.applyCollision();
              console.log('COLLIDE');
            }
          }*/
        }
      }
    }
  }
});
