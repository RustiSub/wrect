(function() {
  "use strict";

  wrect.ECS = wrect.ECS || {};
  wrect.ECS.Component = wrect.ECS.Component || {};
  wrect.ECS.Component.Map = wrect.ECS.Component.Map || {};

  var Vector3 = wrect.Physics.Vector3;

  wrect.ECS.Component.Map.Coord = function (options) {
    wrect.ECS.Component.BaseComponent.call(this);

    this.options = options || {};
    this.coord = options.coord || new Vector3(0, 0, 0);
    this.size = options.size;
    this.targetCoord = new Vector3(this.coord.x, this.coord.y, this.coord.z);

    this.updateWorldCoords();
  };

  wrect.ECS.Component.Map.Coord.prototype = Object.create( wrect.ECS.Component.BaseComponent.prototype );
  wrect.ECS.Component.Map.Coord.prototype.constructor = wrect.ECS.Component.Map.Coord;
  wrect.ECS.Component.Map.Coord.prototype.name = 'Coord';

  wrect.ECS.Component.Map.Coord.prototype.updateWorldCoords = function() {
    this.worldCoord = this.getWorldCoord(this.coord);
    this.worldTargetCoord = this.getWorldCoord(this.targetCoord);
  };

  wrect.ECS.Component.Map.Coord.prototype.getWorldCoord = function(coord) {
    var size = this.size;
    var width = (size * 1.5);
    var height = (size * 2 * (Math.sqrt(3) / 2));

    return new Vector3(
      coord.x * width,
      coord.y * height +
      (coord.x * (height/ 2)),
      5
    );
  };

  /**
   * @param moveVector
   * @returns {wrect.Physics.Vector3|wrect.Physics.Vector}
   */
  wrect.ECS.Component.Map.Coord.prototype.getDirectionVector = function(moveVector) {
    var currentCoord = this.getWorldCoord(this.coord);
    var targetCoord = this.getWorldCoord(moveVector);

    return targetCoord.subtract(currentCoord);
  };
}());
