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
        var inputHandler = Container.getComponent('InputHandler');

        if (inputHandler.key('SPACE')) {
            multiplier *= -1;
        }

        var maxDistance = 500;
        var forcePoint = {
            x: centerBlock.dimensions.topLeft.x,
            y: centerBlock.dimensions.topLeft.y
        };

        var entities = game.getEntityManager().getAllEntities();
        for (var i = 0; i < entities.length; i++) {
            var entity = entities[i];
            if (entity.hasGlue || entity.frozen) {
                continue;
            }

            var xDist = entity.dimensions.topLeft.x - forcePoint.x;
            var yDist = entity.dimensions.topLeft.y - forcePoint.y;
            var totalDistance = Math.sqrt(Math.pow(Math.abs(xDist), 2) + Math.pow(Math.abs(yDist), 2));
//            console.log(totalDistance, xDist, yDist);
            var force = (1 - (totalDistance / maxDistance));

            if (force > 0.1) {
                if (xDist !== 0) {
                    var xDirection = xDist < 0 ? -1 : 1;
                    //entity._physics.xSpeed = (1 - Math.abs((xDist / maxDistance))) * multiplier * xDirection;
//                    entity._physics.xSpeed = (xDist / 100) * force * multiplier;
                  entity.physicsBody.v = entity.physicsBody.v.add(new Vector((xDist / 100) * force * multiplier, 0));
                }

                if (yDist !== 0) {
                    var yDirection = yDist < 0 ? -1 : 1;
                    //entity._physics.ySpeed = (1 - Math.abs((yDist / maxDistance))) * multiplier * yDirection;
//                    entity._physics.ySpeed = (yDist / 100) * force * multiplier;
                  entity.physicsBody.v = entity.physicsBody.v.add(new Vector(0, (yDist / 100) * force * multiplier));
                }
            }
        }
    }
});
