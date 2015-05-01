(function() {
  "use strict";

  var Vector = wrect.Physics.Vector;

  wrect.Geometry.Rectangle.prototype.draw = function() {
    var geometry = new THREE.BoxGeometry(this.dimension.x, this.dimension.y, this.dimension.z);
    var material = this.options.material || new THREE.MeshLambertMaterial( { color: 0xffffff } );
    var mesh = new THREE.Mesh(geometry, material);

    this.origin.x += this.dimension.x /2;
    this.origin.y += this.dimension.y /2;

    mesh.position.set(this.origin.x, this.origin.y, this.origin.z);

    mesh.receiveShadow = true;
    mesh.castShadow = true;


    return mesh;
  };
}());
