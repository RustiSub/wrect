(function() {
  "use strict";

  var wrect = window.wrect;
  wrect.ECS = wrect.ECS || {};
  wrect.ECS.Component = wrect.ECS.Component || {};

  wrect.ECS.Component.TileBody = function (options) {
    wrect.ECS.Component.BaseComponent.call(this);
    options = options || {};
    this.dimensions = options.dimensions || new wrect.Geometry.Dimensions();
    this.physicsBody = options.physicsBody || new wrect.Physics.PhysicsBody();
  };

  wrect.ECS.Component.TileBody.prototype = Object.create(wrect.ECS.Component.BaseComponent.prototype);
  wrect.ECS.Component.TileBody.prototype.frozen = true;
  wrect.ECS.Component.TileBody.prototype.constructor = wrect.ECS.Component.TileBody;
  wrect.ECS.Component.TileBody.prototype.name = 'TileBody';
}());
