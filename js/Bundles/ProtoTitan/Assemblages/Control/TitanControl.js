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
      SPEAK: 'SPEAK'
    },
    States: {
      MOVE : {
        FORWARD: 'FORWARD',
        BACK: 'BACK',
        LEFT: 'LEFT',
        RIGHT: 'RIGHT'
      }
    },
    Ranges: {
      CURSOR: {
        DISPLAY: 'DISPLAY'
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
        KeyMap.NUMPAD_9
      ],
      types: [
          Input.CURSOR,
          Input.CLICK,
      ]
    });

    var contextMap = new wrect.ECS.Component.Input.ContextMap();

    contextMap.actions[KeyMap.NUMPAD_5] = {
      action: actions.SPEAK,
      state: 0,
      values: {}
    };

    contextMap.states[KeyMap.NUMPAD_8] = {
      action: states.MOVE.FORWARD,
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

    controlMap.controls[actions.SPEAK] = function() {
      console.log('Titan voice action enabled...');
    };

    controlMap.controls[states.MOVE.FORWARD] = function() {
      console.log('Trying to move forward ... engine not yet installed');
    };

    controlMap.controls[ranges.CURSOR.DISPLAY] = function(entity, values) {
      console.log('Display target reticule ...', values);
    };

    controlMap.controls[ranges.CURSOR.CLICK] = function(entity, values) {
      console.log('FIRE ON MY LOCATION!', values);
    };

    this.entity.addComponent(rawInputMap);
    this.entity.addComponent(contextMap);
    this.entity.addComponent(controlMap);
  };
}());
