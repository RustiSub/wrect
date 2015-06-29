(function() {
  "use strict";

  wrect.ECS = wrect.ECS || {};
  wrect.ECS.Component = wrect.ECS.Component || {};

  wrect.ECS.Component.Politica.ActionCollection = function (options) {
    wrect.ECS.Component.Politica.BaseComponent.Politica.call(this);

    this.options = options || {};

    this.actions = options.actions || [];
  };

  wrect.ECS.Component.Politica.ActionCollection.prototype = Object.create( wrect.ECS.Component.Politica.BaseComponent.Politica.prototype );
  wrect.ECS.Component.Politica.ActionCollection.prototype.constructor = wrect.ECS.Component.Politica.ActionCollection;
  wrect.ECS.Component.Politica.ActionCollection.prototype.name = 'ActionCollection';

  wrect.ECS.Component.Politica.ActionCollection.prototype.addAction = function(action) {
    this.actions.push(action);
  };
}());
