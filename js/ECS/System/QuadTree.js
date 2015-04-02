(function () {
  "use strict";

  wrect.ECS = wrect.ECS || {};
  wrect.ECS.System = wrect.ECS.System || {};

  var Vector = wrect.Physics.Vector;

  wrect.ECS.System.QuadTree = function (options) {
    wrect.ECS.System.BaseSystem.call(this, options);

    this.options = options || {};

    var quadTreeSize = 500;

    this.range = {
      x: -quadTreeSize,
      y: -quadTreeSize,
      width : quadTreeSize * 2,
      height: quadTreeSize * 2,
      level: 0,
      quadLevel : 0
    };
  };

  wrect.ECS.System.QuadTree.prototype = Object.create(wrect.ECS.System.BaseSystem.prototype);
  wrect.ECS.System.QuadTree.prototype.constructor = wrect.ECS.System.QuadTree;

  wrect.ECS.System.QuadTree.prototype.name = 'QuadTree';

  wrect.ECS.System.QuadTree.prototype.checkDependencies = function (entity) {
    return entity.components.RigidBody;
  };

  wrect.ECS.System.QuadTree.prototype.run = function() {
    var game = this.options.game;

    function mapQuadTree(entities, range) {
      function checkProjectionInRange(min, projection, max) {
        return min < projection && projection < max;
      }
      function checkObjectInQuad (vertices, range) {
        var inQuad = true;

        for (var v = 0; v < vertices.length; v++) {
          var vertex = vertices[v];

          var xProjectionAxis = new Vector(Math.abs(range.x), 0);
          var xProjectedVertex = vertex.dot(xProjectionAxis.unit());
          var yProjectionAxis = new Vector(Math.abs(range.y), 0);
          var yProjectedVertex = vertex.dot(yProjectionAxis.unit());

          var xInRange = checkProjectionInRange(range.x, xProjectedVertex, range.x + range.width);
          var yInRange = checkProjectionInRange(range.y, yProjectedVertex, range.y + range.height);

          if (!xInRange || !yInRange) {
            inQuad = false;
            break;
          }
        }

        return inQuad;
      }

      //debugQuadTree(game, range);
      var localTree = [];
      for (var e = 0; e < entities.length; e++) {
        var entity = entities[e];
        var vertices = entity.components.RigidBody.dimensions.getVertices();

        if (checkObjectInQuad(vertices, range)) {
          localTree.push(entity);
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
        mapQuadTree(localTree, range1);
        mapQuadTree(localTree, range2);
        mapQuadTree(localTree, range3);
        mapQuadTree(localTree, range4);
      }
      else {
        if (localTree.length > 1) {
          var hash = function (name) {
            var hash = 0, i, chr, len;
            if (name.length == 0) return hash;
            for (i = 0, len = name.length; i < len; i++) {
              chr = name.charCodeAt(i);
              hash = ((hash << 5) - hash) + chr;
              hash |= 0; // Convert to 32bit integer
            }
            return hash;
          };

          var treeHash = '';
          for (var h = 0; h < localTree.length; h++) {
            treeHash += localTree[h].id;
          }
          var hashedBranch = hash(treeHash);
          if (game.treeHashes.indexOf(hashedBranch) === -1) {
            game.treeHashes.push(hashedBranch);
            game.completeTree.push(localTree);
          }
        }
      }
    }

    mapQuadTree(this.entities, this.range);
  };

  var debugQuadTree = function(game, range) {
    var selectedObject = game.getSceneManager().getScene().getObjectByName('quadTreeDebugLines_' + range.x + '_' + range.y);

    if (!selectedObject) {
      var material = new THREE.LineBasicMaterial({
        color: 0xFFFFFF
      });

      var geometry = new THREE.Geometry();
      geometry.vertices.push(new THREE.Vector3(range.x, range.y, 0));
      geometry.vertices.push(new THREE.Vector3(range.x + range.width, range.y, 0));
      geometry.vertices.push(new THREE.Vector3(range.x + range.width, range.y + range.height, 0));
      geometry.vertices.push(new THREE.Vector3(range.x, range.y + range.height, 0));
      geometry.vertices.push(new THREE.Vector3(range.x, range.y, 0));

      var line = new THREE.Line(geometry, material);
      line.name = 'quadTreeDebugLines_' + range.x + '_' + range.y;

      game.getSceneManager().getScene().add(line);
    }
  }
}());
