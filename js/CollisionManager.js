var CollisionManager = Class.extend({

  satTest: function(a, b) {
    function intersect_safe(a, b) {
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
      b.bottomRight.subtract(b.topRight)
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
        var min = Math.min.apply(null, myProjections);
        var max = Math.max.apply(null, myProjections);
        if (foreignProjections[j] < min && foreignProjections[j] > max) {
          binvolvedVertices[i].push(b.vertex(j));
        }
      }

      // Loop through myProjections and test if each point is x gt foreign.min and x lt foreign.max
      // If it's in the range, add the vertex to the list
      for (var j in myProjections) {
        var min = Math.min.apply(null, foreignProjections);
        var max = Math.max.apply(null, foreignProjections);
        if (myProjections[j] > min && myProjections[j] < max) {
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
    for (var t = 0; t < game.completeTree.length; t++) {
      var bodies = game.completeTree[t];

      for (var x = 0; x < bodies.length; x++) {
        var mainBody = bodies[x];
        //mainBody._physics.applyFriction(1);

        mainBody.collisions = [];

        for (var y = 0; y < bodies.length; y++) {
          if (x !== y) {
            var otherBody = bodies[y];

            console.log(this.satTest(mainBody.dimensions, otherBody.dimensions));
          }
        }
//        for (var x = 0; x < bodies.length; x++) {
//          var body = bodies[x];
//          for (var c = 0; c < body.collisions.length; c++) {
//            var collision = body.collisions[c];
//            body._physics.applyCollision(collision);
//            //body._physics.applyGravity(collision);
//          }
//        }
      }
    }

  }, mapQuadTree: function (bodies, range) {
    var localTree = [];
    for (var x = 0; x < bodies.length; x++) {
      var body = bodies[x];

      var outOfRange = (body.dimensions.topLeft.x + body.dimensions.width) < range.x || (body.dimensions.topLeft.y + body.size.y) < range.y
        || body.dimensions.topLeft.x > range.x + range.width || body.dimensions.topLeft.y > range.y + range.width;

//      var outOfRangeSpeed = (body.dimensions.topLeft.x + body.dimensions.width + body._physics.xSpeed) < range.x || (body.dimensions.topLeft.y + body.size.y + body._physics.ySpeed) < range.y
//        || body.dimensions.topLeft.x + body._physics.xSpeed > range.x + range.width || body.dimensions.topLeft.y + body._physics.ySpeed > range.y + range.width;

      if (!outOfRange) {
        localTree.push(body);
      }
    }

    if (localTree.length > 2) {
      var quadWidth = range.width / 2;
      var quadHeight = range.height / 2;
      var range1 = {
        x: range.x,
        y: range.y,
        width: quadWidth,
        height: quadHeight,
        level: range.level + 1,
        quadLevel: 1
      };
      var range2 = {
        x: range.x + quadWidth,
        y: range.y,
        width: quadWidth,
        height: quadHeight,
        level: range.level + 1,
        quadLevel: 2
      };
      var range3 = {
        x: range.x,
        y: range.y + quadHeight,
        width: quadWidth,
        height: quadHeight,
        level: range.level + 1,
        quadLevel: 3
      };
      var range4 = {
        x: range.x + quadWidth,
        y: range.y + quadHeight,
        width: quadWidth,
        height: quadHeight,
        level: range.level + 1,
        quadLevel: 4
      };
      this.mapQuadTree(localTree, range1);
      this.mapQuadTree(localTree, range2);
      this.mapQuadTree(localTree, range3);
      this.mapQuadTree(localTree, range4);
    }
    else {
      if (localTree.length > 1) {
        //var color = (Math.random()*0xFFFFFF<<0);
        //game.addEntity(game._builder.createBlock('tree', range.x, range.y, range.width, range.height, color, 0.5));
        game.completeTree.push(localTree);
      }
    }
  }
});
