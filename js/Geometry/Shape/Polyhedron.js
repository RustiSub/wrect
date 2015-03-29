(function() {
  "use strict";

  var Vector = wrect.Physics.Vector3D;

  /**
   *
   * @class wrect.Geometry.Polyhedron
   * @constructor
   */
  wrect.Geometry.Polyhedron = function (options) {
    wrect.Geometry.Dimensions.call(this);

    this.vertices = options.vertices || [];
    this.origin = options.origin || new Vector(0, 0);
    this.offsetVertices = [];

    var vertices = [
      1, 1, 1, -1, -1, 1, -1, 1, -1, 1, -1, -1
    ];
    var indices = [
      2, 1, 0, 0, 3, 2, 1, 3, 0, 2, 3, 1
    ];
    this.geometry = new THREE.PolyhedronGeometry(vertices, indices, 6, 2);
    this.material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
  };

  wrect.Geometry.Polyhedron.prototype = Object.create( wrect.Geometry.Dimensions.prototype );
  wrect.Geometry.Polyhedron.prototype.constructor = wrect.Geometry.Polyhedron;

  wrect.Geometry.Polyhedron.prototype.getBounds = function() {
    return {
      topLeft: this.vertices[0],
      topRight: this.vertices[1],
      bottomRight: this.vertices[2],
      bottomLeft: this.vertices[3]
    };
  };

  wrect.Geometry.Polyhedron.prototype.getCollisionVertices = function() {
    return this.vertices;
  };

  wrect.Geometry.Polyhedron.prototype.draw = function() {
    this.graphics = new THREE.Mesh( this.geometry, this.material );

    //console.log(graphics);
    //debugger;
    //
    //graphics = new THREE.Mesh( geometry, material );
    //
    //console.log(graphics);
    //debugger;

    //graphics.clear();
    //
    //graphics.beginFill(options.color || 0x000000, options.alpha);
    //graphics.moveTo(this.vertices[0].x, this.vertices[0].y);
    //
    //for(var v = 0; v < this.vertices.length; v++) {
    //  var vertex = this.vertices[v];
    //  graphics.lineTo(vertex.x, vertex.y);
    //}
    //
    //graphics.moveTo(this.vertices[0].x, this.vertices[0].y);
    //
    //graphics.endFill();
  };
}());
