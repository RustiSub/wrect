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

    if (options.mover) {
      this.mover = options.mover || new wrect.Entities.Component.Mover();
    }
  };

  var RigidBody = wrect.Entities.Component.RigidBody;

  RigidBody.prototype.apply = function() {
    this.mover.apply(this.physicsBody);

    //var f = new Vector(0, 0);
    //var b = -5;

    var dr = this.physicsBody.v; //.scale(dt).add(physicsBody.a.scale(0.5 * dt * dt));
    this.dimensions.move(dr);//.scale(100));

    /* Add Gravity */
    //    f = f.add(new Vector(0, physicsBody.m * 9.81));

    /* Add damping */
    //    f = f.add( physicsBody.v.scale(b) );

    //var deltaTheta = 0  ;
    //this.dimensions.rotate(physicsBody, deltaTheta);
  }
}());
