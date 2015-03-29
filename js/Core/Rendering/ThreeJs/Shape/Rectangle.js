(function() {
  "use strict";

  wrect.Geometry.Rectangle.prototype.draw = function() {
    var geometry = new THREE.BoxGeometry(this.width, this.height, 1);
    var material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );

    return new THREE.Mesh( geometry, material );
  };
}());
