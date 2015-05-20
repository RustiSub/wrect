(function() {
  "use strict";

  wrect.ECS = wrect.ECS || {};
  wrect.ECS.Component = wrect.ECS.Component || {};
  wrect.ECS.Component.Map = wrect.ECS.Component.Map || {};

  wrect.ECS.Component.Map.Marker = function (options) {
    wrect.ECS.Component.BaseComponent.call(this);

    this.options = options || {};
    this.coord = options.coord || new wrect.ECS.Component.Map.Coord({});
  };

  wrect.ECS.Component.Map.Marker.prototype = Object.create( wrect.ECS.Component.BaseComponent.prototype );
  wrect.ECS.Component.Map.Marker.prototype.constructor = wrect.ECS.Component.Map.Marker;
  wrect.ECS.Component.Map.Marker.prototype.name = 'Marker';
}());
