(function() {
  "use strict";

  wrect.ECS = wrect.ECS || {};
  wrect.ECS.System = wrect.ECS.System || {};

  var Vector = wrect.Physics.Vector;

  wrect.ECS.System.LightCaster = function (options) {
    wrect.ECS.System.BaseSystem.call(this);

    this.targetEntities = [];
    this.options = options || {};
  };

  wrect.ECS.System.LightCaster.prototype = Object.create( wrect.ECS.System.BaseSystem.prototype );
  wrect.ECS.System.LightCaster.prototype.constructor = wrect.ECS.System.LightCaster;

  wrect.ECS.System.LightCaster.prototype.name = 'LightCaster';

  wrect.ECS.System.LightCaster.prototype.checkDependencies = function(entity) {
    return entity.components.Light ? true : false;
  };

  wrect.ECS.System.LightCaster.prototype.checkTargetDependencies = function(entity) {
    return entity.components.RigidBody ? true : false;
  };

  wrect.ECS.System.LightCaster.prototype.addEntity = function(data) {
    if (this.checkDependencies(data.entity) && this.entities.indexOf(data.entity) === -1) {
      this.entities.push(data.entity);
    }

    if (this.checkTargetDependencies(data.entity) && this.targetEntities.indexOf(data.entity) === -1 && this.entities.indexOf(data.entity) === -1) {
      this.targetEntities.push(data.entity);
    }
  };

  wrect.ECS.System.LightCaster.prototype.perform = function(entity) {
    this.rayCaster = game.systems.single.RayCaster.system;
    var light = entity.components.Light;
    var center = entity.components.RigidBody.dimensions.getCenter();
    var targetPoints = [];

    //Gather RayTargets
    //All edges provide 2 ray targets
    function adjustVertex(vertex, targetCenter) {
      var distanceToCenter = vertex.subtract(targetCenter).len();
      vertex = vertex.subtract(targetCenter).unitScalar(distanceToCenter - 0.1).add(targetCenter);

      return vertex;
    }

    for (var entityIndex = 0; entityIndex < this.targetEntities.length; entityIndex++) {
      var targetEntity = this.targetEntities[entityIndex];
      var edges = targetEntity.components.RigidBody.dimensions.getVisibleEdges(center);

      var targetCenter = targetEntity.components.RigidBody.dimensions.getCenter();
      //Loop edges
      for (var edgeIndex = 0; edgeIndex < edges.length; edgeIndex++) {
        var edge = edges[edgeIndex];

        targetPoints.push(adjustVertex(edge.point1, targetCenter));
        targetPoints.push(adjustVertex(edge.point2, targetCenter));
        //targetPoints.push(edge.point1);
        //targetPoints.push(edge.point2);
      }
    }
    //The four corners of the container provide a target each

    //Draw triangles with all intersections
    this.rayCaster.rayGraphics.clear();
    this.rayCaster.rayGraphics.beginFill(0xFFFFFF, 1);
    this.rayCaster.rayGraphics.lineStyle(1, 0xFFFFFF, 1);

    for (var t = 0; t < targetPoints.length; t++) {
     var ray = this.rayCaster.castRay(center, targetPoints[t], 500, [entity]);
     this.rayCaster.drawRay(ray);
    }

    this.rayCaster.rayGraphics.endFill();
  };
}());
