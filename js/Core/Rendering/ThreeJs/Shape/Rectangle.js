(function() {
  "use strict";

  wrect.Geometry.Rectangle.prototype.draw = function() {
    var geometry = new THREE.BoxGeometry(this.width, this.height, 10);
    var material = new THREE.MeshLambertMaterial({
      color: 'blue'
    });

    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(this.origin.x, this.origin.y, 0);

    return mesh;
  };
}());
