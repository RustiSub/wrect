(function() {
  "use strict";

  wrect.Geometry.Hexagon.prototype.draw = function() {
    var geometry = new THREE.Geometry();

    geometry.vertices.push(new THREE.Vector3(this.origin.x, this.origin.y, 0));
    //geometry.vertices.push(new THREE.Vector3(0, 0, 0));

    for(var v = 0; v < this.vertices.length; v++) {
      var vertex = this.vertices[v];
      geometry.vertices.push(new THREE.Vector3(vertex.x, vertex.y, 0));
    }

    geometry.faces.push(new THREE.Face3(0, 1, 2));
    geometry.faces.push(new THREE.Face3(0, 2, 3));
    geometry.faces.push(new THREE.Face3(0, 3, 4));
    geometry.faces.push(new THREE.Face3(0, 4, 5));
    geometry.faces.push(new THREE.Face3(0, 5, 6));
    geometry.faces.push(new THREE.Face3(0, 6, 1));

    var material = this.options.material || new THREE.MeshLambertMaterial( { color: 0xffffff, side:THREE.DoubleSide } );
    var mesh = new THREE.Mesh(geometry, material);

    //mesh.position.set(this.origin.x, this.origin.y, this.origin.z);
    mesh.position.set(0, 0, this.origin.z);

    mesh.receiveShadow = true;
    mesh.castShadow = true;


    return mesh;
  };
}());
