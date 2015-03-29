(function() {
  "use strict";

  wrect.Core = wrect.Core || {};

  wrect.Core.Renderer = function (options) {
    this.options = options || {};
  };

  /**
   * @param {wrect.Geometry.Dimensions} shape
   */
  wrect.Core.Renderer.prototype.draw = function(shape) {
    shape.draw();
  };

  ///**
  // * @param {wrect.Geometry.Rectangle} rectangle
  // */
  //wrect.Core.Renderer.prototype.drawRectangle = function(rectangle) {};
  //
  ///**
  // * @param {wrect.Geometry.Circle} circle
  // */
  //wrect.Core.Renderer.prototype.drawCircle = function(circle) {};
  //
  ///**
  // * @param {wrect.Geometry.Polygon} polygon
  // */
  //wrect.Core.Renderer.prototype.drawPolygon = function(polygon) {};
  //
  ///**
  // * @param {wrect.Geometry.Polyhedron} polyhedron
  // */
  //wrect.Core.Renderer.prototype.drawPolyhedron = function(polyhedron) {};
}());
