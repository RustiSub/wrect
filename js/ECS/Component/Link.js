(function() {
  "use strict";

  wrect.ECS = wrect.ECS || {};
  wrect.ECS.Component = wrect.ECS.Component || {};

  wrect.ECS.Component.Link = function (options) {
    wrect.ECS.Component.BaseComponent.call(this);

    this.options = options || {};

    this.linkedEntity = this.options.linkedEntity;
    this.joint = this.options.joint || new wrect.Physics.Vector(0, 0);
  };

  wrect.ECS.Component.Link.prototype = Object.create( wrect.ECS.Component.BaseComponent.prototype );
  wrect.ECS.Component.Link.prototype.constructor = wrect.ECS.Component.Link;
  wrect.ECS.Component.Link.prototype.name = 'Link';
}());
