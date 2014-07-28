(function() {
    window.Helpers = {
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

        buildObjectFromJso: function(jso) {
            if (jso._className !== undefined) {
                //if (jso.specialParams !== undefined) {
                var constructorFunction = this.getFunctionFromString(jso._className);
                //console.log(constructorFunction);
                var classInstance = new constructorFunction();
                for (var x in jso) {
                    if (jso[x] !== undefined) {
                        if (jso.specialParams !== undefined && jso.specialParams.indexOf(x) !== -1) {
                            var specialProp = jso[x];
                            var specialPropConstrFunction = this.getFunctionFromString(specialProp.className);
                            // TODO: implement constructor params from jso
                            var specialPropInstance = new specialPropConstrFunction();
                            for (var y in specialProp.callbacks) {
                                if (typeof specialProp[y] === 'function') {
                                    specialPropInstance[y].apply(specialPropInstance, specialProp[y].callbacks[y]);
                                }
                            }
                            classInstance[x] = specialPropInstance;
                            console.log(specialPropInstance, x);
                        }
                        else if (x !== 'specialParams') {
                            classInstance[x] = jso[x];
                        }
                    }
                }
                console.log(classInstance instanceof window.Block);

                return classInstance;
            }

            return null;
            /*if (jso._className !== undefined) {
             console.log(jso._className);
             var entity = Object.create(window[jso._className].prototype);
             for (var x in jso) {
             var prop = jso[x];
             if (prop._className !== undefined) {
             prop = this.buildObjectFromProperties(prop);
             }
             else {
             console.info('No classname found on ', x);
             }
             entity[x] = prop;
             }
             console.log(entity);
             return entity;
             }*/


        },

        getFunctionFromString: function (ns, o) {
            o = (o === undefined) ? window : o;
            return ns.split('.').reduce(index, o);
        }
    };

    ////
    // Private functions
    ////
    function index(obj,i) {
        return obj[i];
    }
})();
