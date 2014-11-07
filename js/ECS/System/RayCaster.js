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
    for (var se = 0; se < this.sourceEntities.length; se++) {
      var sourceEntity = this.sourceEntities[se];
      var visual = sourceEntity.components.Visual;
      var center = sourceEntity.components.RigidBody.dimensions.getCenter();
      visual.lightGraphics.clear();
      visual.lightGraphics.beginFill(0xFFFFFF, 1);
      //visual.lightGraphics.moveTo(center.x, center.y);

      for (var e = 0; e < this.entities.length; e++) {
        var entity = this.entities[e];

        if (entity.id === sourceEntity.id) {
          continue;
        }

        var vertices = entity.components.RigidBody.dimensions.vertices;
        for (var v = 0; v < vertices.length; v++) {


          var ray = vertices[v].subtract(center);

          //visual.lightGraphics.lineTo(vertices[v].x, vertices[v].y);


          visual.lightGraphics.moveTo(center.x, center.y);
          visual.lightGraphics.lineTo(vertices[v].x, vertices[v].y);
          visual.lightGraphics.lineTo(vertices[v].x, vertices[v].y + 5);
          visual.lightGraphics.lineTo(center.x, center.y);

          visual.lightGraphics.drawCircle(center.x, center.y, 50);


          //visual.lightGraphics.dra
          //vertices[v]
        }
      }
      visual.lightGraphics.endFill();

    }
  };

  wrect.ECS.System.RayCaster.prototype.perform = function(entity) {

  }
}());
