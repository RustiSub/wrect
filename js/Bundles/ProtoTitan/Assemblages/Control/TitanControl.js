(function() {
  "use strict";

  wrect.ECS = wrect.ECS || {};
  wrect.ECS.Assemblage = wrect.ECS.Assemblage || {};

  var Entity = wrect.ECS.Entity;
  var KeyMap = wrect.Core.Constants.KeyMap;

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
    }
  };

  var actions = titanControl.Constants.Actions;

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
      ]
    });

    var contextMap = new wrect.ECS.Component.Input.ContextMap();

    contextMap.actions[KeyMap.NUMPAD_5] = {
      action: actions.SPEAK,
      state: 0
    };

    var controlMap = new wrect.ECS.Component.Input.ControlMap();

    controlMap.controls[actions.SPEAK] = function() {
      console.log('Titan voice action enabled...');
    };

    this.entity.addComponent(rawInputMap);
    this.entity.addComponent(contextMap);
    this.entity.addComponent(controlMap);
  };
}());
