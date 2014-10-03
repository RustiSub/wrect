var CollisionManager = Class.extend({

  satTest: function(shapeA, shapeB) {
    var a = shapeA.dimensions;
    var b = shapeB.dimensions;

    function getNormalAxes(dimensions) {
      var axes = [];
// loop over the vertices
      //for (int i = 0; i < shape.vertices.length; i++) {
      var vertices = dimensions.vertices();
      for (var i = 0; i < vertices.length ; i++) {
        // get the current vertex
        var p1 = vertices[i];
        // get the next vertex
        var p2 = vertices[i + 1 == vertices.length ? 0 : i + 1];
        // subtract the two to get the edge vector
        var edge = p2.subtract(p1);
        // get either perpendicular vector
        axes[i] = edge.perpendicular().unit();
      }

      return axes;
    }

    function project(dimensions, axis) {
      axis = axis.unit();
      var vertices = dimensions.vertices(axis);
      var min = axis.dot(vertices[0]);
      var max = min;
      var projections = [];

      for (var i = 0; i < vertices.length ; i++) {
        var v = vertices[i];
        var p = axis.dot(v);
        if (p < min) {
          min = p;
        } else if (p > max) {
          max = p;
        }

        projections.push(p);
      }

      return {
        min: min,
        max: max,
        projections: projections
      };
    }

    function checkOverlap(axes, a, b) {
      var smallestOverlap = null;
      var smallestAxis = null;
      var axesOverlap = true;

      for (var i = 0; i < axes.length ; i++) {
        var axis = axes[i];
        if (axes.length === 1 && axis.x === 0 && axis.y === 0) {
          axis = b.center().subtract(a.center()).unit();
        }

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
            smallestAxis = axis;
          }
        }
      }

      return {
        hasOverlap: axesOverlap,
        overlap: smallestOverlap,
        axis: smallestAxis
      };
    }

    var axesOverlap = checkOverlap(getNormalAxes(b), a, b);

    if (axesOverlap.hasOverlap) {
      shapeA.handleCollision(shapeB, axesOverlap);
    }
  },
  updateAllCollisions: function() {
    for (var t = 0; t < game.completeTree.length; t++) {
      var bodies = game.completeTree[t];

      for (var x = 0; x < bodies.length; x++) {
        var mainBody = bodies[x];
        mainBody.physicsBody.collided = false;
        //mainBody._physics.applyFriction(1);

        mainBody.collisions = [];

        if (mainBody.physicsBody.v.x == 0 && mainBody.physicsBody.v.y == 0) { continue;}
        for (var y = 0; y < bodies.length; y++) {
          if (x !== y) {
            var otherBody = bodies[y];

            this.satTest(mainBody, otherBody);
          }
        }
      }
    }

  }, mapQuadTree: function (bodies, range) {
    var localTree = [];
    for (var x = 0; x < bodies.length; x++) {
      var body = bodies[x];

      var bounds = body.dimensions.bounds();

      var speed = body.physicsBody.v;
      var outOfRangeSpeed = (bounds.topRight.x + speed.x) < range.x || (bounds.bottomLeft + speed.y) < range.y
        || bounds.topLeft.x + speed.x > range.x + range.width || bounds.topLeft.y + speed.y > range.y + range.width;

      if (!outOfRangeSpeed) {
        localTree.push(body);
      }
    }

    if (localTree.length > 50) {
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
        var hash = function(name) {
          var hash = 0, i, chr, len;
          if (name.length == 0) return hash;
          for (i = 0, len = name.length; i < len; i++) {
            chr = name.charCodeAt(i);
            hash = ((hash << 5) - hash) + chr;
            hash |= 0; // Convert to 32bit integer
          }
          return hash;
        };
//        var color = (Math.random()*0xFFFFFF<<0);
//        game.addEntity(game._builder.createBlock('tree', range.x, range.y, range.width, range.height, color, 0.5));
        var treeHash = '';
        for (var h = 0; h < localTree.length; h++) {
          treeHash += localTree[h].name;
        }
        var hashedBranch = hash(treeHash);
        if (game.treeHashes.indexOf(hashedBranch) === -1) {
          game.treeHashes.push(hashedBranch);
          game.completeTree.push(localTree);
        }
      }
    }
  }
});
