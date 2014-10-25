(function() {
  "use strict";

  wrect.ECS = wrect.ECS || {};
  wrect.ECS.System = wrect.ECS.System || {};

  wrect.ECS.System.Mover = function (options) {
    wrect.ECS.System.BaseSystem.call(this);

    this.options = options || {};
  };

  wrect.ECS.System.Mover.prototype = Object.create( wrect.ECS.System.BaseSystem.prototype );
  wrect.ECS.System.Mover.prototype.constructor = wrect.ECS.System.Mover;

  wrect.ECS.System.Mover.prototype.name = 'Visual';

  wrect.ECS.System.Mover.prototype.perform = wrect.ECS.System.perform;
  wrect.ECS.System.Mover.prototype.perform = function(entity) {
    console.log('move an entity', entity);
  }
}());
