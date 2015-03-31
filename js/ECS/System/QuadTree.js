(function () {
  "use strict";

  wrect.ECS = wrect.ECS || {};
  wrect.ECS.System = wrect.ECS.System || {};

  wrect.ECS.System.QuadTree = function (options) {
    wrect.ECS.System.BaseSystem.call(this, options);

    options = options || {};

    this.range = {
      x: 0,
      y: 0,
      width : options.width || 500,
      height: options.height || 500,
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
      debugQuadTree(game, range);
      var localTree = [];
      for (var e = 0; e < entities.length; e++) {
        var entity = entities[e];
        var vertices = entity.components.RigidBody.dimensions.getVertices();
        var speed = entity.components.RigidBody.physicsBody.v;

        var outOfRangeSpeed = true;
        //    (bounds.topRight.x + speed.x) < range.x || (bounds.bottomLeft + speed.y) < range.y
        //    ||
        //    (bounds.topLeft.x + speed.x) > range.x + range.width || (bounds.topLeft.y + speed.y) > range.y + range.width;
        if (!outOfRangeSpeed) {
          localTree.push(entity);
        }

      }
      if (localTree.length > 256) {
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
//        var color = (Math.random()*0xFFFFFF<<0);
//        game.addEntity(game._builder.createBlock('tree', range.x, range.y, range.width, range.height, color, 0.5));
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
    var selectedObject = game.getSceneManager().getScene().getObjectByName('quadTreeDebugLines');

    if (selectedObject) {
      //console.log('remove');
      game.getSceneManager().getScene().remove( selectedObject );
    }

    var material = new THREE.LineBasicMaterial({
      color: 0xFFFFFF
    });

    var geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3(range.x, range.y, 0));
    geometry.vertices.push(new THREE.Vector3(range.x + range.width, range.y, 0));
    geometry.vertices.push(new THREE.Vector3(range.x + range.width, range.y + range.height, 0));
    geometry.vertices.push(new THREE.Vector3(range.x, range.y + range.height, 0));

    var line = new THREE.Line(geometry, material);
    line.name = 'quadTreeDebugLines';

    game.getSceneManager().getScene().add(line);
  }
}());
