(function () {
  "use strict";

  wrect.ECS = wrect.ECS || {};
  wrect.ECS.System = wrect.ECS.System || {};

  wrect.ECS.System.Collision = function (options) {
    wrect.ECS.System.BaseSystem.call(this, options);

    this.completeTree = [];
  };

  wrect.ECS.System.Collision.prototype = Object.create(wrect.ECS.System.BaseSystem.prototype);
  wrect.ECS.System.Collision.prototype.constructor = wrect.ECS.System.Collision;

  wrect.ECS.System.Collision.prototype.name = 'Collision';

  wrect.ECS.System.Collision.prototype.checkDependencies = function () {
    return false;
  };

  wrect.ECS.System.Collision.prototype.satTest = function(shapeA, shapeB) {
    var a = shapeA.components.RigidBody.dimensions;
    var b = shapeB.components.RigidBody.dimensions;

    function getNormalAxes(dimensions) {
      var axes = [];
// loop over the vertices
      //for (int i = 0; i < shape.vertices.length; i++) {
      var vertices = dimensions.getCollisionVertices();
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
      var vertices = dimensions.getCollisionVertices(axis);
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
          axis = b.getCenter().subtract(a.getCenter()).unit();
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

    function handleCollision(shapeA, shapeB, axesOverlap) {

      if (!shapeB.components.RigidBody.solid || !shapeA.components.RigidBody.solid) {
        return;
      }

      var v = shapeA.components.RigidBody.physicsBody.v;//.unit();

      var n = axesOverlap.axis;//.unit();
      var vn = v.dot(n);
      var u = n.multiply(vn);
      var w = v.subtract(u);
      var v2 = w.subtract(u);


      var sign = vn ? vn < 0 ? -1 : 1:0;
      var pushOutVector = n.unit().multiply(axesOverlap.overlap * -sign);

      shapeA.components.RigidBody.dimensions.move(pushOutVector);

      if (shapeB.components.BaseMaterial) {
        var data = {
          material: shapeB.components.BaseMaterial,
          entity: shapeB,
          otherEntity: shapeA,
          force: v2,
          surface: n.perpendicular()
        };
        game.getEventManager().trigger('physics.collide.trigger', data);
        game.getEventManager().trigger('physics.collide.absorb', data);
        v2 = data.force;
      }

      if (!shapeB.components.RigidBody.frozen) {
//      collisionShape.physicsBody.v = collisionShape.physicsBody.v.add(v.multiply(energyTransfer));
//      v2 = v2.multiply(energyTransfer);
      }

      shapeA.components.RigidBody.physicsBody.f = shapeA.components.RigidBody.physicsBody.f.subtract(shapeA.components.RigidBody.physicsBody.v);
      shapeA.components.RigidBody.physicsBody.f = shapeA.components.RigidBody.physicsBody.f.add(v2);

    }

    var axesOverlap = checkOverlap(getNormalAxes(b), a, b);

    if (axesOverlap.hasOverlap) {
      handleCollision(shapeA, shapeB, axesOverlap);
    }
  };

  wrect.ECS.System.Collision.prototype.run = function() {
    for (var t = 0; t < this.completeTree.length; t++) {
      var branch = this.completeTree[t];

      for (var x = 0; x < branch.length; x++) {
        var mainEntity = branch[x];

        if (mainEntity.components.RigidBody.physicsBody.v.x == 0 && mainEntity.components.RigidBody.physicsBody.v.y == 0) {
          continue;
        }

        for (var y = 0; y < branch.length; y++) {
          if (x !== y) {
            var otherEntity = branch[y];

            this.satTest(mainEntity, otherEntity);
          }
        }
      }
    }
  }
}());
