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
    }
};
