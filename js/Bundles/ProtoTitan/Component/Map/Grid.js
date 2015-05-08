(function() {
  "use strict";

  wrect.ECS = wrect.ECS || {};
  wrect.ECS.Component = wrect.ECS.Component || {};
  wrect.ECS.Component.Map = wrect.ECS.Component.Map || {};

  wrect.ECS.Component.Map.Grid = function (options) {
    wrect.ECS.Component.BaseComponent.call(this);

    this.options = options || {};

    this.tiles = options.tiles || [];
  };

  wrect.ECS.Component.Map.Grid.prototype = Object.create( wrect.ECS.Component.BaseComponent.prototype );
  wrect.ECS.Component.Map.Grid.prototype.constructor = wrect.ECS.Component.Map.Grid;
  wrect.ECS.Component.Map.Grid.prototype.name = 'Grid';
}());
