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
      var rays = [];

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

          var projectRay = vector.subtract(center).perpendicular().unit();
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
          maxR: maxRay
        });
      }

      for (var edg = 0; edg < edges.length ; edg++) {
        var edge = edges[edg];

        rays.push(this.castRayAtEdges(edges, center, edge.minR.subtract(center).unitScalar(500).add(center)));
        rays.push(this.castRayAtEdges(edges, center, edge.maxR.subtract(center).unitScalar(500).add(center)));
      }

      //Draw lines to all shortest ray intersections
      visual.lightGraphics.clear();
      visual.lightGraphics.beginFill(0xFFFFFF, 1);
      visual.lightGraphics.lineStyle(1, 0xFFFFFF, 1);
      visual.lightGraphics.moveTo(center.x, center.y);

      for (var r = 0; r < rays.length ; r++) {
        var ray = rays[r];

        visual.lightGraphics.moveTo(center.x, center.y);
        visual.lightGraphics.lineTo(ray.shortestIntersection.x, ray.shortestIntersection.y);
        visual.lightGraphics.drawCircle(ray.shortestIntersection.x, ray.shortestIntersection.y, 5);
      }

      visual.lightGraphics.endFill();
    }
  };

  wrect.ECS.System.RayCaster.prototype.castRayAtEdges = function(edges, origin, endPoint) {
    var ray = {
      origin: origin,
      endPoint: endPoint,
      interSections: [],
      shortestIntersection: endPoint
    };

    for (var otherEdg = 0; otherEdg < edges.length ; otherEdg++) {
      var otherEdge = edges[otherEdg];

      var intersect = this.getLineIntersection(origin, endPoint, otherEdge.minR, otherEdge.maxR);

      if (intersect) {
        ray.interSections.push(intersect);
        if (intersect.subtract(origin).len() < ray.shortestIntersection.subtract(origin).len()) {
          ray.shortestIntersection = intersect;
        }
      }
    }

    return ray;
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
