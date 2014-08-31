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
    var maxDistance = 500;
    var forcePoint = {
      x: centerBlock.position.getAnchor().x,
      y: centerBlock.position.getAnchor().y,
      multiplier: multiplier,
      gravity: 100
    };

//    game.addEntity(game._builder.createBlock('forceCenter', forcePoint.x - 5, forcePoint.y - 5, 10, 10));

    var entities = game.getEntityManager().getAllEntities();
    for (var i = 0; i < entities.length; i++) {
      var entity = entities[i];
//      if (entity.name.substr(0, 1) == 'b') {
      if (entity.hasGlue) {
        continue;
      }
      var xDist =  (entity.position.getAnchor().x - forcePoint.x);
      var yDist =  (entity.position.getAnchor().y - forcePoint.y);

      //Calculate how far each axis has to go to reach it's center
      //
////
////      if (xDist != 0) {
////        entity._physics.xSpeed = (1 - (xDist / maxDistance)) * xMultiplier;
////        console.log('xSpeed', entity._physics.xSpeed);
////      }
////
//      if (yDist > 0) {
//        yDist = -yDist;
//        yMultiplier = -multiplier;
//      }

//      $x = 200;
//      $y = 500;
//      $d = sqrt((pow($x, 2) + pow($y, 2)));
//      var_dump($d);
//      var_dump((1 - ($d / 500)));die;

      var totalDistance = Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
      var force = (1 - (totalDistance / maxDistance));

      if (force > 0.1) {
        var frameSpeed = 50;
        console.log(force);
        console.log();
        entity._physics.xSpeed = (xDist / frameSpeed) * force * multiplier;
        entity._physics.ySpeed = (yDist / frameSpeed) * force * multiplier;

        console.log(entity._physics.xSpeed);
      }

//
//      if (yDist != 0) {
//        console.log('(1 - (', yDist , ' / ', maxDistance, ') *', yMultiplier);
//        entity._physics.ySpeed = (1 - (yDist / maxDistance)) * yMultiplier;
//        console.log('ySpeed', entity._physics.ySpeed);
//      }
//      }
    }
  }
});
