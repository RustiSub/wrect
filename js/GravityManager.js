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

        multiplier = 2;

        if (inputHandler.key('SPACE')) {
            multiplier *= -1;
        }

        var maxDistance = 250;
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
            var xDist = entity.position.getAnchor().x - forcePoint.x;
            var yDist = entity.position.getAnchor().y - forcePoint.y;
            var totalDistance = Math.sqrt(Math.pow(Math.abs(xDist), 2) + Math.pow(Math.abs(yDist), 2));
//            console.log(totalDistance, xDist, yDist);
            var force = (1 - (totalDistance / maxDistance));

            if (force > 0.1) {
                if (xDist !== 0) {
                    var xDirection = xDist < 0 ? -1 : 1;
                    //entity._physics.xSpeed = (1 - Math.abs((xDist / maxDistance))) * multiplier * xDirection;
                    entity._physics.xSpeed = (xDist / 100) * force * multiplier;
                }

                if (yDist !== 0) {
                    var yDirection = yDist < 0 ? -1 : 1;
                    //entity._physics.ySpeed = (1 - Math.abs((yDist / maxDistance))) * multiplier * yDirection;
                    entity._physics.ySpeed = (yDist / 100) * force * multiplier;
                }
//alert(xDirection);
//alert(entity._physics.xSpeed);
            }
        }
    }
});
