(function() {
  "use strict";

  wrect.Geometry.Rectangle.prototype.draw = function() {
    var geometry = new THREE.BoxGeometry(this.width, this.height, 1);
    var material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );

    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(this.origin.x, this.origin.y, 0);

    return mesh;
  };
}());
