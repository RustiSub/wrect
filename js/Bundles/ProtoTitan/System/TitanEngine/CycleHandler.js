(function() {
  "use strict";

  wrect.ECS = wrect.ECS || {};
  wrect.ECS.System = wrect.ECS.System || {};
  wrect.ECS.System.TitanEngine = wrect.ECS.System.TitanEngine || {};

  var Vector = wrect.Physics.Vector;

  wrect.ECS.System.TitanEngine.CycleHandler = function (options) {
    wrect.ECS.System.BaseSystem.call(this, options);

    this.options = options || {};

    var self = this;

    this.cooledDown = true;
    this.cooldownTimer = new wrect.Core.Timer({
      eventManager: this.options.eventManager,
      gameTime: this.options.game.gameTime,
      time: 1000,
      callback: function() {
        self.cooledDown = true;
        console.log('Cycle cooldown complete');
      },
      once: false
    });

    this.cooldownTimer.stop();
  };

  wrect.ECS.System.TitanEngine.CycleHandler.prototype = Object.create( wrect.ECS.System.BaseSystem.prototype );
  wrect.ECS.System.TitanEngine.CycleHandler.prototype.constructor = wrect.ECS.System.TitanEngine.CycleHandler;

  wrect.ECS.System.TitanEngine.CycleHandler.prototype.name = 'CycleHandler';

  wrect.ECS.System.TitanEngine.CycleHandler.prototype.checkDependencies = function(entity) {
    var TitanEngineSystems = wrect.Bundles.ProtoTitan.TitanEngine.Constants.Systems;

    for(var systemIndex in TitanEngineSystems) if (TitanEngineSystems.hasOwnProperty(systemIndex)) {
      if (entity.components[systemIndex]) {
        return true;
      }
    }

    return false;
  };

  wrect.ECS.System.TitanEngine.CycleHandler.prototype.perform = function(entity) {
    if (!this.cooledDown) {
      return;
    }
    console.log('Start Cycle ...');
    var TitanEngineSystems = wrect.Bundles.ProtoTitan.TitanEngine.Constants.Systems;

    for(var systemIndex in TitanEngineSystems) if (TitanEngineSystems.hasOwnProperty(systemIndex)) {
      var system = TitanEngineSystems[systemIndex];
      if (entity.components[system]) {
        this.handleSystem(entity.components[system]);
      }
    }

    console.log('Cycle complete ...');
    console.log('Start Cycle cooldown ...');
    this.cooledDown = false;
    this.cooldownTimer.start();
  };

  wrect.ECS.System.TitanEngine.CycleHandler.prototype.handleSystem = function(system) {
console.log('Handle System :', system);
  };

  wrect.ECS.System.TitanEngine.CycleHandler.prototype.handleStep = function() {

  };

  wrect.ECS.System.TitanEngine.CycleHandler.prototype.handleAction = function() {

  };
}());
