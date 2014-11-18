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
      vertex = vertex.subtract(targetCenter).unitScalar(distanceToCenter - 0.001).add(targetCenter);

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
      }
    }

    //Draw triangles with all intersections
    var rayGraphics = this.rayCaster.rayGraphics;

    //The four corners of the container provide a target each
    //targetPoints.push(new Vector(0, 0));
    //targetPoints.push(new Vector(1000, 0));
    //targetPoints.push(new Vector(1000, 500));
    //targetPoints.push(new Vector(0, 500));

    //Sort target points by angle
    targetPoints.sort(function(a, b) {
      var aP = center.angle(a);
      var bP = center.angle(b);
      if (aP < bP)
        return -1;
      if (aP > bP)
        return 1;
      return 0;
    });

    var drawPoints = [];

    rayGraphics.clear();
    rayGraphics.beginFill(0xFFFFFF, 1);
    rayGraphics.lineStyle(1, 0xFFFFFF, 1);
    rayGraphics.moveTo(center.x, center.y);

    //targetPoints.reverse();

    var rays = [];

    var entityEdges = {};

    for (var t = 0; t < targetPoints.length; t++) {
      var castRay = this.rayCaster.castRay(center, targetPoints[t], 500, [entity]);
      //console.log(castRay);debugger;
      for (var cri = 0; cri < castRay.intersections.length; cri++) {
        var intersection = castRay.intersections[cri];
        if (!entityEdges[intersection.entity.id]) {
          entityEdges[intersection.entity.id] = {
            intersections: []
          };
        }

        entityEdges[intersection.entity.id].intersections.push(intersection.point);
      }
    }
    console.log(entityEdges);
    debugger;
    for (var entityIndex in entityEdges) {
      var entityEdgeIntersections = entityEdges[entityIndex].intersections;
      var openSegment = false;
      //console.log(entityIndex);
      for (var i = 0; i < entityEdgeIntersections.length; i++) {
        rayGraphics.drawCircle(entityEdgeIntersections[i].x, entityEdgeIntersections[i].y, 5 * (i + 1));
        //console.log(entityEdgeIntersections[i]);
        //if (!openSegment) {
        //  rayGraphics.lineTo(entityEdgeIntersections[i].x, entityEdgeIntersections[i].y);
        //  openSegment = true;
        //} else {
        //  rayGraphics.lineTo(entityEdgeIntersections[i].x, entityEdgeIntersections[i].y);
        //  rayGraphics.lineTo(center.x, center.y);
        //  rayGraphics.endFill();
        //  rayGraphics.beginFill(0xFFFFFF, 1);
        //  //rayGraphics.lineStyle(1, 0xFFFFFF, 1);
        //  openSegment = false;
        //}
      }
    }
//debugger;
    rayGraphics.endFill();
  };

  wrect.ECS.System.LightCaster.prototype.drawArea = function(ray) {

  };
}());
