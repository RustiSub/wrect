(function() {
  "use strict";

  wrect.ECS = wrect.ECS || {};
  wrect.ECS.Component = wrect.ECS.Component || {};

  wrect.ECS.Component.Action = function (options) {
    wrect.ECS.Component.BaseComponent.call(this);

    this.options = options || {};

    this.marker = options.marker || new wrect.ECS.Component.Map.Marker({});

    this.initCallback = options.initCallback || {};

    this.updateTick = options.updateTick || {};
    this.countdown = this.updateTick;

    this.updateCallback = options.updateCallback || {};
    this.tickCallback = options.tickCallback || {};
    this.stopCallback = options.stopCallback  || function() {
      return true;
    };

    this.queue = [];

    this.initCallback();
  };

  wrect.ECS.Component.Action.prototype = Object.create( wrect.ECS.Component.BaseComponent.prototype );
  wrect.ECS.Component.Action.prototype.constructor = wrect.ECS.Component.Action;
  wrect.ECS.Component.Action.prototype.name = 'Action';
}());
