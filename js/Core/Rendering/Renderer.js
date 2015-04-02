(function() {
  "use strict";

  wrect.Core = wrect.Core || {};
  wrect.Core.Rendering = wrect.Core.Rendering || {};

  wrect.Core.Rendering.Renderer = function (options) {
    this.options = options || {};

    this.options = options || {};
    this.sceneManager = options.sceneManager;
    this.axisOrientation = {
      x: 1,
      y: -1,
      z: 1
    };
    this.camera = options.camera;

    this.create();
  };

  /**
   * @param {wrect.Geometry.Dimensions} shape
   */
  wrect.Core.Rendering.Renderer.prototype.draw = function(shape) {
    return shape.draw();
  };

  wrect.Core.Rendering.Renderer.prototype.create = function () {
    console.log(('This needs to be implemented'));
  };

  wrect.Core.Rendering.Renderer.prototype.render = function() {
    console.log(('This needs to be implemented'));
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
