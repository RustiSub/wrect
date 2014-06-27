var GravityManager = Class.extend({
 applyGravity: function(bodies) {
    for (var x = 0; x < bodies.length; x++) {
      var mainBody = bodies[x];

//      if (!mainBody.frozen) {
//        mainBody._physics.applyGravity(mainBody.collision);
//      }

//      if (mainBody.collision.y || mainBody.collision.x) {
//        mainBody._physics.ySpeed = 0;
//        mainBody._physics.xSpeed = 0;
//      }
    }
  }
});
