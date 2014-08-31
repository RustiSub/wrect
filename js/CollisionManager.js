var CollisionManager = Class.extend({
  checkAxisCollisionRest: function() {

  },
  checkAxisCollision: function (mainBody, otherBody, debug, axis) {
    var yDist = null;

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

      if (mainBodyAbsolutePosition + mainBody.speed > otherBody.position + otherBody.speed) {
        if (debug) { console.log(axis, '3'); }
        return mainBodyAbsolutePosition - otherBody.position;
      }
    }

    if (mainBody.position > otherBody.position) {
      if (debug) {
        console.log(mainBody.position, otherBody.position, otherBody.size);
        console.log(axis, '4');
      }
      if (mainBody.position <= otherBodyAbsolutePosition) {
        return otherBodyAbsolutePosition - mainBody.position;
      }

      if (mainBody.position + mainBody.speed < otherBodyAbsolutePosition) {
        if (debug) { console.log(axis, '5'); }
        return otherBody.position - mainBodyAbsolutePosition + mainBody.speed;
      }
    }

    return yDist;
  }, registerCollision: function (xDist, yDist, body, otherBody) {
    var collision = new Collision();
    if (xDist < yDist) {
      collision.x = true;
      collision.direction.x = body._physics.xSpeed;
    }
    else if (xDist > yDist) {
      collision.y = true;
      collision.direction.y = body._physics.ySpeed;
    }
    else {
      collision.direction.x = body._physics.xSpeed;
      collision.direction.y = body._physics.ySpeed;
      collision.x = true;
      collision.y = true;
    }

    collision.main = body.name;
    collision.other = otherBody.name;
    body.collisions.push(collision);
  }, updateAllCollisions: function(bodies) {
    for (var x = 0; x < bodies.length; x++) {
      var mainBody = bodies[x];
      mainBody._physics.applyFriction(1);

      mainBody.collisions = [];

      for (var y = 0; y < bodies.length; y++) {
        if (x !== y) {
          var otherBody = bodies[y];

          var debug = false;
          if (mainBody.name == 'b1' && otherBody.name == 'b2') {
            debug = false;
          }

          if (!mainBody._physics.isMoving() && !otherBody._physics.isMoving()) {
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
              }, false, 'y'
          );
          if ((xDist != null) && (yDist != null)) {
            this.registerCollision(xDist, yDist, mainBody, otherBody);
          }
        }
      }
    }

    for (var x = 0; x < bodies.length; x++) {
      var body = bodies[x];
      for (var c = 0; c < body.collisions.length; c++) {
        var collision = body.collisions[c];
        body._physics.applyCollision(collision);
        //body._physics.applyGravity(collision);
      }
    }
  }
});
