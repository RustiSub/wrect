(function() {
  "use strict";

  wrect.ECS = wrect.ECS || {};
  wrect.ECS.Component = wrect.ECS.Component || {};
  wrect.ECS.Component.Map = wrect.ECS.Component.Map || {};

  var Vector3 = wrect.Physics.Vector3;

  wrect.ECS.Component.Map.Grid = function (options) {
    wrect.ECS.Component.BaseComponent.call(this);

    this.options = options || {};

    this.tileSize = options.tileSize;
    this.tiles = options.tiles || [];
  };

  wrect.ECS.Component.Map.Grid.prototype = Object.create( wrect.ECS.Component.BaseComponent.prototype );
  wrect.ECS.Component.Map.Grid.prototype.constructor = wrect.ECS.Component.Map.Grid;
  wrect.ECS.Component.Map.Grid.prototype.name = 'Grid';

  /**
   * @param {Vector3} coord
   * @returns {wrect.Physics.Vector3}
   */
  wrect.ECS.Component.Map.Grid.prototype.getTileCoord = function(coord, tileSize) {
    var size = tileSize || this.tileSize;
    var width = (size * 1.5);
    var height = (size * 2 * (Math.sqrt(3) / 2));
    return new Vector3(
      coord.x * width,
      coord.y * height +
      (coord.x * (height/ 2)),
      5
    );
  };
}());
