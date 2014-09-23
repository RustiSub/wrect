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
  },
  satTest: function(a, b) {
    function intersect_safe(a, b)
    {
      var result = new Array();

      var as = a.map( function(x) { return x.toString(); });
      var bs = b.map( function(x) { return x.toString(); });

      for (var i in as)
      {
        if (bs.indexOf(as[i]) !== -1)
        {
          result.push( a[i] );
        }
      }

      return result;
    }

    var testVectors = [
      a.topRight.subtract(a.topLeft),
      a.bottomRight.subtract(a.topRight),
      b.topRight.subtract(b.topLeft),
      b.bottomRight.subtract(b.topRight),
    ];
    var ainvolvedVertices = [];
    var binvolvedVertices = [];

    /*
     * Look at each test vector (shadows)
     */
    for (var i = 0; i < 4; i++) {
      ainvolvedVertices[i] = []; // Our container for involved vertces
      binvolvedVertices[i] = []; // Our container for involved vertces
      var myProjections = [];
      var foreignProjections = [];

      for (var j = 0; j < 4; j++) {
        myProjections.push(testVectors[i].dot(a.vertex(j)));
        foreignProjections.push(testVectors[i].dot(b.vertex(j)));
      }

      // Loop through foreignProjections, and test if each point is x lt my.min AND x gt m.max
      // If it's in the range, add this vertex to a list
      for (var j in foreignProjections) {
        if (foreignProjections[j] > myProjections.min() && foreignProjections[j] < myProjections.max()) {
          binvolvedVertices[i].push(b.vertex(j));
        }
      }

      // Loop through myProjections and test if each point is x gt foreign.min and x lt foreign.max
      // If it's in the range, add the vertex to the list
      for (var j in myProjections) {
        if (myProjections[j] > foreignProjections.min() && myProjections[j] < foreignProjections.max()) {
          ainvolvedVertices[i].push(a.vertex(j));
        }
      }
    }

    // console.log( intersect_safe ( intersect_safe( involvedVertices[0], involvedVertices[1] ), intersect_safe( involvedVertices[2], involvedVertices[3] ) ) );
    ainvolvedVertices = intersect_safe(intersect_safe(ainvolvedVertices[0], ainvolvedVertices[1]), intersect_safe(ainvolvedVertices[2], ainvolvedVertices[3]));
    binvolvedVertices = intersect_safe(intersect_safe(binvolvedVertices[0], binvolvedVertices[1]), intersect_safe(binvolvedVertices[2], binvolvedVertices[3]));
    /*
     If we have two vertices from one rect and one vertex from the other, probably the single vertex is penetrating the segment
     return involvedVertices;
     */

    if (ainvolvedVertices.length === 1 && binvolvedVertices.length === 2)
    {
      return ainvolvedVertices[0];
    }
    else if (binvolvedVertices.length === 1 && ainvolvedVertices.length === 2)
    {
      return binvolvedVertices[0];
    }
    else if (ainvolvedVertices.length === 1 && binvolvedVertices.length === 1)
    {
      return ainvolvedVertices[0];
    }
    else if (ainvolvedVertices.length === 1 && binvolvedVertices.length === 0)
    {
      return ainvolvedVertices[0];
    }
    else if (ainvolvedVertices.length === 0 && binvolvedVertices.length === 1)
    {
      return binvolvedVertices[0];
    }
    else if (ainvolvedVertices.length === 0 && binvolvedVertices.length === 0)
    {
      return false;
    }
    else
    {
      console.log("Unknown collision profile");
      console.log(ainvolvedVertices);
      console.log(binvolvedVertices);
      clearInterval(timer);
    }


    return true;

  },
  updateAllCollisions: function(bodies) {
    for (var x = 0; x < bodies.length; x++) {
      var mainBody = bodies[x];

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

          console.log(this.satTest(mainBody));
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
