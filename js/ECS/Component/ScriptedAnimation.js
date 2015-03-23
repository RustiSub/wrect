(function () {
  "use strict";

  wrect.ECS = wrect.ECS || {};
  wrect.ECS.Component = wrect.ECS.Component || {};

  wrect.ECS.Component.ScriptedAnimation = function (options) {
    wrect.ECS.Component.BaseComponent.call(this);

    this.options = options || {};

    this.timing = this.options.timing || {
      frequency: 100
    };

    this.state = this.states.playing;
    this.currentFrame = 0;
    this.startFrame = 0;

    this.actions = this.options.actions || {};
  };

  wrect.ECS.Component.ScriptedAnimation.prototype = Object.create(wrect.ECS.Component.BaseComponent.prototype);
  wrect.ECS.Component.ScriptedAnimation.prototype.constructor = wrect.ECS.Component.ScriptedAnimation;
  wrect.ECS.Component.ScriptedAnimation.prototype.name = 'ScriptedAnimation';

  wrect.ECS.Component.ScriptedAnimation.prototype.states = {
    stopped: 0,
    playing: 1,
    paused: 2
  };
}());
