(function() {
  "use strict";

  wrect.ECS = wrect.ECS || {};
  wrect.ECS.Assemblage = wrect.ECS.Assemblage || {};

  wrect.ECS.Assemblage.PhysicsEngine = function (options) {
    this.options = options || {};
    this.game = options.game;

    this.timeStepSystem = new wrect.ECS.System.TimeStep({game: this.game});

    this.systems = {
      Gravity: {
        system: new wrect.ECS.System.Gravity({game: this.game})
      },
      QuadTree: {
        system: new wrect.ECS.System.QuadTree({game: this.game})
      },
      Collision: {
        system: new wrect.ECS.System.Collision({game: this.game})
      },
      Physics: {
        system: new wrect.ECS.System.Physics({game: this.game})
      }
    };
  };

  wrect.ECS.Assemblage.PhysicsEngine.prototype.run = function() {
    this.timeStepSystem.run();

    for (var steps = 0; steps < 1; steps++) {//this.timeStepSystem.timeSteps; steps++) {
      for (var s in this.systems) if (this.systems.hasOwnProperty(s)) {
        var system = this.systems[s].system;
        system.run();
      }
    }
  };
}());
