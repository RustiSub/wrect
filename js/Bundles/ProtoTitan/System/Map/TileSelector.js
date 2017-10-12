(function() {
  "use strict";

  wrect.ECS = wrect.ECS || {};
  wrect.ECS.System = wrect.ECS.System || {};
  wrect.ECS.System.Map = wrect.ECS.System.Map || {};

  var Vector = wrect.Physics.Vector;

  wrect.ECS.System.Map.TileSelector = function (options) {
    wrect.ECS.System.BaseSystem.call(this, options);

    this.options = options || {};
    this.eventManager = this.options.eventManager;
    this.eventManager.addListener('titan_control.objects_selected', this.selectObject, this);

    this.selectedTiles = [];
    this.highlightedTiles = [];
  };

  wrect.ECS.System.Map.TileSelector.prototype = Object.create( wrect.ECS.System.BaseSystem.prototype );
  wrect.ECS.System.Map.TileSelector.prototype.constructor = wrect.ECS.System.Map.TileSelector;

  wrect.ECS.System.Map.TileSelector.prototype.name = 'TileSelector';

  wrect.ECS.System.Map.TileSelector.prototype.checkDependencies = function(entity) {
    return entity.components.Selectable && entity.components.Coord && entity.components.Grid ? true : false;
  };

  wrect.ECS.System.Map.TileSelector.prototype.perform = function(entity) {

    var selectable = entity.components.Selectable;

    if (!selectable.changed) {
      return;
    }
    selectable.changed = false;

    this.eventManager.trigger('titan_control.tile_changed', {
      entity: entity,
      coord: entity.components.Grid.getTileCoord(entity.components.Coord.coord),
      actionCode: selectable.actionCode
    });

    if (selectable.actionCode === wrect.Bundles.ProtoTitan.TitanControl.Constants.Ranges.CURSOR.DISPLAY) {
      if (!selectable.highlight) {
        selectable.highlight = true;

        for (var selectedTileIndex in this.highlightedTiles) {
          var selectedTile = this.highlightedTiles[selectedTileIndex];
          selectedTile.components.Selectable.changed = true;
          selectedTile.components.Selectable.actionCode = wrect.Bundles.ProtoTitan.TitanControl.Constants.Ranges.CURSOR.HIDE;
        }

        if (selectable.highlight) {
          selectable.highlightCallback(entity);

          this.highlightedTiles.push(entity);
        }
      }
    } else if (selectable.actionCode === wrect.Bundles.ProtoTitan.TitanControl.Constants.Ranges.CURSOR.HIDE) {
      selectable.unhighlightCallback(entity);
      selectable.highlight = false;

      this.highlightedTiles.splice(this.highlightedTiles.indexOf(entity), 1);
    } else if (selectable.actionCode === wrect.Bundles.ProtoTitan.TitanControl.Constants.Ranges.CURSOR.MOVE) {
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
    }
  };

  wrect.ECS.System.Map.TileSelector.prototype.selectObject = function(eventData) {
    if (this.entities.indexOf(eventData.entity) !== -1) {
      eventData.entity.components.Selectable.changed = true;
      eventData.entity.components.Selectable.actionCode = eventData.actionCode;
    }
  };
}());
