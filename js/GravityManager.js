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
  },
  applyForce: function(multiplier, centerBlock) {
      multiplier = 10;
    var maxDistance = 500;
    var forcePoint = {
      x: centerBlock.position.getAnchor().x,
      y: centerBlock.position.getAnchor().y
    };

    var entities = game.getEntityManager().getAllEntities();
    for (var i = 0; i < entities.length; i++) {
      var entity = entities[i];
      if (entity.hasGlue) {
        continue;
      }
      var xDist = (entity.position.getAnchor().x - forcePoint.x);
      var yDist = (entity.position.getAnchor().y - forcePoint.y);
      var totalDistance = Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
      var force = (1 - (totalDistance / maxDistance));

      if (force > 0.1) {
        entity._physics.xSpeed = (xDist / maxDistance) * force * multiplier;
        entity._physics.ySpeed = (yDist / maxDistance) * force * multiplier;
      }
    }
  }
});
