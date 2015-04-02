(function() {
  "use strict";

  var Vector = wrect.Physics.Vector;

  wrect.Geometry.Rectangle.prototype.draw = function() {
    //
    //var material = new THREE.LineBasicMaterial({
    //  color: 0xFFFFFF
    //});
    //
    //var geometry = new THREE.Geometry();
    //var vertices = this.getVertices();
    //geometry.vertices.push(new THREE.Vector3(0, 0, 0));
    //geometry.vertices.push(new THREE.Vector3(0 + this.width, 0, 0));
    //geometry.vertices.push(new THREE.Vector3(0 + this.width, 0 + this.height, 0));
    //geometry.vertices.push(new THREE.Vector3(0,0 + this.height, 0));
    //geometry.vertices.push(new THREE.Vector3(0, 0, 0));
    //
    ////geometry.vertices.push(new THREE.Vector3(vertices[0].x, vertices[0].y, 0));
    ////geometry.vertices.push(new THREE.Vector3(vertices[1].x, vertices[1].y, 0));
    ////geometry.vertices.push(new THREE.Vector3(vertices[2].x, vertices[2].y, 0));
    ////geometry.vertices.push(new THREE.Vector3(vertices[3].x, vertices[3].y, 0));
    ////geometry.vertices.push(new THREE.Vector3(vertices[0].x, vertices[0].y, 0));
    //
    //var lines = new THREE.Line(geometry, material);
    //lines.position.set(this.origin.x, this.origin.y, 0);
    //
    //return lines;

    var geometry = new THREE.BoxGeometry(this.width, this.height, 1);
    var material = new THREE.MeshLambertMaterial({
      color: new THREE.Color( 0xFFFFFF )
    });

    var mesh = new THREE.Mesh(geometry, material);
    this.origin.x += this.width /2;
    this.origin.y += this.height /2;
    mesh.position.set(this.origin.x, this.origin.y, 0);

    return mesh;
  };
}());
