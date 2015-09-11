(function() {
  "use strict";

  var BaseComponent = require('./BaseComponent');
  
  var Dimensions = require('../../Geometry/Dimensions');
  var PhysicsBody = require('../../Physics/PhysicsBody');  
  var Vector = require('../../Physics/Vector');

  var RigidBody = function (options) {
    BaseComponent.call(this);

    options = options || {};
    this.dimensions = options.dimensions || new Dimensions();
    this.physicsBody = options.physicsBody || new PhysicsBody();
    this.move = new Vector(0, 0);

    this.frozen = options.frozen;
    this.solid = true;
  };

  RigidBody.prototype = Object.create(BaseComponent.prototype);
  RigidBody.prototype.constructor = RigidBody;
  RigidBody.prototype.name = 'RigidBody';
  
  module.exports = RigidBody;
}());
