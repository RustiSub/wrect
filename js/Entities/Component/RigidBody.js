(function() {
  "use strict";

  wrect.Entities = wrect.Entities || {};
  wrect.Entities.Component = wrect.Entities.Component || {};

  /**
   *
   * @class wrect.Entities.Component.RigidBody
   * @constructor
   */
  wrect.Entities.Component.RigidBody = function (options) {
    options = options || {};

    this.dimensions = options.dimensions || new wrect.Geometry.Dimensions();
    this.physicsBody = options.physicsBody || new wrect.Physics.PhysicsBody();
  };
}());
