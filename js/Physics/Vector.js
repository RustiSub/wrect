(function() {
    "use strict";

    /**
     * Vector constructor
     * @param {Number} x
     * @param {Number} y
     * @returns {Vector}
     * @constructor
     */
    window.Vector = function(x, y) {
        this.x = x;
        this.y = y;
        return this;
    };

    var Vector = window.Vector;

    /**
     * Calculates the distance between 2 vectors.
     * @param {Vector} v
     * @returns {Number}
     */
    Vector.prototype.distance = function (v) {
        var resultVector = this.substract(v);
        return resultVector.len();
    };

    /**
     * subtracts vectors
     * @param {Vector} v vector
     * @returns {Vector} vector
     */
    Vector.prototype.subtract = function(v) {
        return new Vector(this.x - v.x, this.y - v.y);
    };

    /**
     * adds vectors
     * @param {Vector} v vector
     * @returns {Vector} vector
     */
    Vector.prototype.add = function(v) {
        return new Vector(this.x + v.x, this.y + v.y);
    };

    /**
    *
    * @param {Number} s
    * @returns {Vector}
    */
    Vector.prototype.scale = function(s) {
      return new Vector(this.x * s, this.y * s);
    };

    /**
     * multiply vector with scalar or other vector
     * @param {Number|Vector} v vector or number
     * @returns {Number|Vector} result
     */
    Vector.prototype.multiply = function(v) {
        if (typeof v === 'number') {
            return new Vector(this.x * v, this.y * v);
        }

        return new Vector(this.x * v.x, this.y * v.y);
    };

    /**
     * @param {Number} v
     */
    Vector.prototype.divide = function(v) {
        if (typeof v === 'number') {
            return new Vector(this.x / v, this.y / v);
        }
        throw new Error('only divide by scalar supported');
    };

    /**
     * @returns {Number} length of vector
     */
    Vector.prototype.len = function() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    };

    /**
     * normalize vector to unit vector
     * @returns {Vector} unit vector [v0, v1]
     */
    Vector.prototype.unit = function() {
        var l = this.len();
        if(l) {
            return new Vector(this.x / l, this.y / l);
        }
        return new Vector(0, 0);
    };

  Vector.prototype.cross = function(v) {
    return (this.x * v.y - this.y * v.x);
  };

  /**
   *
   * @param {Number} angle
   * @param {Vector} vector
   * @returns {Vector}
   */
    Vector.prototype.rotate = function(angle, vector) {
      var x = this.x - vector.x;
      var y = this.y - vector.y;

      var x_prime = vector.x + ((x * Math.cos(angle)) - (y * Math.sin(angle)));
      var y_prime = vector.y + ((x * Math.sin(angle)) + (y * Math.cos(angle)));

      return new Vector(x_prime, y_prime);
    };

    /**
     *
     * calculate vector dot product
     * @param {Vector} v
     * @returns {Number} dot product of this vector and vector v
     */
    Vector.prototype.dot = function(v){
        return (this.x * v.x) + (this.y * v.y);
    };

    /**
     *
     * calculate angle between vectors
     * @param {Vector} v
     * @returns {Number} angle between this vector and v in radians
     */
    Vector.prototype.angle=function(v){
        var perpDot = this.x * v.y - this.y * v.x;
        return Math.atan2(perpDot, this.dot(v));
    };

    /**
     * @returns {Vector} vector with max length as specified.
     */
    Vector.prototype.truncate = function(maxLength) {
        if (this.len() > maxLength) {
            var unitVector = this.unit();
            return unitVector.multiply(maxLength);
        }
        return this;
    };

  /**
   * Get the perpendicular vector to this edge.
   * @param vector
   * @returns {Vector}
   */
    Vector.prototype.perpendicular = function() {
      return new Vector(-this.y, this.x);
    };
}());
