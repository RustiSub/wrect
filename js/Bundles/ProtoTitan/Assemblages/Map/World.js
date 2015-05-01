(function() {
  "use strict";

  wrect.ECS = wrect.ECS || {};
  wrect.ECS.Assemblage = wrect.ECS.Assemblage || {};
  wrect.Bundles.ProtoTitan.World = wrect.Bundles.ProtoTitan.World || {};

  var Entity = wrect.ECS.Entity;

  var World = wrect.Bundles.ProtoTitan.World;

  World.Constants = World.Constants || {};
  World.Constants = {
  };

  /**
   * @param options
   * @returns {wrect.ECS.Entity|wrect.ECS.Entity}
   * @constructor
   */
  wrect.ECS.Assemblage.World = function (options) {
    this.entity = new Entity({eventManager: options.eventManager});


  };
}());
