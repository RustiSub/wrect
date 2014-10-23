(function() {
  "use strict";

  wrect.Entities = wrect.Entities || {};
  wrect.Entities.Component = wrect.Entities.Component || {};

  var Vector = wrect.Physics.Vector;

  /**
   *
   * @class wrect.Entities.Component.RigidBody
   * @constructor
   */
  wrect.Entities.Component.RigidBody = function (options) {
    options = options || {};

    this.game = Container.getGame();
    this.dimensions = options.dimensions || new wrect.Geometry.Dimensions();
    this.physicsBody = options.physicsBody || new wrect.Physics.PhysicsBody();

    //if (options.mover) {
    //  this.mover = options.mover || new wrect.Entities.Component.Mover();
    //}
  };

  var RigidBody = wrect.Entities.Component.RigidBody;

  /**
   * @this wrect.Entities.Component.RigidBody
   * @param data
   */
  function move(data) {
    this.physicsBody.a = this.physicsBody.a.add(data.moveVector);
  }

  RigidBody.prototype.apply = function() {
    this.physicsBody.v = new Vector(0, 0);

    this.game.getEventManager().addListener('mover.apply', move, this);

    //var f = new Vector(0, 0);
    //var b = -5;

    var dr = this.physicsBody.a; //.scale(dt).add(physicsBody.a.scale(0.5 * dt * dt));
    this.dimensions.move(dr);//.scale(100));

    /* Add Gravity */
    //    f = f.add(new Vector(0, physicsBody.m * 9.81));

    /* Add damping */
    //    f = f.add( physicsBody.v.scale(b) );

    //var deltaTheta = 0  ;
    //this.dimensions.rotate(physicsBody, deltaTheta);
  }
}());
