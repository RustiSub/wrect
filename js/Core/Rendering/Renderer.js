(function() {
  "use strict";

  var Renderer = function (options) {
    this.options = options || {};
    this.options.width = this.options.width || 1280;
    this.options.height = this.options.height || 720;
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
   * @param {Dimensions} shape
   */
  Renderer.prototype.draw = function(shape) {
    //console.log(shape);
    //console.log(shape.draw());
    //debugger;
    return shape.draw();
  };

  Renderer.prototype.create = function () {
    console.log(('Create needs to be implemented'));
  };
  
  Renderer.prototype.render = function() {
    console.log(('Render needs to be implemented'));
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

  module.exports = Renderer;
}());
