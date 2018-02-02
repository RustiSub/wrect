(function() {
  "use strict";

  /**
   * @return {THREE.Mesh}
   */
  wrect.Geometry.Circle.prototype.draw = function() {
    var geometry = new THREE.CylinderGeometry(this.dimension.x, this.dimension.x, this.dimension.z); //this.dimension.x, this.dimension.x, this.dimension.y, this.dimension.z, );

    var material = this.options.material || new THREE.MeshLambertMaterial( { color: 0xffffff } );
    var mesh = new THREE.Mesh(geometry, material);

    mesh.position.set(this.origin.x, this.origin.y, this.origin.z);
    mesh.rotation.x = 90 * (Math.PI /180);

    return mesh;
  };
}());
