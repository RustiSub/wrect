(function() {
  "use strict";

  wrect.ECS = wrect.ECS || {};
  wrect.ECS.Component = wrect.ECS.Component || {};
  wrect.ECS.Component.Map = wrect.ECS.Component.Map || {};

  var Vector3 = wrect.Physics.Vector3;

  wrect.ECS.Component.Map.Tile = function (options) {
    wrect.ECS.Component.BaseComponent.call(this);

    this.options = options || {};
    this.coord = options.coord || new Vector3(0, 0, 0);
  };

  wrect.ECS.Component.Map.Tile.prototype = Object.create( wrect.ECS.Component.BaseComponent.prototype );
  wrect.ECS.Component.Map.Tile.prototype.constructor = wrect.ECS.Component.Map.Tile;
  wrect.ECS.Component.Map.Tile.prototype.name = 'Tile';
}());
