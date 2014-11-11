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

    for (var t = 0; t < 4; t++) { //targetPoints.length

      var castRay = this.rayCaster.castRay(center, targetPoints[t], 500, [entity]);

      if (castRay.intersections.length === 0) {
        continue;
      }
      //console.log(targetPoints[t], targetPoints[t].angle(center));
      //console.log(targetPoints[t].angle(center), targetPoints[t].angle(center) * 180 / Math.PI);
      //rayGraphics.beginFill(0xFFFFFF, 1);
      //rayGraphics.lineStyle(t * 5 + 1, 0xFFFFFF, 1);
      //rayGraphics.moveTo(center.x, center.y);
      ////rayGraphics.moveTo(0, 0);
      //rayGraphics.lineTo(targetPoints[t].x, targetPoints[t].y);
      //rayGraphics.endFill();

      var rayPoints = [];

      castRay.intersections.sort(function(a, b) {
        var aL = center.subtract(a.point).len();
        var bL = center.subtract(b.point).len();
        if (aL < bL)
          return -1;
        if (aL > bL)
          return 1;
        return 0;
      });

      //Sort intersections from closest to farthest
      if (castRay.intersections[0].passThrough) {
        for (var i = 0; i < castRay.intersections.length; i++) {
          rayPoints.push(castRay.intersections[i]);
        }
      }

      if (rayPoints.length > 0) {
        rays.push({
          ray: castRay,
          points: rayPoints
        });
      }
    }

    var openTriangle = false;
    var pointSize = 1;

    //rays.reverse();
    var triangleCount = 0;
    var endOfTheLine = false;
    for (var rayIndex = 0; rayIndex < 2; rayIndex++) {//rays.length - 1
      var points = rays[rayIndex].points;

      if (endOfTheLine) {
        points.reverse();
      }

      for (var pIndex = 0; pIndex < points.length; pIndex++) {
        rayGraphics.lineTo(points[pIndex].point.x, points[pIndex].point.y);
        //rayGraphics.drawCircle(points[pIndex].point.x, points[pIndex].point.y, 2 * (rayIndex + 1));
      }

      if (!endOfTheLine) {
        endOfTheLine = true;
      }

      var openingPoint = rays[rayIndex].points[0];
      //var closingClosing = rays[rayIndex + 1].points[rays[rayIndex + 1].points.length - 1];

      //rayGraphics.drawCircle(openingPoint.point.x, openingPoint.point.y, 2 * (rayIndex + 1));
      //rayGraphics.drawCircle(closingClosing.point.x, closingClosing.point.y, 4 * (rayIndex + 1));

      //rayGraphics.lineTo(openingPoint.point.x, openingPoint.point.y);
      //rayGraphics.lineTo(closingClosing.point.x, closingClosing.point.y);
      //rayGraphics.lineTo(center.x, center.y);
      //
      //rayGraphics.endFill();
      //rayGraphics.beginFill(0xFFFFFF, 1);
      //rayGraphics.lineStyle(1, 0xFFFFFF, 1);
    }
//debugger;
    rayGraphics.endFill();
  };

  wrect.ECS.System.LightCaster.prototype.drawArea = function(ray) {

  };
}());
