(function() {
  "use strict";

  wrect.ECS = wrect.ECS || {};
  wrect.ECS.Component = wrect.ECS.Component || {};
  wrect.ECS.Component.World = wrect.ECS.Component.World || {};

  wrect.ECS.Component.World.MapHexTile = function (options) {
    wrect.ECS.Component.BaseComponent.call(this);

    this.options = options || {};

    this.shape = options.shape || new wrect.Geometry.Hexagon();
  };

  wrect.ECS.Component.World.MapHexTile.prototype = Object.create( wrect.ECS.Component.BaseComponent.prototype );
  wrect.ECS.Component.World.MapHexTile.prototype.constructor = wrect.ECS.Component.World.MapHexTile;
  wrect.ECS.Component.World.MapHexTile.prototype.name = 'MapHexTile';
}());
