(function() {
  "use strict";

  var PhysicsEngine = function (options) {
    this.options = options || {};
    this.game = options.game;

    var TimeStep = require('../System/TimeStep');
    var Gravity = require('../System/Gravity');
    var QuadTree = require('../System/QuadTree');
    var Collision = require('../System/Collision');
    var Physics = require('../System/Physics');

    this.timeStepSystem = new TimeStep({game: this.game});


    this.systems = {
      Gravity: {
        system: new Gravity({game: this.game})
      },
      QuadTree: {
        system: new QuadTree({game: this.game})
      },
      Collision: {
        system: new Collision({game: this.game})
      },
      Physics: {
        system: new Physics({game: this.game})
      }
    };
  };

  PhysicsEngine.prototype.run = function() {
    this.timeStepSystem.run();

    for (var steps = 0; steps < 1; steps++) {//this.timeStepSystem.timeSteps; steps++) {
      for (var s in this.systems) if (this.systems.hasOwnProperty(s)) {
        var system = this.systems[s].system;
        system.run();
      }
    }
  };

  module.exports = PhysicsEngine;
}());
