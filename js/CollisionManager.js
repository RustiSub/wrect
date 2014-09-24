var CollisionManager = Class.extend({

  satTest: function(shapeA, shapeB) {
    var a = shapeA.dimensions;
    var b = shapeB.dimensions;

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

    function getNormalAxes(dimensions) {
      var axes = [];
// loop over the vertices
      //for (int i = 0; i < shape.vertices.length; i++) {
      var vertices = dimensions.vertices(dimensions);
      for (var i = 0; i < vertices.length ; i++) {

        // get the current vertex
        var p1 = vertices[i];
        // get the next vertex
        var p2 = vertices[i + 1 == vertices.length ? 0 : i + 1];
        // subtract the two to get the edge vector
        var edge = p2.subtract(p1);
        // get either perpendicular vector
        axes[i] = edge.perpendicular();
      }

      return axes;
    }

    function project(dimensions, axis) {
      axis = axis.unit();
      var vertices = dimensions.vertices(dimensions);
      var min = axis.dot(vertices[0]);
      var max = min;

      for (var i = 1; i < vertices.length ; i++) {
        var v = vertices[i];
        var p = axis.dot(v);
        if (p < min) {
          min = p;
        } else if (p > max) {
          max = p;
        }
      }

      return {min: min, max: max};
    }

    function checkOverlap(axes, a, b) {
      var smallestOverlap = null;
      var smallestAxis = null;

      var axesOverlap = true;
      for (var i = 0; i < axes.length ; i++) {
        var axis = axes[i];
        // project both shapes onto the axis
        var p1 = project(a, axis);
        var p2 = project(b, axis);

        if (p1.max < p2.min || p1.min > p2.max){
          axesOverlap = false;
          break;
        } else {
          var overlapP1 = p1.min < p2.min ? p2.min : p1.min;
          var overlapP2 = p1.max < p2.max ? p1.max : p2.max;
          var overlap = overlapP2 - overlapP1;
          if (smallestOverlap == null || overlap < smallestOverlap) {
            smallestOverlap = overlap;
            smallestAxis = axis
          }
        }
      }

      return {
        hasOverlap: axesOverlap,
        overlap: smallestOverlap,
        axis: smallestAxis
      };
    }

    var axes1Overlap = checkOverlap(getNormalAxes(a), a, b);
    var axes2Overlap = checkOverlap(getNormalAxes(b), a, b);

    if (axes1Overlap.hasOverlap && axes2Overlap.hasOverlap) {
//      var axes1Overlap = checkOverlap(getNormalAxes(a), a, b);
//      var axes2Overlap = checkOverlap(getNormalAxes(b), a, b);
//      console.log(axes1Overlap, axes2Overlap);
      var center = shapeA._physics.center(shapeA.dimensions);
      var N = center.subtract(axes1Overlap.axis); //.rotate(Math.PI , new V(0,0));
      N = N.scale( 1 / N.len());
      var Vr = shapeA.physicsBody.v;
      var I =  N.scale( -1 * (1 + 0.3) * Vr.dot(N) );
      shapeA.physicsBody.v = I;
      //shapeA.physicsBody.omega = -1 * 0.2 * (shapeA.physicsBody.omega / Math.abs(shapeA.physicsBody.omega)) * center.subtract(axes1Overlap.axis).cross(Vr);
    }
  },
  updateAllCollisions: function() {
    for (var t = 0; t < game.completeTree.length; t++) {
      var bodies = game.completeTree[t];

      for (var x = 0; x < bodies.length; x++) {
        var mainBody = bodies[x];
        //mainBody._physics.applyFriction(1);

        mainBody.collisions = [];

        if (mainBody.physicsBody.v.x == 0) { continue;}
        for (var y = 0; y < bodies.length; y++) {
          if (x !== y) {
            var otherBody = bodies[y];

            this.satTest(mainBody, otherBody);
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
