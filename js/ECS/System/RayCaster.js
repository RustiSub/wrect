(function() {
  "use strict";

  wrect.ECS = wrect.ECS || {};
  wrect.ECS.System = wrect.ECS.System || {};

  var Vector = wrect.Physics.Vector;

  wrect.ECS.System.RayCaster = function (options) {
    wrect.ECS.System.BaseSystem.call(this);

    this.sourceEntities = [];
    this.options = options || {};

  };

  wrect.ECS.System.RayCaster.prototype = Object.create( wrect.ECS.System.BaseSystem.prototype );
  wrect.ECS.System.RayCaster.prototype.constructor = wrect.ECS.System.RayCaster;

  wrect.ECS.System.RayCaster.prototype.name = 'RayCaster';

  wrect.ECS.System.RayCaster.prototype.checkDependencies = function(entity) {
    return entity.components.RigidBody ? true : false;
  };

  wrect.ECS.System.RayCaster.prototype.checkSourceDependencies = function(entity) {
    return entity.components.Light ? true : false;
  };

  wrect.ECS.System.RayCaster.prototype.addEntity = function(data) {
    if (this.checkDependencies(data.entity) && this.entities.indexOf(data.entity) === -1) {
      this.entities.push(data.entity);
    }

    if (this.checkSourceDependencies(data.entity) && this.sourceEntities.indexOf(data.entity) === -1) {
      this.sourceEntities.push(data.entity);
    }
  };

  wrect.ECS.System.RayCaster.prototype.run = function() {
    var edges = [];

    for (var se = 0; se < this.sourceEntities.length; se++) {
      var sourceEntity = this.sourceEntities[se];
      var visual = sourceEntity.components.Visual;
      var center = sourceEntity.components.RigidBody.dimensions.getCenter();

      //Cast a ray to every possible vertex
      for (var e = 0; e < this.entities.length; e++) {
        var entity = this.entities[e];

        if (entity.id === sourceEntity.id) {
          continue;
        }

        var vertices = entity.components.RigidBody.dimensions.vertices;
        var minRay;
        var minP;
        var maxRay;
        var maxP;
        //visual.lightGraphics.moveTo(center.x, center.y);
        for (var v = 0; v < vertices.length; v++) {
          var vector = vertices[v];

          var ray = vector.subtract(center);
          var projectRay = ray.perpendicular().unit();
          var ownProjection = vector.dot(projectRay);
          var smallerCount = 0;

          for (var p = 0; p < vertices.length; p++) {
            var projection = vertices[p].dot(projectRay);
            smallerCount += (ownProjection - projection < 0);
          }

          if (smallerCount == vertices.length - 1) {
            maxRay = vector;
            maxP = ownProjection;
          }

          if (smallerCount == 0) {
            minRay = vector;
            minP = ownProjection;
          }
        }
        edges.push({
          minR: minRay,
          maxR: maxRay,
          minP: minP,
          maxP: maxP
        });
        //Move line to border
        //visual.lightGraphics.lineTo(maxRay.x, maxRay.y);
        //visual.lightGraphics.lineTo(minRay.x, minRay.y);
        //visual.lightGraphics.lineTo(center.x, center.y);
      }

      edges.sort(function (a,b) {
        if (a.minP < b.minP)
          return -1;
        if (a.minP > b.minP)
          return 1;
        return 0;
      });

      //edges.sort(function (a,b) {
      //  if (a.minP < b.minP)
      //    return -1;
      //  if (a.minP > b.minP)
      //    return 1;
      //  return 0;
      //});

      visual.lightGraphics.clear();
      visual.lightGraphics.beginFill(0xFFFFFF, 1);
      visual.lightGraphics.lineStyle(1, 0xFFFFFF, 1);
      visual.lightGraphics.moveTo(center.x, center.y);

      for (var edg = 0; edg < edges.length ; edg++) {
        var edge = edges[edg];

        var rayMin = edge.minR.subtract(center).unitScalar(500).add(center);
        var rayMax = edge.maxR.subtract(center).unitScalar(500).add(center);


        this.castRay(center, edges, edge, visual, rayMin);
        visual.lightGraphics.moveTo(center.x, center.y);
        visual.lightGraphics.lineTo(rayMin.x, rayMin.y);

        this.castRay(center, edges, edge, visual, rayMax);
        visual.lightGraphics.moveTo(center.x, center.y);
        visual.lightGraphics.lineTo(rayMax.x, rayMax.y);
      }

      visual.lightGraphics.endFill();
    }
  };

  wrect.ECS.System.RayCaster.prototype.castRay = function(center, edges, edge, visual, ray) {
    var shortestIntersection = new Vector(0, 0);
    var intersections = [];
    visual.lightGraphics.drawCircle(ray.x, ray.y, 5);
    for (var otherEdg = 0; otherEdg < edges.length ; otherEdg++) {
      var otherEdge = edges[otherEdg];
      if (edge === otherEdge) { continue; }

      var intersect = this.getLineIntersection(center, ray, otherEdge.minR, otherEdge.maxR);

      if (intersect) {
        //if (intersect.subtract(center).len() < shortestIntersection.subtract(center).len()) {
        //  shortestIntersection = intersect;
        //}
        //intersections.push(intersect);
        visual.lightGraphics.drawCircle(intersect.x, intersect.y, 5);
      }
    }

    //ray = ray.subtract(center).unitScalar(500).add(center);

    return intersections;
  };

  wrect.ECS.System.RayCaster.prototype.getLineIntersection = function(a, b, c, d) {
    var CmP = c.subtract(a);
    var r = b.subtract(a);
    var s = d.subtract(c);

    var CmPxr = CmP.cross(r);
    var CmPxs = CmP.cross(s);
    var rxs = r.cross(s);

    if (rxs === 0) { return false; }

    var rxsr = 1 / rxs;
    var t = CmPxs * rxsr;
    var u = CmPxr * rxsr;

    //console.log(t, u);
    var ptr = a.add(r.multiply(t));
    var qus = c.add(s.multiply(u));
    //p + t r = q + u s.
    //console.log(ptr, qus);

    if ((t >= 0) && (t <= 1) && (u >= 0) && (u <= 1)) {
      return qus;
    }

    return false;
  };

  wrect.ECS.System.RayCaster.prototype.perform = function(entity) {

  };
}());
