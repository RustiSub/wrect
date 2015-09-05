(function() {
  "use strict";

  var Vector = require('./Vector');

  /**
   *
   * @class wrect.Physics.PhysicsBody
   * @constructor
   */
  var PhysicsBody = function (options) {
    options = options || {};

    this.f = options.f || new Vector(0, 0);

    this.v = options.v || new Vector(0, 0);
    this.a = options.a || new Vector(0, 0);
    this.m =  options.m || 1;
    this.theta = options.theta || 0;
    this.omega = options.omega || 0;
    this.alpha = options.alpha || 0;

    this.J = 0;
  };

  module.exports = PhysicsBody;
}());
