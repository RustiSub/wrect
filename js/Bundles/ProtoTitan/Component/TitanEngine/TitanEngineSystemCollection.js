(function() {
  "use strict";

  wrect.ECS = wrect.ECS || {};
  wrect.ECS.Component = wrect.ECS.Component || {};
  wrect.ECS.Component.TitanEngine = wrect.ECS.Component.TitanEngine || {};

  wrect.ECS.Component.TitanEngine.TitanEngineSystemCollection = function (options) {
    wrect.ECS.Component.BaseComponent.call(this);

    this.options = options || {};

    this.systems = options.systems || [];
  };

  wrect.ECS.Component.TitanEngine.TitanEngineSystemCollection.prototype = Object.create( wrect.ECS.Component.BaseComponent.prototype );
  wrect.ECS.Component.TitanEngine.TitanEngineSystemCollection.prototype.constructor = wrect.ECS.Component.TitanEngine.TitanEngineSystem;
  wrect.ECS.Component.TitanEngine.TitanEngineSystemCollection.prototype.name = 'TitanEngineSystemCollection';

  wrect.ECS.Component.TitanEngine.TitanEngineSystemCollection.prototype.addSystem = function(system) {
    this.systems.push(system);
  };
}());
