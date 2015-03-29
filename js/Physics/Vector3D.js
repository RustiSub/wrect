(function() {
    "use strict";

    wrect.Physics = wrect.Physics || {};

    /**
     * @class Vector3D
     * @param {Number} x
     * @param {Number} y
     * @param {Number} z
     * @returns {wrect.Physics.Vector3D}
     * @constructor
     */
    wrect.Physics.Vector3D = function(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
        return this;
    };

    var Vector3D = wrect.Physics.Vector3D;

    /**
     * Calculates the distance between 2 Vector3Ds.
     * @param {wrect.Physics.Vector3D} v
     * @returns {Number}
     */
    Vector3D.prototype.distance = function (v) {
        var resultVector3D = this.subtract(v);
        return resultVector3D.len();
    };

    /**
     * subtracts Vector3Ds
     * @param {wrect.Physics.Vector3D} v Vector3D
     * @returns {wrect.Physics.Vector3D} Vector3D
     */
    Vector3D.prototype.subtract = function(v) {
        return new Vector3D(this.x - v.x, this.y - v.y);
    };

    /**
     * adds Vector3Ds
     * @param {wrect.Physics.Vector3D} v Vector3D
     * @returns {wrect.Physics.Vector3D} Vector3D
     */
    Vector3D.prototype.add = function(v) {
        return new Vector3D(this.x + v.x, this.y + v.y);
    };

    /**
    *
    * @param {Number} s
    * @returns {wrect.Physics.Vector3D}
    */
    Vector3D.prototype.scale = function(s) {
      return new Vector3D(this.x * s, this.y * s);
    };

    /**
     * multiply Vector3D with scalar or other Vector3D
     * @param {Number|wrect.Physics.Vector3D} v Vector3D or number
     * @returns {Number|wrect.Physics.Vector3D} result
     */
    Vector3D.prototype.multiply = function(v) {
        if (typeof v === 'number') {
            return new Vector3D(this.x * v, this.y * v);
        }

        return new Vector3D(this.x * v.x, this.y * v.y);
    };

    /**
     * @param {Number} v
     */
    Vector3D.prototype.divide = function(v) {
        if (typeof v === 'number') {
            return new Vector3D(this.x / v, this.y / v);
        }
        throw new Error('only divide by scalar supported');
    };

    /**
     * @returns {Number} length of Vector3D
     */
    Vector3D.prototype.len = function() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    };

    /**
     * normalize Vector3D to unit Vector3D
     * @returns {wrect.Physics.Vector3D} unit Vector3D [v0, v1]
     */
    Vector3D.prototype.unit = function() {
        var l = this.len();
        if(l) {
            return new Vector3D(this.x / l, this.y / l);
        }
        return new Vector3D(0, 0);
    };

    /**
     *
     * @param scalar
     * @returns {Number|wrect.Physics.Vector3D}
     */
      Vector3D.prototype.unitScalar = function(scalar) {
        return this.unit().multiply(scalar);
      };

    Vector3D.prototype.cross = function(v) {
      return (this.x * v.y - this.y * v.x);
    };

  /**
   *
   * @param {Number} angle
   * @param {wrect.Physics.Vector3D} Vector3D
   * @returns {wrect.Physics.Vector3D}
   */
    Vector3D.prototype.rotate = function(angle, Vector3D) {
      var x = this.x - Vector3D.x;
      var y = this.y - Vector3D.y;

      return new Vector3D(
          Vector3D.x + ((x * Math.cos(angle)) - (y * Math.sin(angle))),
          Vector3D.y + ((x * Math.sin(angle)) + (y * Math.cos(angle)))
      );
    };

    /**
     *
     * calculate Vector3D dot product
     * @param {wrect.Physics.Vector3D} v
     * @returns {Number} dot product of this Vector3D and Vector3D v
     */
    Vector3D.prototype.dot = function(v){
      if (!v) {
        debugger;
      }
        return (this.x * v.x) + (this.y * v.y);
    };

    /**
     *
     * calculate angle between Vector3Ds
     * @param {wrect.Physics.Vector3D} v
     * @returns {Number} angle between this Vector3D and v in radians
     */
    Vector3D.prototype.angle=function(v){
        var perpDot = this.x * v.y - this.y * v.x;
        return Math.atan2(perpDot, this.dot(v));
    };

  /**
   * Get the perpendicular Vector3D to this edge.
   * @returns {wrect.Physics.Vector3D}
   */
    Vector3D.prototype.perpendicular = function() {
      return new Vector3D(-this.y, this.x);
    };
}());
