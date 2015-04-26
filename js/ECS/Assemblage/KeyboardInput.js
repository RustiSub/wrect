(function() {
  "use strict";

  wrect.ECS = wrect.ECS || {};
  wrect.ECS.Assemblage = wrect.ECS.Assemblage || {};

  var Entity = wrect.ECS.Entity;
  var KeyMap = wrect.Core.Constants.KeyMap;

  /**
   * @param options
   * @returns {wrect.ECS.Entity|wrect.ECS.Entity}
   * @constructor
   */
  wrect.ECS.Assemblage.KeyboardInput = function (options) {
    this.entity = new Entity({eventManager: options.eventManager});

    var rawInputMap = new wrect.ECS.Component.RawInputMap();

    rawInputMap.keys = [
      KeyMap.NUMPAD_1,
      KeyMap.NUMPAD_2,
      KeyMap.NUMPAD_3,
      KeyMap.NUMPAD_4,
      KeyMap.NUMPAD_5,
      KeyMap.NUMPAD_6,
      KeyMap.NUMPAD_7,
      KeyMap.NUMPAD_8,
      KeyMap.NUMPAD_9
    ];

    this.entity.addComponent(rawInputMap);
  };
}());
