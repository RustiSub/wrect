(function() {
    "use strict";
    window.Helpers = {
      object: {
        merge: function( original, extended ) {
          for( var key in extended ) {
            var ext = extended[key];
            if(
              typeof(ext) !== 'object' ||
              ext instanceof HTMLElement ||
              ext instanceof Class ||
              ext === null
            ) {
              original[key] = ext;
            }
            else {
              if( !original[key] || typeof(original[key]) !== 'object' ) {
                original[key] = (ext instanceof Array) ? [] : {};
              }
              this.merge( original[key], ext );
            }
          }
          return original;
        },

        copy: function( object ) {
          if(
            !object || typeof(object) !== 'object' ||
            object instanceof HTMLElement ||
            object instanceof window.Class
          ) {
            return object;
          }
          else if( object instanceof Array ) {
            var c = [];
            for( var i = 0, l = object.length; i < l; i++) {
              c[i] = this.copy(object[i]);
            }
            return c;
          }
          else {
            var c = {};
            for( var i in object ) {
              c[i] = this.copy(object[i]);
            }
            return c;
          }
        },

        // DO NOT USE, only kept just in case it proves to be useful for the future.
        buildObjectFromJso: function(jso) {
          if (jso.className !== undefined) {
            var constructorFunction = window.Helpers.function.getFunctionFromString(jso.className);
            // TODO: implement constructor params from jso
            var classInstance = new constructorFunction();
            for (var y in jso.callbacks) {
              if (typeof classInstance[y] === 'function') {
                classInstance[y].apply(classInstance, jso.callbacks[y]);
              }
            }

            return classInstance;
          }

          return null;
        },

        // DO NOT USE, only kept just in case it proves to be useful for the future.
        buildEntityFromJso: function(jso) {
          if (jso._className !== undefined) {
            var constrFunc = game.getHelpers().function.getFunctionFromString(jso._className);
            var entity = Object.create(constrFunc.prototype);
            for (var x in jso) {
              var prop = jso[x];
              console.log(jso.specialParams, x, jso.specialParams.indexOf(x));
              if (jso.specialParams.indexOf(x) !== -1) {
                entity[x] = this.buildObjectFromJso(prop);
              }
              else {
                entity[x] = prop;
              }
            }
            console.log(entity);
            return entity;
          }
        }
      },
      function: {
        getFunctionFromString: function (ns, o) {
          o = (o === undefined) ? window : o;
          return ns.split('.').reduce(index, o);
        }
      },
      math: {
        /**
         * absolute angle to relative angle, in degrees
         * @param {Number} degrees absolute angle in degrees
         * @returns {Number} relative angle in degrees
         */
        normaliseDegrees: function (degrees) {
          degrees = degrees % 360;
          if (degrees < 0) {
            degrees += 360;
          }
          return degrees;
        },

        /**
         * absolute angle to relative angle, in radians
         * @param {Number} radians absolute angle in radians
         * @returns {Number} relative angle in radians
         */
        normaliseRadians: function (radians) {
          radians = radians % (2 * Math.PI);
          if (radians < 0) {
            radians += (2 * Math.PI);
          }
          return radians;
        },

        /**
         * convert radians to degrees
         * @param {Number} radians
         * @returns {Number} degrees
         */
        toDegrees: function (radians) {
          return radians * (180 / Math.PI);
        },

        /**
         * convert degrees to radians
         * @param {Number} degrees
         * @returns {Number} radians
         */
        toRadians: function (degrees) {
          return degrees * (Math.PI / 180);
        },

        /**
         * Return whatever value is highest
         * @param value
         * @param min
         * @param max
         * @returns {number}
         */
        clamp: function(value, min, max) {
          return Math.min(Math.max(value, min), max);
        }
      },

      dom: {
        hasClass: function(elem, className) {
          return elem.className.split( ' ' ).indexOf( className ) !== -1;
        },

        removeClass: function(elem, className) {
          if (this.hasClass(elem, className)) {
            var classes = elem.className.split(' ');
            var index;
            if ((index = classes.indexOf(className)) !== -1) {
              classes.splice(index, 1);
              elem.className = classes.join(' ');
            }
          }
        },

        addClass: function(elem, className) {
          if (className instanceof Array) {
            this.addClasses(elem, className);
          }
          else if (!this.hasClass(elem, className)) {
            elem.className += ' ';
            elem.className += className;
          }
        },

        addClasses: function(elem, classes) {
          var classesToAdd = [];
          for (var i = 0; i < classes.length; i++) {
            var c = classes[i];
            if (!this.hasClass(elem, c)) {
              classesToAdd.push(c);
            }
          }
          elem.className += ' ';
          elem.className += classesToAdd.join(' ');
        }
      }
    };

  /**
   * @deprecated
   */
  window.Helpers.getFunctionFromString = window.Helpers.function.getFunctionFromString;

  /**
   * @deprecated
   */
  window.Helpers.merge = window.Helpers.object.merge;

  /**
   * @deprecated
   */
  window.Helpers.copy = window.Helpers.object.copy;

  /**
   * @deprecated
   */
  window.Helpers.hasClass = window.Helpers.dom.hasClass;

  /**
   * @deprecated
   */
  window.Helpers.removeClass = window.Helpers.dom.removeClass;

  /**
   * @deprecated
   */
  window.Helpers.addClass = window.Helpers.dom.addClass;

  /**
   * @deprecated
   */
  window.Helpers.addClasses = window.Helpers.dom.addClasses;

  ////
  // Private functions
  ////
  function index(obj,i) {
    return obj[i];
  }
})();
