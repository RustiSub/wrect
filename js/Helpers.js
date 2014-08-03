(function() {
    window.Helpers = Class.extend({
        merge: function( original, extended ) {
            for( var key in extended ) {
                var ext = extended[key];
                if(
                    typeof(ext) != 'object' ||
                        ext instanceof HTMLElement ||
                        ext instanceof Class ||
                        ext === null
                    ) {
                    original[key] = ext;
                }
                else {
                    if( !original[key] || typeof(original[key]) != 'object' ) {
                        original[key] = (ext instanceof Array) ? [] : {};
                    }
                    this.merge( original[key], ext );
                }
            }
            return original;
        },

        copy: function( object ) {
            if(
                !object || typeof(object) != 'object' ||
                    object instanceof HTMLElement ||
                    object instanceof Class
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
                var constructorFunction = this.getFunctionFromString(jso.className);
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
            var constrFunc = this.getFunctionFromString(jso._className);
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
        },

        getFunctionFromString: function (ns, o) {
            o = (o === undefined) ? window : o;
            return ns.split('.').reduce(index, o);
        }
    });

    ////
    // Private functions
    ////
    function index(obj,i) {
        return obj[i];
    }
})();
