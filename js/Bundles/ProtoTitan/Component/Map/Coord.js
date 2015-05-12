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
  };

  wrect.ECS.Component.Map.Coord.prototype = Object.create( wrect.ECS.Component.BaseComponent.prototype );
  wrect.ECS.Component.Map.Coord.prototype.constructor = wrect.ECS.Component.Map.Coord;
  wrect.ECS.Component.Map.Coord.prototype.name = 'Coord';
}());
