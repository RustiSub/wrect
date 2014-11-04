(function() {
  "use strict";

  wrect.ECS = wrect.ECS || {};
  wrect.ECS.Assemblage = wrect.ECS.Assemblage || {};

  wrect.ECS.Assemblage.PhysicsEngine = function (options) {
    this.options = options || {};

    this.timeStepSystem = new wrect.ECS.System.TimeStep();

    this.systems = {
      Gravity: {
        system: new wrect.ECS.System.Gravity()
      },
      QuadTree: {
        system: new wrect.ECS.System.QuadTree()
      },
      Collision: {
        system: new wrect.ECS.System.Collision()
      },
      Physics: {
        system: new wrect.ECS.System.Physics()
      }
    };
  };

  wrect.ECS.Assemblage.PhysicsEngine.prototype.run = function() {
    this.timeStepSystem.run();

    for (var steps = 0; steps < this.timeStepSystem.timeSteps; steps++) {
      for (var s in this.systems) {
        var system = this.systems[s].system;
        system.run();
      }
    }
  };
}());
