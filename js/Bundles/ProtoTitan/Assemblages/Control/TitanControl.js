(function() {
  "use strict";

  wrect.ECS = wrect.ECS || {};
  wrect.ECS.Assemblage = wrect.ECS.Assemblage || {};

  var Entity = wrect.ECS.Entity;
  var KeyMap = wrect.Core.Constants.KeyMap;
  var Input = wrect.Core.Constants.Input;

  wrect.Bundles.ProtoTitan.TitanControl = wrect.Bundles.ProtoTitan.TitanControl || {};

  var titanControl = wrect.Bundles.ProtoTitan.TitanControl;

  titanControl.Constants = titanControl.Constants || {};
  titanControl.Constants = titanControl.TitanControl || {};
  titanControl.Constants = {
    Actions: {
      SPEAK: 'SPEAK',
      MOVE : {
        X: {
          FORWARD: 'titan_control.actions.move.x.forward',
          BACKWARD: 'titan_control.actions.move.x.backward'
        },
        Y: {
          FORWARD: 'titan_control.actions.move.y.forward',
          BACKWARD: 'titan_control.actions.move.y.backward'
        },
        Z: {
          FORWARD: 'titan_control.actions.move.z.forward',
          BACKWARD: 'titan_control.actions.move.z.backward'
        }
      }
    },
    States: {
      MOVE : {
        FORWARD: 'titan_control.states.move.forward',
        BACK: 'BACK',
        LEFT: 'LEFT',
        RIGHT: 'RIGHT'
      },
      TOGGLE: {
        MARKER_MODE: 'MARKER_MODE'
      }
    },
    Ranges: {
      CURSOR: {
        DISPLAY: 'DISPLAY',
        CLICK: 'CLICK'
      }
    }
  };

  var actions = titanControl.Constants.Actions;
  var states = titanControl.Constants.States;
  var ranges = titanControl.Constants.Ranges;

  /**
   * @param options
   * @returns {wrect.ECS.Entity|wrect.ECS.Entity}
   * @constructor
   */
  wrect.ECS.Assemblage.TitanControl = function (options) {
    this.entity = new Entity({eventManager: options.eventManager});
    var entity = this.entity;

    var rawInputMap = new wrect.ECS.Component.Input.RawInputMap({
      keys: [
        KeyMap.NUMPAD_1,
        KeyMap.NUMPAD_2,
        KeyMap.NUMPAD_3,
        KeyMap.NUMPAD_4,
        KeyMap.NUMPAD_5,
        KeyMap.NUMPAD_6,
        KeyMap.NUMPAD_7,
        KeyMap.NUMPAD_8,
        KeyMap.NUMPAD_9,
        KeyMap.NUMPAD_9,
        KeyMap.SHIFT
      ],
      types: [
          Input.CURSOR,
          Input.CLICK
      ]
    });

    var contextMap = new wrect.ECS.Component.Input.ContextMap();

    contextMap.actions[KeyMap.NUMPAD_5] = {
      action: actions.SPEAK,
      state: 0,
      values: {}
    };
    contextMap.actions[KeyMap.NUMPAD_8] = {
      action: actions.MOVE.Y.FORWARD,
      values: {}
    };
    contextMap.actions[KeyMap.NUMPAD_2] = {
      action: actions.MOVE.Y.BACKWARD,
      values: {}
    };
    contextMap.actions[KeyMap.NUMPAD_9] = {
      action: actions.MOVE.X.FORWARD,
      values: {}
    };
    contextMap.actions[KeyMap.NUMPAD_1] = {
      action: actions.MOVE.X.BACKWARD,
      values: {}
    };
    contextMap.actions[KeyMap.NUMPAD_7] = {
      action: actions.MOVE.Z.FORWARD,
      values: {}
    };
    contextMap.actions[KeyMap.NUMPAD_3] = {
      action: actions.MOVE.Z.BACKWARD,
      values: {}
    };
    contextMap.actions[KeyMap.SHIFT] = {
      action: states.TOGGLE.MARKER_MODE,
      values: {}
    };
    contextMap.ranges[Input.CURSOR] = {
      action: ranges.CURSOR.DISPLAY,
      values: {}
    };
    contextMap.ranges[Input.CLICK] = {
      action: ranges.CURSOR.CLICK,
      values: {}
    };

    var controlMap = new wrect.ECS.Component.Input.ControlMap();

    controlMap.modes = {
      VIEW : false,
      MARKER: true
    };

    controlMap.controls[actions.SPEAK] = function() {
      console.log('Player voice action enabled...');
    };

    function setMovementControl(key) {
      controlMap.controls[key] = function() {
        options.eventManager.trigger(key, {
          entity: entity
        });
      };
    }

    setMovementControl(actions.MOVE.X.FORWARD);
    setMovementControl(actions.MOVE.X.BACKWARD);
    setMovementControl(actions.MOVE.Y.FORWARD);
    setMovementControl(actions.MOVE.Y.BACKWARD);
    setMovementControl(actions.MOVE.Z.FORWARD);
    setMovementControl(actions.MOVE.Z.BACKWARD);


    controlMap.controls[states.TOGGLE.MARKER_MODE] = function(entity) {
      controlMap.modes.VIEW = !controlMap.modes.VIEW;
      controlMap.modes.MARKER = !controlMap.modes.MARKER;

      console.log('Cursor mode: ', controlMap.modes);
    };
    controlMap.controls[ranges.CURSOR.DISPLAY] = function(entity, values, action) {
      console.log('Display target reticule ...', values);
    };
    controlMap.controls[ranges.CURSOR.DISPLAY] = function(entity, values) {
      //selectObjects(values);
    };
    controlMap.controls[ranges.CURSOR.CLICK] = function(entity, values) {
      if (!controlMap.modes.MARKER) {
        return;
      }

      selectObjects(values);
    };

    function selectObjects(values) {
      var camera = options.camera;
      var eventManager = options.eventManager;
      var sceneManager = options.sceneManager;

      var raycaster = new THREE.Raycaster();
      var pos = new THREE.Vector2();
      pos.x = ( values.x / window.innerWidth ) * 2 - 1;
      pos.y = -( values.y / window.innerHeight ) * 2 + 1;
      raycaster.setFromCamera(pos, camera);

      var intersects = raycaster.intersectObjects(sceneManager.getScene().children);
      // Change color if hit block
      if (intersects.length > 0) {

        for (var i in intersects) {
          eventManager.trigger('titan_control.objects_selected', {
            entity: sceneManager.getEntityByGraphicsId(intersects[i].object.id)
          });
        }
      }

      //marker = new wrect.ECS.Assemblage.HexTile({
      //  eventManager: game.getEventManager(),
      //  renderer:  game.getRenderer(),
      //  origin: new Vector3(pos.x, pos.y, 5),
      //  size: 50
      //});
      //game.getEntityManager().addEntity(marker.entity);

      //var block = new wrect.ECS.Assemblage.Block({
      //  position: new Vector3(pos.x, pos.y, 0),
      //  dimension: new Vector3(50, 50, 50),
      //  color: 0x000000,
      //  alpha: 1,
      //  material: new THREE.MeshLambertMaterial({color: 0xFFFFFF }),
      //  renderer: game.getRenderer(),
      //  eventManager: game.getEventManager()
      //});
      //game.getEntityManager().addEntity(block.entity);
    }

    this.entity.addComponent(rawInputMap);
    this.entity.addComponent(contextMap);
    this.entity.addComponent(controlMap);
  };
}());
