(function() {
  "use strict";

  wrect.ECS = wrect.ECS || {};
  wrect.ECS.Component = wrect.ECS.Component || {};
  wrect.ECS.Component.World = wrect.ECS.Component.World || {};

  wrect.ECS.Component.World.Map = function (options) {
    wrect.ECS.Component.BaseComponent.call(this);

    this.options = options || {};

    this.tiles = options.tiles || [];
  };

  wrect.ECS.Component.World.Map.prototype = Object.create( wrect.ECS.Component.BaseComponent.prototype );
  wrect.ECS.Component.World.Map.prototype.constructor = wrect.ECS.Component.World.Map;
  wrect.ECS.Component.World.Map.prototype.name = 'Map';
}());
