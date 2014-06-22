var CollisionManager = Class.extend({
  updateAllCollisions: function(bodies) {
    for (var x = 0; x < bodies.length; x++) {
      var mainBody = bodies[x];

      for (var y = 0; y < bodies.length; y++) {
        if (x !== y) {
          var otherBody = bodies[y];
          var xDist = otherBody.position.x - mainBody.position.x;

          if (xDist > -otherBody.size.x/2 && xDist < otherBody.size.x/2){
            var yDist = otherBody.position.y - mainBody.position.y;
            if (yDist > -otherBody.size.y/2 && yDist < otherBody.size.y/2)
            {
              mainBody.collides = true;
              otherBody.collides = true;
              mainBody.applyCollision();
              console.log('COLLIDE');
            }
          }
        }
      }
    }
  }
});
