(function() {
  "use strict";

  wrect.ECS = wrect.ECS || {};
  wrect.ECS.Component = wrect.ECS.Component || {};

  wrect.ECS.Component.ActionCollection = function (options) {
    wrect.ECS.Component.BaseComponent.call(this);

    this.options = options || {};

    this.actions = options.actions || [];
  };

  wrect.ECS.Component.ActionCollection.prototype = Object.create( wrect.ECS.Component.BaseComponent.prototype );
  wrect.ECS.Component.ActionCollection.prototype.constructor = wrect.ECS.Component.ActionCollection;
  wrect.ECS.Component.ActionCollection.prototype.name = 'ActionCollection';

  wrect.ECS.Component.ActionCollection.prototype.addAction = function(action) {
    this.actions.push(action);
  };
}());
