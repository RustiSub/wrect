(function() {
  "use strict";

  var Vector = wrect.Physics.Vector;

  wrect.Geometry.Rectangle.prototype.draw = function() {
    var geometry = new THREE.BoxGeometry(this.width, this.height, 50);
    var material = this.options.material || new THREE.MeshLambertMaterial( { color: 0xffffff } );
    var mesh = new THREE.Mesh(geometry, material);

    this.origin.x += this.width /2;
    this.origin.y += this.height /2;
    mesh.position.set(this.origin.x, this.origin.y, 0);

    mesh.receiveShadow = true;
    mesh.castShadow = true;

    return mesh;
  };
}());
