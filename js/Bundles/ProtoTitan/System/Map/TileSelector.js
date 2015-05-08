(function() {
  "use strict";

  wrect.ECS = wrect.ECS || {};
  wrect.ECS.System = wrect.ECS.System || {};
  wrect.ECS.System.Map = wrect.ECS.System.Map || {};

  var Vector = wrect.Physics.Vector;

  wrect.ECS.System.Map.TileSelector = function (options) {
    wrect.ECS.System.BaseSystem.call(this, options);

    this.options = options || {};

    this.options.eventManager.addListener('titan_control.objects_selected', this.selectObject, this);

    this.selectedTiles = [];
  };

  wrect.ECS.System.Map.TileSelector.prototype = Object.create( wrect.ECS.System.BaseSystem.prototype );
  wrect.ECS.System.Map.TileSelector.prototype.constructor = wrect.ECS.System.Map.TileSelector;

  wrect.ECS.System.Map.TileSelector.prototype.name = 'TileSelector';

  wrect.ECS.System.Map.TileSelector.prototype.checkDependencies = function(entity) {
    return entity.components.Selectable && entity.components.Tile ? true : false;
  };

  wrect.ECS.System.Map.TileSelector.prototype.perform = function(entity) {
    var selectable = entity.components.Selectable;

    if (!selectable.changed) {
      return;
    }

    selectable.changed = false;

    if (selectable.selected) {
      selectable.deselectCallback(entity);
      selectable.actionPerformed = true;
      selectable.selected = false;

      this.selectedTiles.splice(this.selectedTiles.indexOf(entity), 1);
    } else {
      selectable.selectCallback(entity);
      selectable.actionPerformed = true;
      selectable.selected = true;

      this.selectedTiles.push(entity);
    }
  };

  wrect.ECS.System.Map.TileSelector.prototype.selectObject = function(eventData) {
    if (this.entities.indexOf(eventData.entity) !== -1) {
      eventData.entity.components.Selectable.changed = true;
    }
  };
}());
