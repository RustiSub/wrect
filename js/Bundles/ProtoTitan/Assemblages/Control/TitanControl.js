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
      ENGINE: {
        QUEUE: {
          ADD: 'titan_control.actions.queue.add',
          NEXT: 'titan_control.actions.queue.next'
        }
      },
      ADD: 'SPEAK',
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
      },
      ATTACK: 'ATTACK'
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
        HIDE: 'HIDE',
        MOVE: 'MOVE',
        ATTACK: 'ATTACK'
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
    this.entity = new Entity(
        {
          eventManager: options.eventManager,
          name: 'TitanControl'
        }
    );

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
          Input.LEFT_CLICK,
          Input.RIGHT_CLICK
      ]
    });

    var contextMap = new wrect.ECS.Component.Input.ContextMap();
    var ContextAction = wrect.ECS.Component.Input.ContextAction;

    contextMap.actions[KeyMap.NUMPAD_6] = new ContextAction({action: actions.ENGINE.QUEUE.ADD});

    contextMap.actions[KeyMap.NUMPAD_5] = new ContextAction({action: actions.ADD});
    contextMap.actions[KeyMap.NUMPAD_8] = new ContextAction({action: actions.MOVE.Y.FORWARD});
    contextMap.actions[KeyMap.NUMPAD_2] = new ContextAction({action: actions.MOVE.Y.BACKWARD});
    contextMap.actions[KeyMap.NUMPAD_9] = new ContextAction({action: actions.MOVE.X.FORWARD});
    contextMap.actions[KeyMap.NUMPAD_1] = new ContextAction({action: actions.MOVE.X.BACKWARD});
    contextMap.actions[KeyMap.NUMPAD_7] = new ContextAction({action: actions.MOVE.Z.FORWARD});
    contextMap.actions[KeyMap.NUMPAD_3] = new ContextAction({action: actions.MOVE.Z.BACKWARD});
    contextMap.actions[KeyMap.SHIFT] = new ContextAction({action: states.TOGGLE.MARKER_MODE});

    contextMap.ranges[Input.CURSOR] = {
      action: ranges.CURSOR.DISPLAY,
      values: {}
    };
    contextMap.ranges[Input.LEFT_CLICK] = {
      action: ranges.CURSOR.MOVE,
      values: {}
    };
    contextMap.ranges[Input.RIGHT_CLICK] = {
      action: ranges.CURSOR.ATTACK,
      values: {}
    };

    var controlMap = new wrect.ECS.Component.Input.ControlMap();

    controlMap.modes = {
      VIEW : false,
      MARKER: true
    };

    controlMap.controls[actions.ADD] = function() {
      console.log('Player voice action enabled...');
    };

    function setControl(key) {
      controlMap.controls[key] = function() {
        options.eventManager.trigger(key, {
          entity: entity
        });
      };
    }

    setControl(actions.ENGINE.QUEUE.ADD);
    setControl(actions.MOVE.X.FORWARD);
    setControl(actions.MOVE.X.BACKWARD);
    setControl(actions.MOVE.Y.FORWARD);
    setControl(actions.MOVE.Y.BACKWARD);
    setControl(actions.MOVE.Z.FORWARD);
    setControl(actions.MOVE.Z.BACKWARD);


    controlMap.controls[states.TOGGLE.MARKER_MODE] = function(entity) {
      controlMap.modes.VIEW = !controlMap.modes.VIEW;
      controlMap.modes.MARKER = !controlMap.modes.MARKER;

      console.log('Cursor mode: ', controlMap.modes);
    };
    controlMap.controls[ranges.CURSOR.DISPLAY] = function(entity, values, action) {
      console.log('Display target reticule ...', values);
    };
    controlMap.controls[ranges.CURSOR.DISPLAY] = function(entity, values) {
      selectObjects(values, ranges.CURSOR.DISPLAY);
      //console.log(values);
    };
    controlMap.controls[ranges.CURSOR.MOVE] = function(entity, values) {
      if (!controlMap.modes.MARKER) {
        return;
      }

      selectObjects(values, ranges.CURSOR.MOVE);
    };

    controlMap.controls[ranges.CURSOR.ATTACK] = function(entity, values) {
      if (!controlMap.modes.MARKER) {
        return;
      }

      selectObjects(values, ranges.CURSOR.ATTACK);
    };

    function selectObjects(values, actionCode) {
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
            entity: sceneManager.getEntityByGraphicsId(intersects[i].object.id),
            actionCode: actionCode
          });
        }
      }
    }

    this.entity.addComponent(rawInputMap);
    this.entity.addComponent(contextMap);
    this.entity.addComponent(controlMap);
  };
}());
