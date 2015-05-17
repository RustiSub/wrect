(function() {
  "use strict";

  wrect.ECS = wrect.ECS || {};
  wrect.ECS.System = wrect.ECS.System || {};

  var Vector3 = wrect.Physics.Vector3;

  wrect.ECS.System.Map.GridMover = function (options) {
    wrect.ECS.System.BaseSystem.call(this, options);

    this.options = options || {};

  };

  wrect.ECS.System.Map.GridMover.prototype = Object.create( wrect.ECS.System.BaseSystem.prototype );
  wrect.ECS.System.Map.GridMover.prototype.constructor = wrect.ECS.System.Map.GridMover;

  wrect.ECS.System.Map.GridMover.prototype.name = 'GridMover';

  wrect.ECS.System.Map.GridMover.prototype.checkDependencies = function(entity) {
    return entity.components.Coord && entity.components.Visual ? true : false;
  };

  wrect.ECS.System.Map.GridMover.prototype.perform = function(entity) {
    var coord = entity.components.Coord;

    if ((coord.targetCoord.x !== coord.coord.x) || (coord.targetCoord.y !== coord.coord.y) || (coord.targetCoord.z !== coord.coord.z)) {
      var worldCoord = coord.getWorldCoord(coord.targetCoord);

      var visual = entity.components.Visual;
      visual.setPosition(worldCoord.x, worldCoord.y, visual.graphics.position.z);
      coord.coord.x = coord.targetCoord.x;
      coord.coord.y = coord.targetCoord.y;
      coord.coord.z = coord.targetCoord.z;
    }
  };
}());
