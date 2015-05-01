(function() {
    "use strict";

    wrect.Physics = wrect.Physics || {};

    /**
     * @class Vector3
     * @param {Number} x
     * @param {Number} y
     * @returns {Vector3}
     * @constructor
     */
    wrect.Physics.Vector3 = function(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
        return this;
    };

    var Vector3 = wrect.Physics.Vector3;

    /**
     * Calculates the distance between 2 Vector3s.
     * @param {wrect.Physics.Vector3} v
     * @returns {Number}
     */
    Vector3.prototype.distance = function (v) {
        var resultVector = this.subtract(v);
        return resultVector.len();
    };

    /**
     * subtracts vectors
     * @param {wrect.Physics.Vector3} v vector
     * @returns {wrect.Physics.Vector3} vector
     */
    Vector3.prototype.subtract = function(v) {
        return new Vector3(this.x - v.x, this.y - v.y);
    };

    /**
     * adds vectors
     * @param {wrect.Physics.Vector3} v vector
     * @returns {wrect.Physics.Vector3} vector
     */
    Vector3.prototype.add = function(v) {
        return new Vector3(this.x + v.x, this.y + v.y);
    };

    /**
    *
    * @param {Number} s
    * @returns {wrect.Physics.Vector3}
    */
    Vector3.prototype.scale = function(s) {
      return new Vector3(this.x * s, this.y * s);
    };

    /**
     * multiply vector with scalar or other vector
     * @param {Number|wrect.Physics.Vector3} v vector or number
     * @returns {Number|wrect.Physics.Vector3} result
     */
    Vector3.prototype.multiply = function(v) {
        if (typeof v === 'number') {
            return new Vector3(this.x * v, this.y * v);
        }

        return new Vector3(this.x * v.x, this.y * v.y);
    };

    /**
     * @param {Number} v
     */
    Vector3.prototype.divide = function(v) {
        if (typeof v === 'number') {
            return new Vector3(this.x / v, this.y / v);
        }
        throw new Error('only divide by scalar supported');
    };

    /**
     * @returns {Number} length of vector
     */
    Vector3.prototype.len = function() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    };

    /**
     * normalize vector to unit vector
     * @returns {wrect.Physics.Vector3} unit vector [v0, v1]
     */
    Vector3.prototype.unit = function() {
        var l = this.len();
        if(l) {
            return new Vector3(this.x / l, this.y / l);
        }
        return new Vector3(0, 0);
    };

    /**
     *
     * @param scalar
     * @returns {Number|wrect.Physics.Vector3}
     */
      Vector3.prototype.unitScalar = function(scalar) {
        return this.unit().multiply(scalar);
      };

    Vector3.prototype.cross = function(v) {
      return (this.x * v.y - this.y * v.x);
    };

  /**
   *
   * @param {Number} angle
   * @param {wrect.Physics.Vector3} vector
   * @returns {wrect.Physics.Vector3}
   */
    Vector3.prototype.rotate = function(angle, vector) {
      var x = this.x - vector.x;
      var y = this.y - vector.y;

      return new Vector3(
          vector.x + ((x * Math.cos(angle)) - (y * Math.sin(angle))),
          vector.y + ((x * Math.sin(angle)) + (y * Math.cos(angle)))
      );
    };

    /**
     * rotate vector
     * @param {Number} angle to rotate vector by, radians. can be negative
     * @returns {wrect.Physics.Vector3} rotated vector
     */
    Vector3.prototype.rotateAngle = function(angle){
      angle = window.game.getHelpers().math.normaliseRadians(angle);
      return new Vector3(this.x * Math.cos(angle)- this.y * Math.sin(angle),
          this.x * Math.sin(angle)+this.y*Math.cos(angle));
    };

    /**
     *
     * calculate vector dot product
     * @param {wrect.Physics.Vector3} v
     * @returns {Number} dot product of this vector and vector v
     */
    Vector3.prototype.dot = function(v){
        return (this.x * v.x) + (this.y * v.y);
    };

    /**
     *
     * calculate angle between vectors
     * @param {wrect.Physics.Vector3} v
     * @returns {Number} angle between this vector and v in radians
     */
    Vector3.prototype.angle=function(v){
        var perpDot = this.x * v.y - this.y * v.x;
        return Math.atan2(perpDot, this.dot(v));
    };

    /**
     * @returns {wrect.Physics.Vector3} vector with max length as specified.
     */
    Vector3.prototype.truncate = function(maxLength) {
        if (this.len() > maxLength) {
            var unitVector3 = this.unit();
            return unitVector3.multiply(maxLength);
        }
        return this;
    };

  /**
   * Get the perpendicular vector to this edge.
   * @returns {wrect.Physics.Vector3}
   */
    Vector3.prototype.perpendicular = function() {
      return new Vector3(-this.y, this.x);
    };
}());
