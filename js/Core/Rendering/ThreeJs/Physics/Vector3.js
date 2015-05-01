(function() {
    "use strict";

    var Vector3 = wrect.Physics.Vector3;

    /**
     * Calculates the distance between 2 Vector3s.
     * @param {wrect.Physics.Vector3} v
     * @returns {THREE.Vector3}
     */
    Vector3.prototype.toThreeVector = function () {
        return new THREE.Vector3(this.x, this.y, this.z);
    };

}());
