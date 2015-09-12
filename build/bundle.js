/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(2);
	__webpack_require__(3);

	__webpack_require__(5);

	__webpack_require__(17);


/***/ },
/* 2 */
/***/ function(module, exports) {

	/* Simple JavaScript Inheritance for ES 5.1
	 * based on http://ejohn.org/blog/simple-javascript-inheritance/
	 *  (inspired by base2 and Prototype)
	 * MIT Licensed.
	 */
	(function(global) {
	    "use strict";
	    var fnTest = /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/;

	    // The base Class implementation (does nothing)
	    function BaseClass(){}

	    // Create a new Class that inherits from this class
	    BaseClass.extend = function(props) {
	        var _super = this.prototype;

	        // Instantiate a base class (but only create the instance,
	        // don't run the init constructor)
	        var proto = Object.create(_super);

	        // Copy the properties over onto the new prototype
	        for (var name in props) {
	            // Check if we're overwriting an existing function
	            proto[name] = typeof props[name] === "function" &&
	                typeof _super[name] == "function" && fnTest.test(props[name]) ?
	                (function(name, fn){
	                    return function() {
	                        var tmp = this._super;

	                        // Add a new ._super() method that is the same method
	                        // but on the super-class
	                        this._super = _super[name];

	                        // The method only need to be bound temporarily, so we
	                        // remove it when we're done executing
	                        var ret = fn.apply(this, arguments);
	                        this._super = tmp;

	                        return ret;
	                    };
	                })(name, props[name]) :
	                props[name];
	        }

	        // The new constructor
	        var newClass = typeof proto.init === "function" ?
	            proto.init : // All construction is actually done in the init method
	            function(){};

	        // Populate our constructed prototype object
	        newClass.prototype = proto;

	        // Enforce the constructor to be what we expect
	        proto.constructor = newClass;

	        // And make this class extendable
	        newClass.extend = BaseClass.extend;

	        return newClass;
	    };

	    // export
	    global.Class = BaseClass;
	})(this);

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module) {;(function(win){
	  var store = {},
	    doc = win.document,
	    localStorageName = 'localStorage',
	    scriptTag = 'script',
	    storage

	  store.disabled = false
	  store.set = function(key, value) {}
	  store.get = function(key) {}
	  store.remove = function(key) {}
	  store.clear = function() {}
	  store.transact = function(key, defaultVal, transactionFn) {
	    var val = store.get(key)
	    if (transactionFn == null) {
	      transactionFn = defaultVal
	      defaultVal = null
	    }
	    if (typeof val == 'undefined') { val = defaultVal || {} }
	    transactionFn(val)
	    store.set(key, val)
	  }
	  store.getAll = function() {}
	  store.forEach = function() {}

	  store.serialize = function(value) {
	    return JSON.stringify(value)
	  }
	  store.deserialize = function(value) {
	    if (typeof value != 'string') { return undefined }
	    try { return JSON.parse(value) }
	    catch(e) { return value || undefined }
	  }

	  // Functions to encapsulate questionable FireFox 3.6.13 behavior
	  // when about.config::dom.storage.enabled === false
	  // See https://github.com/marcuswestin/store.js/issues#issue/13
	  function isLocalStorageNameSupported() {
	    try { return (localStorageName in win && win[localStorageName]) }
	    catch(err) { return false }
	  }

	  if (isLocalStorageNameSupported()) {
	    storage = win[localStorageName]
	    store.set = function(key, val) {
	      if (val === undefined) { return store.remove(key) }
	      storage.setItem(key, store.serialize(val))
	      return val
	    }
	    store.get = function(key) { return store.deserialize(storage.getItem(key)) }
	    store.remove = function(key) { storage.removeItem(key) }
	    store.clear = function() { storage.clear() }
	    store.getAll = function() {
	      var ret = {}
	      store.forEach(function(key, val) {
	        ret[key] = val
	      })
	      return ret
	    }
	    store.forEach = function(callback) {
	      for (var i=0; i<storage.length; i++) {
	        var key = storage.key(i)
	        callback(key, store.get(key))
	      }
	    }
	  } else if (doc.documentElement.addBehavior) {
	    var storageOwner,
	      storageContainer
	    // Since #userData storage applies only to specific paths, we need to
	    // somehow link our data to a specific path.  We choose /favicon.ico
	    // as a pretty safe option, since all browsers already make a request to
	    // this URL anyway and being a 404 will not hurt us here.  We wrap an
	    // iframe pointing to the favicon in an ActiveXObject(htmlfile) object
	    // (see: http://msdn.microsoft.com/en-us/library/aa752574(v=VS.85).aspx)
	    // since the iframe access rules appear to allow direct access and
	    // manipulation of the document element, even for a 404 page.  This
	    // document can be used instead of the current document (which would
	    // have been limited to the current path) to perform #userData storage.
	    try {
	      storageContainer = new ActiveXObject('htmlfile')
	      storageContainer.open()
	      storageContainer.write('<'+scriptTag+'>document.w=window</'+scriptTag+'><iframe src="/favicon.ico"></iframe>')
	      storageContainer.close()
	      storageOwner = storageContainer.w.frames[0].document
	      storage = storageOwner.createElement('div')
	    } catch(e) {
	      // somehow ActiveXObject instantiation failed (perhaps some special
	      // security settings or otherwse), fall back to per-path storage
	      storage = doc.createElement('div')
	      storageOwner = doc.body
	    }
	    function withIEStorage(storeFunction) {
	      return function() {
	        var args = Array.prototype.slice.call(arguments, 0)
	        args.unshift(storage)
	        // See http://msdn.microsoft.com/en-us/library/ms531081(v=VS.85).aspx
	        // and http://msdn.microsoft.com/en-us/library/ms531424(v=VS.85).aspx
	        storageOwner.appendChild(storage)
	        storage.addBehavior('#default#userData')
	        storage.load(localStorageName)
	        var result = storeFunction.apply(store, args)
	        storageOwner.removeChild(storage)
	        return result
	      }
	    }

	    // In IE7, keys cannot start with a digit or contain certain chars.
	    // See https://github.com/marcuswestin/store.js/issues/40
	    // See https://github.com/marcuswestin/store.js/issues/83
	    var forbiddenCharsRegex = new RegExp("[!\"#$%&'()*+,/\\\\:;<=>?@[\\]^`{|}~]", "g")
	    function ieKeyFix(key) {
	      return key.replace(/^d/, '___$&').replace(forbiddenCharsRegex, '___')
	    }
	    store.set = withIEStorage(function(storage, key, val) {
	      key = ieKeyFix(key)
	      if (val === undefined) { return store.remove(key) }
	      storage.setAttribute(key, store.serialize(val))
	      storage.save(localStorageName)
	      return val
	    })
	    store.get = withIEStorage(function(storage, key) {
	      key = ieKeyFix(key)
	      return store.deserialize(storage.getAttribute(key))
	    })
	    store.remove = withIEStorage(function(storage, key) {
	      key = ieKeyFix(key)
	      storage.removeAttribute(key)
	      storage.save(localStorageName)
	    })
	    store.clear = withIEStorage(function(storage) {
	      var attributes = storage.XMLDocument.documentElement.attributes
	      storage.load(localStorageName)
	      for (var i=0, attr; attr=attributes[i]; i++) {
	        storage.removeAttribute(attr.name)
	      }
	      storage.save(localStorageName)
	    })
	    store.getAll = function(storage) {
	      var ret = {}
	      store.forEach(function(key, val) {
	        ret[key] = val
	      })
	      return ret
	    }
	    store.forEach = withIEStorage(function(storage, callback) {
	      var attributes = storage.XMLDocument.documentElement.attributes
	      for (var i=0, attr; attr=attributes[i]; ++i) {
	        callback(attr.name, store.deserialize(storage.getAttribute(attr.name)))
	      }
	    })
	  }

	  try {
	    var testKey = '__storejs__'
	    store.set(testKey, testKey)
	    if (store.get(testKey) != testKey) { store.disabled = true }
	    store.remove(testKey)
	  } catch(e) {
	    store.disabled = true
	  }
	  store.enabled = !store.disabled

	  if (typeof module != 'undefined' && module.exports && this.module !== module) { module.exports = store }
	  else if (true) { !(__WEBPACK_AMD_DEFINE_FACTORY__ = (store), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) }
	  else { win.store = store }

	})(Function('return this')());

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)(module)))

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(6);
	__webpack_require__(8);
	__webpack_require__(10);

	__webpack_require__(14);


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	(function() {
	  "use strict";

	  var SceneManager = __webpack_require__(7);

	  SceneManager.prototype.createScene = function() {
	    this.objects = {};

	    this.scene = new PIXI.Container();
	  };

	  /**
	   * @param {Object} entityData
	   */
	  SceneManager.prototype.add = function(entityData) {
	    if (entityData.entity.components.Visual) {
	      var graphics = entityData.entity.components.Visual.getGraphics();
	      this.objects[graphics.id] = entityData.entity;
	      this.scene.addChild(graphics);
	    }
	  };

	  /**
	   * @param {Object} entityData
	   */
	  SceneManager.prototype.remove = function(entityData) {
	    if (entityData.entity.components.Visual) {
	      this.scene.remove(entityData.entity.components.Visual.getGraphics());
	    }
	  };

	  SceneManager.prototype.getEntityByGraphicsId = function(id) {
	    if (this.objects[id]) {
	      return this.objects[id];
	    }
	  };

	  module.exports = SceneManager;
	}());


/***/ },
/* 7 */
/***/ function(module, exports) {

	(function() {
	  "use strict";

	  var SceneManager = function (options) {
	    this.options = options || {};

	    this.eventManager = options.eventManager;

	    this.eventManager.addListener('entity_manager.add', this.add, this);
	    this.eventManager.addListener('entity_manager.remove', this.remove, this);

	    this.createScene();
	  };

	  /**
	   * @returns {SceneManager.scene|*}
	   */
	  SceneManager.prototype.getScene = function() {
	    return this.scene;
	  };

	  SceneManager.prototype.createScene = function() {};

	  /**
	   * @param {wrect.ECS.Entity} entity
	   */
	  SceneManager.prototype.add = function(entity) {};

	  module.exports = SceneManager;
	}());


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	(function() {
	  "use strict";

	  var Renderer = __webpack_require__(9);

	  Renderer.prototype.create = function () {
	    this.renderer = PIXI.autoDetectRenderer(800, 600, { antialias: true });
	    document.body.appendChild(this.renderer.view);
	  };

	  Renderer.prototype.render = function() {
	    this.renderer.render(this.sceneManager.getScene());
	  };

	  module.exports = Renderer;
	}());


/***/ },
/* 9 */
/***/ function(module, exports) {

	(function() {
	  "use strict";

	  var Renderer = function (options) {
	    this.options = options || {};

	    this.options = options || {};
	    this.sceneManager = options.sceneManager;
	    this.axisOrientation = {
	      x: 1,
	      y: -1,
	      z: 1
	    };
	    this.camera = options.camera;

	    this.create();
	  };

	  /**
	   * @param {wrect.Geometry.Dimensions} shape
	   */
	  Renderer.prototype.draw = function(shape) {
	    return shape.draw();
	  };

	  Renderer.prototype.create = function () {
	    console.log(('Create needs to be implemented'));
	  };
	  
	  Renderer.prototype.render = function() {
	    console.log(('Render needs to be implemented'));
	  };

	  ///**
	  // * @param {wrect.Geometry.Rectangle} rectangle
	  // */
	  //wrect.Core.Renderer.prototype.drawRectangle = function(rectangle) {};
	  //
	  ///**
	  // * @param {wrect.Geometry.Circle} circle
	  // */
	  //wrect.Core.Renderer.prototype.drawCircle = function(circle) {};
	  //
	  ///**
	  // * @param {wrect.Geometry.Polygon} polygon
	  // */
	  //wrect.Core.Renderer.prototype.drawPolygon = function(polygon) {};
	  //
	  ///**
	  // * @param {wrect.Geometry.Polyhedron} polyhedron
	  // */
	  //wrect.Core.Renderer.prototype.drawPolyhedron = function(polyhedron) {};

	  module.exports = Renderer;
	}());


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	(function() {
	  "use strict";

	  var Visual = __webpack_require__(11);

	  Visual.prototype.setPosition = function(x, y, z) {
	    if (this.graphics.position.x !== x || this.graphics.position.y !== y || this.graphics.position.z !== z) {
	      this.graphics.position.set(x, y, z);
	    }
	  };
	  
	  module.exports = Visual;
	}());


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	(function() {
	  "use strict";

	  var BaseComponent = __webpack_require__(12);
	  
	  var Vector = __webpack_require__(13);

	  var Visual = function (options) {
	    BaseComponent.call(this);

	    this.options = options || {};
	    this.shape = options.shape;

	    if (this.options.alpha == undefined) {
	      this.options.alpha = 1;
	    }

	    this.graphics = this.options.renderer.draw(this.shape);
	  };

	  Visual.prototype = Object.create( BaseComponent.prototype );
	  Visual.prototype.constructor = Visual;
	  Visual.prototype.name = 'Visual';

	  Visual.prototype.getGraphics = function() {
	    return this.graphics;
	  };

	  Visual.prototype.setPosition = function(x, y) {
	    console.log('SetPosition needs to be implemented');
	  };
	  
	  module.exports = Visual;
	}());


/***/ },
/* 12 */
/***/ function(module, exports) {

	(function() {
	  "use strict";

	  var BaseComponent = function () {
	  };

	  BaseComponent.prototype.name = 'BaseComponent';
	  
	  module.exports = BaseComponent;
	}());


/***/ },
/* 13 */
/***/ function(module, exports) {

	(function() {
	  "use strict";

	  /**
	   * @class Vector
	   * @param {Number} x
	   * @param {Number} y
	   * @returns {Vector}
	   * @constructor
	   */
	  var Vector = function(x, y) {
	    this.x = x;
	    this.y = y;
	    return this;
	  };

	  /**
	   * Calculates the distance between 2 vectors.
	   * @param {wrect.Physics.Vector} v
	   * @returns {Number}
	   */
	  Vector.prototype.distance = function (v) {
	    var resultVector = this.subtract(v);
	    return resultVector.len();
	  };

	  /**
	   * subtracts vectors
	   * @param {wrect.Physics.Vector} v vector
	   * @returns {wrect.Physics.Vector} vector
	   */
	  Vector.prototype.subtract = function(v) {
	    return new Vector(this.x - v.x, this.y - v.y);
	  };

	  /**
	   * adds vectors
	   * @param {wrect.Physics.Vector} v vector
	   * @returns {wrect.Physics.Vector} vector
	   */
	  Vector.prototype.add = function(v) {
	    return new Vector(this.x + v.x, this.y + v.y);
	  };

	  /**
	   *
	   * @param {Number} s
	   * @returns {wrect.Physics.Vector}
	   */
	  Vector.prototype.scale = function(s) {
	    return new Vector(this.x * s, this.y * s);
	  };

	  /**
	   * multiply vector with scalar or other vector
	   * @param {Number|wrect.Physics.Vector} v vector or number
	   * @returns {Number|wrect.Physics.Vector} result
	   */
	  Vector.prototype.multiply = function(v) {
	    if (typeof v === 'number') {
	      return new Vector(this.x * v, this.y * v);
	    }

	    return new Vector(this.x * v.x, this.y * v.y);
	  };

	  /**
	   * @param {Number} v
	   */
	  Vector.prototype.divide = function(v) {
	    if (typeof v === 'number') {
	      return new Vector(this.x / v, this.y / v);
	    }
	    throw new Error('only divide by scalar supported');
	  };

	  /**
	   * @returns {Number} length of vector
	   */
	  Vector.prototype.len = function() {
	    return Math.sqrt(this.x * this.x + this.y * this.y);
	  };

	  /**
	   * normalize vector to unit vector
	   * @returns {wrect.Physics.Vector} unit vector [v0, v1]
	   */
	  Vector.prototype.unit = function() {
	    var l = this.len();
	    if(l) {
	      return new Vector(this.x / l, this.y / l);
	    }
	    return new Vector(0, 0);
	  };

	  /**
	   *
	   * @param scalar
	   * @returns {Number|wrect.Physics.Vector}
	   */
	  Vector.prototype.unitScalar = function(scalar) {
	    return this.unit().multiply(scalar);
	  };

	  Vector.prototype.cross = function(v) {
	    return (this.x * v.y - this.y * v.x);
	  };

	  /**
	   *
	   * @param {Number} angle
	   * @param {wrect.Physics.Vector} vector
	   * @returns {wrect.Physics.Vector}
	   */
	  Vector.prototype.rotate = function(angle, vector) {
	    var x = this.x - vector.x;
	    var y = this.y - vector.y;

	    return new Vector(
	        vector.x + ((x * Math.cos(angle)) - (y * Math.sin(angle))),
	        vector.y + ((x * Math.sin(angle)) + (y * Math.cos(angle)))
	    );
	  };

	  /**
	   * rotate vector
	   * @param {Number} angle to rotate vector by, radians. can be negative
	   * @returns {wrect.Physics.Vector} rotated vector
	   */
	  Vector.prototype.rotateAngle = function(angle){
	    angle = window.game.getHelpers().math.normaliseRadians(angle);
	    return new Vector(this.x * Math.cos(angle)- this.y * Math.sin(angle),
	        this.x * Math.sin(angle)+this.y*Math.cos(angle));
	  };

	  /**
	   *
	   * calculate vector dot product
	   * @param {wrect.Physics.Vector} v
	   * @returns {Number} dot product of this vector and vector v
	   */
	  Vector.prototype.dot = function(v){
	    return (this.x * v.x) + (this.y * v.y);
	  };

	  /**
	   *
	   * calculate angle between vectors
	   * @param {wrect.Physics.Vector} v
	   * @returns {Number} angle between this vector and v in radians
	   */
	  Vector.prototype.angle=function(v){
	    var perpDot = this.x * v.y - this.y * v.x;
	    return Math.atan2(perpDot, this.dot(v));
	  };

	  /**
	   * @returns {wrect.Physics.Vector} vector with max length as specified.
	   */
	  Vector.prototype.truncate = function(maxLength) {
	    if (this.len() > maxLength) {
	      var unitVector = this.unit();
	      return unitVector.multiply(maxLength);
	    }
	    return this;
	  };

	  /**
	   * Get the perpendicular vector to this edge.
	   * @returns {wrect.Physics.Vector}
	   */
	  Vector.prototype.perpendicular = function() {
	    return new Vector(-this.y, this.x);
	  };

	  module.exports = Vector;
	}());


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	(function() {
	  "use strict";

	  var Vector = __webpack_require__(13);
	  var Rectangle = __webpack_require__(15);

	  Rectangle.prototype.draw = function() {
	    var graphics = new PIXI.Graphics();

	    graphics.beginFill(this.options.material.color, this.options.material.alpha);
	    graphics.drawRect(0, 0, this.dimension.x, this.dimension.y);
	    graphics.endFill();

	    return graphics;
	  };

	  Rectangle.prototype.rotate = function(origin) {

	  };
	  
	  module.exports = Rectangle;  
	}());


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	(function() {
	  "use strict";

	  var Dimensions = __webpack_require__(16);

	  var Vector = __webpack_require__(13);

	  /**
	   *
	   * @class Rectangle
	   * @constructor
	   */
	  var Rectangle = function (options) {
	    Dimensions.call(this);

	    this.options = options;
	    this.origin = options.origin;
	    this.dimension = options.dimension;

	    var widthVector = new Vector(this.dimension.x, 0);
	    var heightVector = new Vector(0, this.dimension.y);

	    this.vertices = [
	      options.origin,
	      options.origin.add(widthVector),
	      options.origin.add(widthVector).add(heightVector),
	      options.origin.add(heightVector)
	    ];

	    this.offsetVertices = [
	      new Vector(0, 0),
	      new Vector(0, 0),
	      new Vector(0, 0),
	      new Vector(0, 0)
	    ]
	  };

	  Rectangle.prototype = Object.create( Dimensions.prototype );
	  Rectangle.prototype.constructor = Rectangle;

	  Rectangle.prototype.getVertices = function() {
	    return this.vertices;
	  };

	  Rectangle.prototype.getCollisionVertices = function() {
	    return this.vertices;
	  };

	  Rectangle.prototype.draw = function(renderer) {};
	  Rectangle.prototype.rotate = function(origin) {};
	  
	  module.exports = Rectangle;
	}());


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	(function() {
	  "use strict";

	  var Vector = __webpack_require__(13);

	  /**
	   *
	   * @class Dimensions
	   * @constructor
	   */
	  var Dimensions = function () {
	    this.vertices = [];
	    this.originalVertices = [];
	    this.origin = new Vector(0, 0);
	    this.previousOrigin = null;

	    this.offset = new Vector(0, 0);
	  };

	  Dimensions.prototype.move = function(v) {
	    for(var vertexIndex in this.vertices) {
	      var vertex = this.vertices[vertexIndex];

	      this.vertices[vertexIndex] = vertex.add(v);
	    }
	    
	    this.origin = this.origin.add(v);
	  };

	  Dimensions.prototype.setOrigin = function(v) {
	    this.origin = v;
	    this.updateVertices();
	  };

	  Dimensions.prototype.updateVertices = function() {
	  };

	  Dimensions.prototype.rotate = function() {};
	  Dimensions.prototype.getVertices = function() {};
	  Dimensions.prototype.getCollisionVertices = function() {};
	  Dimensions.prototype.getCenter = function() {};
	  Dimensions.prototype.draw = function() {};
	  
	  module.exports = Dimensions;
	}());


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	window.onload = function() {

	  var Game = __webpack_require__(18);
	  var game = new Game(
	    {
	      renderer: __webpack_require__(9),
	      sceneManager: __webpack_require__(7),
	      bundles: [
	        __webpack_require__(39)
	      ]
	    }
	  );
	  game.bootstrap();
	  game.run();

	  //game.tileMapManager.loadMap('resources/levels/tilemap/kitchen.json');
	};


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	(function() {
	  "use strict";

	  var Renderer;
	  var SceneManager;
	  var Bundles;

	  /**
	   * @constructor
	   */
	  var Game = function(options) {
	    Renderer = options.renderer || __webpack_require__(9);
	    SceneManager = options.sceneManager || __webpack_require__(7);
	    Bundles = options.bundles || [];
	  };

	  Game.prototype.bootstrap = function() {

	    this.completeTree = [];
	    this.treeHashes = [];

	    var EventManager = __webpack_require__(19);
	    this.eventManager = new EventManager();

	    var EntityManager = __webpack_require__(21);
	    this.entityManager = new EntityManager({eventManager: this.eventManager});

	    var GameTime = __webpack_require__(22);
	    this.gameTime = new GameTime({
	      eventManager: this.eventManager
	    });

	    this.sceneManager = new SceneManager({eventManager: this.eventManager});

	    var Camera = __webpack_require__(23);
	    this.camera = new Camera();

	    this.renderer = new Renderer({
	      sceneManager: this.sceneManager,
	      camera: this.camera
	    });

	    var TileMapManager = __webpack_require__(24);
	    this.tileMapManager = new TileMapManager(this);

	    var RawInputHandler = __webpack_require__(25);
	    var InputHandler = __webpack_require__(28);
	    var ControlMapHandler = __webpack_require__(29);
	    var Linker = __webpack_require__(30);
	    var Animator = __webpack_require__(31);
	    var PhysicsEngine = __webpack_require__(32);
	    var Mover = __webpack_require__(38);

	    this.systems = {
	      pre: {
	        RawInputHandler: {
	          system: new RawInputHandler(
	            {
	              game: this,
	              elementId: 'body',
	              eventManager: this.eventManager
	            }
	          )
	        },
	        InputHandler: {
	          system: new InputHandler(
	            {
	              game: this,
	              eventManager: this.eventManager
	            }
	          )
	        },
	        ControlMapHandler: {
	          system: new ControlMapHandler(
	            {
	              game: this
	            }
	          )
	        },
	        Linker: {
	          system: new Linker({game: this})
	        },
	        Animator: {
	          system: new Animator({game: this})
	        }
	      },
	      main: {
	        Physics: {
	          system: new PhysicsEngine({game: this})
	        }
	      },
	      post: {
	        Mover: {
	          system: new Mover({game: this})
	        }
	        //,
	        //Transformer: {
	        //  system: new Transformer()
	        //}
	      }
	    };

	    this.loadBundles();
	  };

	  Game.prototype.loadBundles = function() {
	     for (var bundleIndex = 0; bundleIndex < Bundles.length; bundleIndex++) {
	      var bundle = new Bundles[bundleIndex]({game: this});
	      bundle.init();
	     }
	  };

	  Game.prototype.run = function() {
	    var self = this;
	    //var clock = new THREE.Clock();

	    requestAnimationFrame(run);

	    function run(timestamp) {
	      if (self.pause) {return;}
	      requestAnimationFrame(run);

	      self.gameTime.updateTime(timestamp);

	      self.getEventManager().trigger('game.updateStart');

	      runSystemGroup(self.systems.pre);
	      runSystemGroup(self.systems.main);
	      runSystemGroup(self.systems.post);

	      self.getEventManager().trigger('game.updateEnd');

	      self.getRenderer().render();
	    }

	    function runSystemGroup(systems) {
	      for (var systemIndex in  systems) if (systems.hasOwnProperty(systemIndex)) {
	        var preSystem = systems[systemIndex].system;

	        preSystem.run();
	      }
	    }
	  };

	  /**
	   * @returns {wrect.Core.Rendering.Camera|*}
	   */
	  Game.prototype.getCameraManager = function() {
	    return this.camera;
	  };

	  /**
	   *
	   * @returns {wrect.Core.EventManager|*}
	   */
	  Game.prototype.getEventManager = function() {
	    return this.eventManager;
	  };

	  /**
	   * @returns {wrect.Core.EntityManager|*}
	   */
	  Game.prototype.getEntityManager = function() {
	    return this.entityManager;
	  };

	  /**
	   * @returns {wrect.Core.Renderer|*}
	   */
	  Game.prototype.getRenderer = function() {
	    return this.renderer;
	  };

	  /**
	   * @returns {wrect.Core.SceneManager|*}
	   */
	  Game.prototype.getSceneManager = function() {
	    return this.sceneManager;
	  };

	  /**
	   * @returns {wrect.Core.GameTime|*}
	   */
	  Game.prototype.getGameTime = function() {
	    return this.gameTime;
	  };

	  /**
	   * @returns {Game}
	   */
	  Game.prototype.getGame = function() {
	    return this;
	  };

	  module.exports = Game;
	}());


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	(function() {
	  "use strict";

	  /**
	   * Wrapper class for Minivents
	   * @type {Events}
	   * @class EventManager
	   * @constructor
	   */
	  var EventManager = function() {
	    var Events = __webpack_require__(20);    
	    Events.call(this);
	  };

	  /**
	   * Inheritance logic
	   */
	  EventManager.prototype = Object.create( Event.prototype );
	  EventManager.prototype.constructor = window.EventManager;

	  /**
	   * Triggers an event
	   * @param type
	   * @param [data]
	   */
	  EventManager.prototype.trigger = function(type, data) {
	    this.emit(type, data);
	  };

	  /**
	   * Subscribes a listener to an event
	   * @param type
	   * @param func
	   * @param [ctx]
	   */
	  EventManager.prototype.addListener = function(type, func, ctx) {
	    this.on(type, func, ctx);
	  };

	  /**
	   * Removes a listener to an event
	   * @param type
	   * @param func
	   */
	  EventManager.prototype.removeListener = function(type, func) {
	    this.off(type, func);
	  };

	  module.exports = EventManager;
	}());


/***/ },
/* 20 */
/***/ function(module, exports) {

	function Events(target){
	  var events = {}, i, list, args, A = Array;
	  target = target || this
	    /**
	     *  On: listen to events
	     */
	    target.on = function(type, func, ctx){
	      events[type] || (events[type] = [])
	      events[type].push({f:func, c:ctx})
	    }
	    /**
	     *  Off: stop listening to event / specific callback
	     */
	    target.off = function(type, func){
	      list = events[type] || []
	      i = list.length = func ? list.length : 0
	      while(i-->0) func == list[i].f && list.splice(i,1)
	    }
	    /** 
	     * Emit: send event, callbacks will be triggered
	     */
	    target.emit = function(){
	      args = A.apply([], arguments)
	      list = events[args.shift()] || []
	      i = list.length
	      for(j=0;j<i;j++) list[j].f.apply(list[j].c, args) 
	    };
	}
	var u, module, cjs = module != u;
	(cjs ? module : window)[(cjs ? 'exports' : 'Events')] = Events;


/***/ },
/* 21 */
/***/ function(module, exports) {

	(function() {
	  "use strict";

	  /**
	   * @class EntityManager
	   * @constructor
	   */
	  var EntityManager = function(options) {
	    this._entities = [];
	    this._entitiesByName = {};
	    this.eventManager = options.eventManager;
	  };

	  /**
	   * @param {Entity} entity
	   */
	  EntityManager.prototype.addEntity = function(entity){
	    this._entities.push(entity);
	    this._entitiesByName[entity.getId()] = entity;
	    this.eventManager.trigger('entity_manager.add', {entity: entity});
	  };

	  /**
	   * @param {Entity} entity
	   */
	  EntityManager.prototype.removeEntity = function(entity){
	    var index;
	    console.log(this._entities, entity);
	    if ((index = this._entities.indexOf(entity)) != -1) {
	      this._entities.splice(index, 1);
	      delete this._entitiesByName[entity.name];

	      this.eventManager.trigger('entity_manager.remove', {entity: entity});
	    }
	  };

	  /**
	   * @param {string} name
	   */
	  EntityManager.prototype.removeEntityByName = function(name) {
	    var entity = this._entitiesByName[name];
	    if (entity) {
	      this.removeEntity(entity);
	    }
	  };

	  /**
	   * Returns all entities
	   * @returns {*}
	   */
	  EntityManager.prototype.getAllEntities = function(){
	    return this._entities;
	  };

	  /**
	   * Returns all entities indexed by name
	   * @returns {*}
	   */
	  EntityManager.prototype.getAllEntitiesByName = function() {
	      return this._entitiesByName;
	  };

	  /**
	   * Get a single entity by name
	   * @param name
	   * @returns {*}
	   */
	  EntityManager.prototype.getEntityByName = function(name){
	    return this._entitiesByName[name];
	  };

	  /**
	   * Get all entities where partOfName is a part of their name
	   * THIS. IS. SLOW.
	   * @param partOfName
	   * @returns {Array}
	   */
	  EntityManager.prototype.getEntitiesByName = function(partOfName){
	    var found = [];
	    for (var i = 0; i < this._entities.length; i++) {
	      if (this._entities[i].name.indexOf(partOfName) != -1) {
	        found.push(this._entities[i]);
	      }
	    }

	    return found;
	  };

	  EntityManager.prototype.clearEntities = function(clearStage) {
	    this._entities = [];
	    this._entitiesByName = {};
	  };

	  /**
	   * Update all entities, called in Game.run();
	   */
	  EntityManager.prototype.update = function() {
	    for (var i = 0; i < this._entities.length; i++) {
	      this._entities[i].update();
	    }
	  };

	  EntityManager.prototype.deselectAll = function() {
	    for (var i = 0; i < this._entities.length; i++) {
	      this._entities[i].deselect();
	    }
	  };

	  /**
	   * Update all entities, called in Game.run();
	   */
	  EntityManager.prototype.update = function() {
	    for (var i = 0; i < this._entities.length; i++) {
	      this._entities[i].update();
	    }
	  };

	  EntityManager.prototype.deselectAll = function() {
	    for (var i = 0; i < this._entities.length; i++) {
	      this._entities[i].deselect();
	    }
	  };

	  module.exports = EntityManager;
	})();


/***/ },
/* 22 */
/***/ function(module, exports) {

	(function() {
	  "use strict";

	  /**
	   * Wrapper class for Minivents
	   * @class GameTime
	   * @constructor
	   */
	  var GameTime = function(options) {
	    this.eventManager = options.eventManager;
	    this.previousTime = 0;
	    this.timeDelta = 0;
	  };

	  GameTime.prototype.updateTime = function(timeStamp) {
	    this.timeDelta = timeStamp - this.previousTime;
	    this.previousTime = timeStamp;
	  };

	  GameTime.prototype.getDelta = function() {
	    return this.timeDelta;
	  };

	  GameTime.prototype.getPreviousTime = function() {
	    return this.previousTime;
	  };

	  module.exports = GameTime;
	}());


/***/ },
/* 23 */
/***/ function(module, exports) {

	(function() {
	  "use strict";

	  var Camera = function(options) {}

	  module.exports = Camera;
	}());


/***/ },
/* 24 */
/***/ function(module, exports) {

	(function() {
	  'use strict';
	  var wrect = window.wrect;

	  /**
	   * Manages tile maps
	   * @constructor
	   */
	  var TileMapManager = function(game) {
	    this.game = game;
	    this.currentTileMap = null;
	    this.visibleDimensions = null;
	    this.previousVisibleDimensions = null;
	    this.game.getEventManager().addListener('game.updateEnd', this.update, this);
	  };

	  TileMapManager.prototype.update = function() {
	    if (this.currentTileMap) {
	      if (this.viewportChanged()) {
	        this.updateTiles();
	        this.previousVisibleDimensions.origin.x = this.visibleDimensions.origin.x;
	        this.previousVisibleDimensions.origin.y = this.visibleDimensions.origin.y;
	      }
	    }
	  };

	  TileMapManager.prototype.viewportChanged = function() {
	    return this.previousVisibleDimensions.origin.x !== this.visibleDimensions.origin.x || this.previousVisibleDimensions.origin.y !== this.visibleDimensions.origin.y;
	  };

	  TileMapManager.prototype.updateTiles = function() {
	    this.currentTileMap.updateTiles(this.visibleDimensions);
	  };

	  TileMapManager.prototype.getCurrentTileMap = function() {
	    return this.currentTileMap;
	  };

	  TileMapManager.prototype.loadMap = function(path, mapper) {
	    if (this.currentTileMap) {
	      this.destroyCurrentTileMap();
	    }
	    var parser = new Parser();
	    parser.loadTilemap(path, this.loadCallback, this, mapper);
	  };

	  TileMapManager.prototype.loadCallback = function(tileMap) {
	    this.currentTileMap = tileMap;
	    tileMap.init();
	    this.visibleDimensions = this.game.getCamera().getDimensions();
	    this.previousVisibleDimensions = Helpers.object.copy(this.visibleDimensions);
	    tileMap.build(this.visibleDimensions);

	    var ball = new wrect.ECS.Assemblage.Ball({
	      x: 260,
	      y: 350,
	      radius: 20,
	      color: 0xF0E000
	    });
	    game.getEntityManager().addEntity(ball);

	    ball.components.RigidBody.gravity = true;
	    ball.addComponent(new wrect.ECS.Component.ControlScheme.Player());

	    ball.components.RigidBody.physicsBody.m = 1;
	    //ball.components.RigidBody.physicsBody.f = ball.components.RigidBody.physicsBody.f.add(new wrect.Physics.Vector(50,45));
	  };

	  TileMapManager.prototype.destroyCurrentTileMap = function() {
	    // DESTROY
	  };

	  module.exports = TileMapManager;
	  
	}());


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	(function() {
	  "use strict";

	  var BaseSystem = __webpack_require__(26);
	  var Constants = __webpack_require__(27);

	  var RawInputHandler = function (options) {
	    BaseSystem.call(this, options);

	    this.options = options || {};

	    this.eventManager = options.eventManager;

	    this.keys = [];
	    this.pressedKeys = [];
	    this.pressedKeyEvents = {};
	    this.releasedKeys = [];
	    this.watchedTypes = [];
	    this.types = [];

	    var self = this;

	    this.captureElement = document.getElementById(this.options.elementId);    
	    this.captureElement.addEventListener('keydown', function(event) {self.keyDown.call(self, event);});
	    this.captureElement.addEventListener('keyup', function(event) {self.keyUp.call(self, event);});
	    this.captureElement.addEventListener('mousemove', function(event) {self.mouseMove.call(self, event);});
	    this.captureElement.addEventListener('mousedown', function(event) {self.mouseDown.call(self, event);});
	  };

	  RawInputHandler.prototype = Object.create( BaseSystem.prototype );
	  RawInputHandler.prototype.constructor = RawInputHandler;
	  RawInputHandler.prototype.name = 'RawInputHandler';

	  RawInputHandler.prototype.checkDependencies = function(entity) {
	    return entity.components.RawInputMap && entity.components.ContextMap ? true : false;
	  };

	  RawInputHandler.prototype.addEntity = function(data) {
	    if (this.checkDependencies(data.entity) && this.entities.indexOf(data.entity) === -1) {
	      this.entities.push(data.entity);
	      this.registerRawKeys(data.entity);
	    }
	  };

	  RawInputHandler.prototype.registerRawKeys = function(entity) {
	    var newKeys = entity.components.RawInputMap.keys;

	    for (var newKeyIndex in newKeys) if (newKeys.hasOwnProperty(newKeyIndex)) {
	      var keyCode = newKeys[newKeyIndex];
	      if (this.keys.indexOf(keyCode) === -1) {
	        this.keys.push(keyCode);
	        this.pressedKeyEvents[keyCode] = false;
	      }
	    }

	    this.watchedTypes = entity.components.RawInputMap.types;
	  };

	  RawInputHandler.prototype.perform = function(entity) {
	    this.eventManager.trigger('raw_input_handler.context.perform', {
	      entity: entity,
	      pressedKeys: this.pressedKeys,
	      releasedKeys: this.releasedKeys,
	      types: this.types
	    });

	    this.releasedKeys = [];
	    this.types = {};
	  };

	  RawInputHandler.prototype.keyDown = function(event) {
	    if (this.shouldWatchKey.call(this, event.keyCode) && !this.watchedKey.call(this, event.keyCode)) {
	      this.pressedKeys.push(event.keyCode);
	      this.releasedKeys.splice(this.releasedKeys.indexOf(event.keyCode), 1);
	      this.pressedKeyEvents[event.keyCode] = event;
	    }
	  };

	  RawInputHandler.prototype.keyUp = function(event) {
	    if (this.shouldWatchKey.call(this, event.keyCode) && this.watchedKey.call(this, event.keyCode)) {
	      this.pressedKeys.splice(this.pressedKeys.indexOf(event.keyCode), 1);
	      this.releasedKeys.push(event.keyCode);
	      this.pressedKeyEvents[event.keyCode] = false;
	    }
	  };

	  RawInputHandler.prototype.mouseMove = function(event) {
	    if (this.watchedTypes.indexOf(Constants.Input.CURSOR) !== -1) {
	      this.types[Constants.Input.CURSOR] = {
	        x: event.x,
	        y: event.y
	      };
	    }
	  };

	  RawInputHandler.prototype.mouseDown = function(event) {
	    if (this.watchedTypes.indexOf(Constants.Input.LEFT_CLICK) !== -1 && event.button === 0) {
	      this.types[Constants.Input.LEFT_CLICK] = {
	        x: event.x,
	        y: event.y
	      };
	    }

	    if (this.watchedTypes.indexOf(Constants.Input.RIGHT_CLICK) !== -1 && event.button === 2) {
	      this.types[Constants.Input.RIGHT_CLICK] = {
	        x: event.x,
	        y: event.y
	      };
	    }
	  };

	  RawInputHandler.prototype.shouldWatchKey = function(keyCode) {
	    return this.keys.indexOf(keyCode) !== -1;
	  };

	  RawInputHandler.prototype.watchedKey = function(keyCode) {
	    return this.pressedKeys.indexOf(keyCode) !== -1;
	  };
	  
	  module.exports = RawInputHandler;
	}());


/***/ },
/* 26 */
/***/ function(module, exports) {

	(function() {
	  "use strict";

	  /**
	   * @param {Object} options
	   * @constructor
	   */
	  var BaseSystem = function (options) {
	    /**
	     * @type {wrect.ECS.Entity[]}
	     */
	    this.entities = [];
	    this.options = options;
	    var game = options.game;
	    game.getEventManager().addListener('entity.component.add', this.addEntity, this);
	    game.getEventManager().addListener('entity.component.remove', this.removeEntity, this);
	  };

	  BaseSystem.prototype.removeEntity = function(data) {
	    //this.entities.push(entity);
	  };

	  BaseSystem.prototype.addEntity = function(data) {
	    if (this.checkDependencies(data.entity) && this.entities.indexOf(data.entity) === -1) {
	      this.entities.push(data.entity);
	    }
	  };

	  BaseSystem.prototype.checkDependencies = function(entity) {
	    return entity;
	  };

	  BaseSystem.prototype.run = function() {
	    for (var e = 0; e < this.entities.length; e++) {
	      this.perform(this.entities[e]);
	    }
	  };

	  /**
	   * @param {wrect.ECS.Entity} entity
	   */
	  BaseSystem.prototype.perform = function(entity) {
	    console.log('Implemented wrect.ECS.System needs to do something with an entity ... right?');
	  };
	  
	  module.exports = BaseSystem;
	}());


/***/ },
/* 27 */
/***/ function(module, exports) {

	(function() {
	  "use strict";

	  var Constants = {
	    KeyMap: {
	      SHIFT: 16,
	      NUMPAD_0: 97,
	      NUMPAD_1: 97,
	      NUMPAD_2: 98,
	      NUMPAD_3: 99,
	      NUMPAD_4: 100,
	      NUMPAD_5: 101,
	      NUMPAD_6: 102,
	      NUMPAD_7: 103,
	      NUMPAD_8: 104,
	      NUMPAD_9: 105
	    },

	    Input: {
	      CURSOR: 'CURSOR',
	      LEFT_CLICK: 'LEFT_CLICK',
	      RIGHT_CLICK: 'RIGHT_CLICK'
	    }
	  };

	  module.exports = Constants;
	}());


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	(function() {
	  "use strict";

	  var BaseSystem = __webpack_require__(26);

	  /**
	   * @constructor
	   */
	  var InputHandler = function (options) {
	    BaseSystem.call(this, options);

	    this.options = options || {};

	    this.eventManager = options.eventManager;

	    this.eventManager.addListener('raw_input_handler.context.perform', this.handleInput, this);
	  };

	  InputHandler.prototype = Object.create( BaseSystem.prototype );
	  InputHandler.prototype.constructor = InputHandler;
	  InputHandler.prototype.name = 'InputHandler';

	  InputHandler.prototype.checkDependencies = function(entity) {
	    return false;
	  };

	  InputHandler.prototype.perform = function(entity) {};

	  /**
	   * @param event
	   */
	  InputHandler.prototype.handleInput = function(event) {
	    var entity = event.entity;
	    var contextMap = entity.components.ContextMap;
	    var controlMap = entity.components.ControlMap;
	    var pressedKeys = event.pressedKeys;
	    var releasedKeys = event.releasedKeys;
	    var types = event.types;

	    for (var releasedKeysIndex in releasedKeys) if (releasedKeys.hasOwnProperty(releasedKeysIndex)) {
	      var releasedKey = releasedKeys[releasedKeysIndex];

	      this.refreshAction(releasedKey, contextMap, controlMap);
	    }

	    for (var pressedKeysIndex in pressedKeys) if (pressedKeys.hasOwnProperty(pressedKeysIndex)) {
	      var pressedKey = pressedKeys[pressedKeysIndex];

	      this.handleAction(pressedKey, contextMap, controlMap);
	      this.handleState(pressedKey, contextMap, controlMap);
	    }

	    for (var typesIndex in types) if (types.hasOwnProperty(typesIndex)) {
	      var type = types[typesIndex];
	      this.handleRange(type, typesIndex, contextMap, controlMap);
	    }
	  };

	  InputHandler.prototype.refreshAction = function(releasedKey, contextMap) {
	    if (releasedKey in contextMap.actions) {
	      var action = contextMap.actions[releasedKey];

	      action.state = wrect.ECS.Component.Input.Constants.STATES.OFF;
	    }
	  };

	  InputHandler.prototype.handleAction = function(pressedKey, contextMap, controlMap) {
	    if (pressedKey in contextMap.actions) {
	      var action = contextMap.actions[pressedKey];

	      if (action.state === wrect.ECS.Component.Input.Constants.STATES.OFF) {
	        controlMap.actions.push(action);
	        action.state = wrect.ECS.Component.Input.Constants.STATES.ON;
	      }
	    }
	  };

	  InputHandler.prototype.handleState = function(pressedKey, contextMap, controlMap) {
	    if (pressedKey in contextMap.states) {
	      var action = contextMap.states[pressedKey];

	      controlMap.actions.push(action);
	    }
	  };

	  InputHandler.prototype.handleRange = function(type, typesIndex, contextMap, controlMap) {
	    if (typesIndex in contextMap.ranges) {
	      var range = contextMap.ranges[typesIndex];

	      if (!(range in controlMap.actions)) {
	        range.values = type;
	        controlMap.actions.push(range);
	      }
	    }
	  };

	  module.exports = InputHandler;
	}());


/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	(function() {
	  "use strict";

	  var BaseSystem = __webpack_require__(26);
	  /**
	   * @constructor
	   */
	  var ControlMapHandler = function (options) {
	    BaseSystem.call(this, options);

	    this.options = options || {};
	  };

	  ControlMapHandler.prototype = Object.create( BaseSystem.prototype );
	  ControlMapHandler.prototype.constructor = ControlMapHandler;
	  ControlMapHandler.prototype.name = 'ControlMapHandler';

	  ControlMapHandler.prototype.checkDependencies = function(entity) {
	    return entity.components.ControlMap ? true : false;
	  };

	  ControlMapHandler.prototype.perform = function(entity) {
	    var controls = entity.components.ControlMap.controls;
	    var actions = entity.components.ControlMap.actions;
	    for (var actionIndex in  actions) if (actions.hasOwnProperty(actionIndex)) {
	      var action = actions[actionIndex];
	      if (controls[action.action]) {
	        controls[action.action](entity, action.values);
	        actions.splice(actions.indexOf(action), 1);
	      }
	    }
	  };

	  module.exports = ControlMapHandler;
	}());


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	(function() {
	  "use strict";

	  var BaseSystem = __webpack_require__(26);
	  var Linker = function (options) {
	    BaseSystem.call(this, options);

	    this.options = options || {};

	    //game.getEventManager().addListener('physics.move', this.link, this);
	  };

	  Linker.prototype = Object.create( BaseSystem.prototype );
	  Linker.prototype.constructor = Linker;

	  Linker.prototype.name = 'Linker';

	  Linker.prototype.checkDependencies = function(entity) {
	    return entity.components.Link ? true : false;
	  };

	  Linker.prototype.link = function(data) {
	    var entity = data.entity;
	    if (this.checkDependencies(entity)) {
	    }
	  };

	  Linker.prototype.perform = function(entity) {
	    var linkedEntity = entity.components.Link.linkedEntity;

	    //linkedEntity.components.RigidBody.dimensions.move(new Vector(1, 0));

	    linkedEntity.components.RigidBody.dimensions.origin = entity.components.RigidBody.dimensions.origin;
	    linkedEntity.components.RigidBody.dimensions.origin = linkedEntity.components.RigidBody.dimensions.origin.add(entity.components.Link.joint);
	  };

	  module.exports = Linker;
	}());


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	(function() {
	  "use strict";

	  var BaseSystem = __webpack_require__(26);
	  var Animator = function (options) {
	    BaseSystem.call(this, options);

	    this.options = options || {};
	    this.lastFrame = 0;
	    this.currentFrame = 0;
	    this.interval = 0;
	  };

	  Animator.prototype = Object.create( BaseSystem.prototype );
	  Animator.prototype.constructor = Animator;

	  Animator.prototype.name = 'Animator';

	  Animator.prototype.checkDependencies = function(entity) {
	    return entity.components.Animation ? true : false;
	  };

	  Animator.prototype.run = function() {
	    var gameTime = this.options.game.gameTime;

	    this.interval = gameTime.getPreviousTime() - this.lastFrame;
	    this.currentFrame = gameTime.getPreviousTime();

	    for (var e = 0; e < this.entities.length; e++) {
	      var entity = this.entities[e];
	      var animation = entity.components.Animation;

	      animation.timer += gameTime.getDelta();


	      for (var s = 0; s < animation.playingAnimationIds.length; s++) {
	        var scriptedAnimation = animation.scriptedAnimations[animation.playingAnimationIds[s]];
	        /**
	         * @type {actions}
	         */
	        var actions = scriptedAnimation.actions;

	        for (var actionIndex in actions) if (actions.hasOwnProperty(actionIndex)) {
	          var action = actions[actionIndex];

	          if (animation.timer >= actionIndex && action.state === 0) {
	            action.perform(entity);
	            action.state = 1;
	          }
	        }
	      }

	      if (animation.timer >= animation.endTime) {
	        console.log('animation done');
	        console.log('resetting');
	        animation.timer = 0;

	        /**
	         * @type {actions}
	         */
	        var actionsEnd = scriptedAnimation.actions;

	        for (var actionIndexEnd in actionsEnd) if (actionsEnd.hasOwnProperty(actionIndexEnd)) {
	          var actionEnd = actionsEnd[actionIndexEnd];

	          if (actionEnd.state === 1) {
	            actionEnd.state = 0;
	          }
	        }
	      }
	    }
	  };

	  /**
	   * @param {wrect.ECS.Component.ScriptedAnimation} scriptedAnimation
	   */
	  Animator.prototype.perform = function(scriptedAnimation) {

	  };

	  /**
	   * @param {wrect.ECS.Component.Animation} animation
	   * @param {wrect.ECS.Component.ScriptedAnimation} scriptedAnimation
	   * @param {int} index
	   */
	  Animator.prototype.start = function(animation, scriptedAnimation, index) {
	    scriptedAnimation.state = wrect.Component.Animation.states.playing;
	    scriptedAnimation.state = wrect.Component.Animation.startFrame = this.currentFrame;
	    animation.playingAnimationIds.push(index);
	  };

	  /**
	   * @param {wrect.ECS.Component.Animation} animation
	   * @param {wrect.ECS.Component.ScriptedAnimation} scriptedAnimation
	   * @param {int} index
	   */
	  Animator.prototype.stop = function(animation, scriptedAnimation, index) {
	    scriptedAnimation.state = wrect.Component.Animation.states.stopped;
	    scriptedAnimation.state = wrect.Component.Animation.currentFrame = scriptedAnimation.timing.stop;

	    animation.playingAnimationIds.splice(index, 1);
	  };

	  Animator.prototype.pause = function(scriptedAnimation) {
	    scriptedAnimation.state = wrect.Component.Animation.states.paused;
	  };

	  module.exports = Animator;
	}());


/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	(function() {
	  "use strict";

	  var PhysicsEngine = function (options) {
	    this.options = options || {};
	    this.game = options.game;

	    var TimeStep = __webpack_require__(33);
	    var Gravity = __webpack_require__(34);
	    var QuadTree = __webpack_require__(35);
	    var Collision = __webpack_require__(36);
	    var Physics = __webpack_require__(37);

	    this.timeStepSystem = new TimeStep({game: this.game});


	    this.systems = {
	      Gravity: {
	        system: new Gravity({game: this.game})
	      },
	      QuadTree: {
	        system: new QuadTree({game: this.game})
	      },
	      Collision: {
	        system: new Collision({game: this.game})
	      },
	      Physics: {
	        system: new Physics({game: this.game})
	      }
	    };
	  };

	  PhysicsEngine.prototype.run = function() {
	    this.timeStepSystem.run();

	    for (var steps = 0; steps < 1; steps++) {//this.timeStepSystem.timeSteps; steps++) {
	      for (var s in this.systems) if (this.systems.hasOwnProperty(s)) {
	        var system = this.systems[s].system;
	        system.run();
	      }
	    }
	  };

	  module.exports = PhysicsEngine;
	}());


/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	(function() {
	  "use strict";

	  var BaseSystem = __webpack_require__(26);
	  var TimeStep = function (options) {
	    BaseSystem.call(this, options);

	    this.options = options || {};
	    this.systems = [];

	    this.fixedTimeStep = 16;
	    this.remainder = 0;
	    this.timeSteps = 0;
	  };

	  TimeStep.prototype = Object.create( BaseSystem.prototype );
	  TimeStep.prototype.constructor = TimeStep;

	  TimeStep.prototype.name = 'TimeStep';

	  TimeStep.prototype.checkDependencies = function() {
	    return false;
	  };

	  TimeStep.prototype.run = function() {
	    var gameTime = this.options.game.gameTime;

	    this.remainder += gameTime.getDelta() % this.fixedTimeStep;
	    this.timeSteps = Math.round(gameTime.getDelta() / this.fixedTimeStep);

	    if (this.remainder >= this.fixedTimeStep) {
	      this.timeSteps += 1;
	      this.remainder = this.remainder - this.fixedTimeStep;
	    }
	  };
	  
	  module.exports = TimeStep;
	}());


/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	(function() {
	  "use strict";

	  var BaseSystem = __webpack_require__(26);

	  var Gravity = function (options) {
	    BaseSystem.call(this, options);

	    this.options = options || {};
	    this.gravityDirection = this.options.game.getRenderer().axisOrientation.y;
	  };

	  Gravity.prototype = Object.create( BaseSystem.prototype );
	  Gravity.prototype.constructor = Gravity;

	  Gravity.prototype.name = 'Gravity';

	  Gravity.prototype.checkDependencies = function(entity) {
	    return entity.components.RigidBody ? true : false;
	  };

	  Gravity.prototype.perform = function(entity) {
	    if (entity.components.RigidBody && entity.components.RigidBody.gravity) {
	      var rigidBody = entity.components.RigidBody;

	      var gravity = new wrect.Physics.Vector(0, 9.81).multiply(rigidBody.physicsBody.m);
	      gravity.y *= this.gravityDirection;
	      rigidBody.physicsBody.f = rigidBody.physicsBody.f.add(gravity);
	    }
	  };
	  
	  module.exports = Gravity;
	}());


/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	(function () {
	  "use strict";

	  var Vector = __webpack_require__(13);
	  var BaseSystem = __webpack_require__(26);

	  var QuadTree = function (options) {
	    BaseSystem.call(this, options);

	    this.options = options || {};

	    var quadTreeSize = 500;

	    this.range = {
	      x: -quadTreeSize,
	      y: -quadTreeSize,
	      width : quadTreeSize * 2,
	      height: quadTreeSize * 2,
	      level: 0,
	      quadLevel : 0
	    };
	  };

	  QuadTree.prototype = Object.create(BaseSystem.prototype);
	  QuadTree.prototype.constructor = QuadTree;

	  QuadTree.prototype.name = 'QuadTree';

	  QuadTree.prototype.checkDependencies = function (entity) {
	    return entity.components.RigidBody;
	  };

	  QuadTree.prototype.run = function() {
	    var game = this.options.game;

	    function mapQuadTree(entities, range) {
	      function checkProjectionInRange(min, projection, max) {
	        return min < projection && projection < max;
	      }
	      function checkObjectInQuad (vertices, range) {
	        var inQuad = true;

	        for (var v = 0; v < vertices.length; v++) {
	          var vertex = vertices[v];

	          var xProjectionAxis = new Vector(Math.abs(range.x), 0);
	          var xProjectedVertex = vertex.dot(xProjectionAxis.unit());
	          var yProjectionAxis = new Vector(Math.abs(range.y), 0);
	          var yProjectedVertex = vertex.dot(yProjectionAxis.unit());

	          var xInRange = checkProjectionInRange(range.x, xProjectedVertex, range.x + range.width);
	          var yInRange = checkProjectionInRange(range.y, yProjectedVertex, range.y + range.height);

	          if (!xInRange || !yInRange) {
	            inQuad = false;
	            break;
	          }
	        }

	        return inQuad;
	      }

	      //debugQuadTree(game, range);
	      var localTree = [];
	      for (var e = 0; e < entities.length; e++) {
	        var entity = entities[e];
	        var vertices = entity.components.RigidBody.dimensions.getVertices();

	        if (checkObjectInQuad(vertices, range)) {
	          localTree.push(entity);
	        }
	      }

	      if (localTree.length > 256) {
	        var quadWidth = range.width / 2;
	        var quadHeight = range.height / 2;
	        var range1 = {
	          x: range.x,
	          y: range.y,
	          width: quadWidth,
	          height: quadHeight,
	          level: range.level + 1,
	          quadLevel: 1
	        };
	        var range2 = {
	          x: range.x + quadWidth,
	          y: range.y,
	          width: quadWidth,
	          height: quadHeight,
	          level: range.level + 1,
	          quadLevel: 2
	        };
	        var range3 = {
	          x: range.x,
	          y: range.y + quadHeight,
	          width: quadWidth,
	          height: quadHeight,
	          level: range.level + 1,
	          quadLevel: 3
	        };
	        var range4 = {
	          x: range.x + quadWidth,
	          y: range.y + quadHeight,
	          width: quadWidth,
	          height: quadHeight,
	          level: range.level + 1,
	          quadLevel: 4
	        };
	        mapQuadTree(localTree, range1);
	        mapQuadTree(localTree, range2);
	        mapQuadTree(localTree, range3);
	        mapQuadTree(localTree, range4);
	      }
	      else {
	        if (localTree.length > 1) {
	          var hash = function (name) {
	            var hash = 0, i, chr, len;
	            if (name.length == 0) return hash;
	            for (i = 0, len = name.length; i < len; i++) {
	              chr = name.charCodeAt(i);
	              hash = ((hash << 5) - hash) + chr;
	              hash |= 0; // Convert to 32bit integer
	            }
	            return hash;
	          };

	          var treeHash = '';
	          for (var h = 0; h < localTree.length; h++) {
	            treeHash += localTree[h].id;
	          }
	          var hashedBranch = hash(treeHash);
	          if (game.treeHashes.indexOf(hashedBranch) === -1) {
	            game.treeHashes.push(hashedBranch);
	            game.completeTree.push(localTree);
	          }
	        }
	      }
	    }

	    mapQuadTree(this.entities, this.range);
	  };

	  var debugQuadTree = function(game, range) {
	    var selectedObject = game.getSceneManager().getScene().getObjectByName('quadTreeDebugLines_' + range.x + '_' + range.y);

	    if (!selectedObject) {
	      var material = new THREE.LineBasicMaterial({
	        color: 0xFFFFFF
	      });

	      var geometry = new THREE.Geometry();
	      geometry.vertices.push(new THREE.Vector3(range.x, range.y, 0));
	      geometry.vertices.push(new THREE.Vector3(range.x + range.width, range.y, 0));
	      geometry.vertices.push(new THREE.Vector3(range.x + range.width, range.y + range.height, 0));
	      geometry.vertices.push(new THREE.Vector3(range.x, range.y + range.height, 0));
	      geometry.vertices.push(new THREE.Vector3(range.x, range.y, 0));

	      var line = new THREE.Line(geometry, material);
	      line.name = 'quadTreeDebugLines_' + range.x + '_' + range.y;

	      game.getSceneManager().getScene().add(line);
	    }
	  };
	  
	  module.exports = QuadTree;
	}());


/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	(function () {
	  "use strict";

	  var BaseSystem = __webpack_require__(26);

	  var Collision = function (options) {
	    BaseSystem.call(this, options);
	  };

	  Collision.prototype = Object.create(BaseSystem.prototype);
	  Collision.prototype.constructor = Collision;

	  Collision.prototype.name = 'Collision';

	  Collision.prototype.checkDependencies = function () {
	    return false;
	  };

	  Collision.prototype.satTest = function(shapeA, shapeB) {
	    var a = shapeA.components.RigidBody.dimensions;
	    var b = shapeB.components.RigidBody.dimensions;

	    function getNormalAxes(dimensions) {
	      var axes = [];
	// loop over the vertices
	      //for (int i = 0; i < shape.vertices.length; i++) {
	      var vertices = dimensions.getCollisionVertices();
	      for (var i = 0; i < vertices.length ; i++) {
	        // get the current vertex
	        var p1 = vertices[i];
	        // get the next vertex
	        var p2 = vertices[i + 1 == vertices.length ? 0 : i + 1];
	        // subtract the two to get the edge vector
	        var edge = p2.subtract(p1);
	        // get either perpendicular vector
	        axes[i] = edge.perpendicular().unit();
	      }

	      return axes;
	    }

	    function project(dimensions, axis) {
	      axis = axis.unit();
	      var vertices = dimensions.getCollisionVertices(axis);
	      var min = axis.dot(vertices[0]);
	      var max = min;
	      var projections = [];

	      for (var i = 0; i < vertices.length ; i++) {
	        var v = vertices[i];
	        var p = axis.dot(v);
	        if (p < min) {
	          min = p;
	        } else if (p > max) {
	          max = p;
	        }

	        projections.push(p);
	      }

	      return {
	        min: min,
	        max: max,
	        projections: projections
	      };
	    }

	    function checkOverlap(axes, a, b) {
	      var smallestOverlap = null;
	      var smallestAxis = null;
	      var axesOverlap = true;

	      for (var i = 0; i < axes.length ; i++) {
	        var axis = axes[i];
	        if (axes.length === 1 && axis.x === 0 && axis.y === 0) {
	          axis = b.getCenter().subtract(a.getCenter()).unit();
	        }

	        // project both shapes onto the axis
	        var p1 = project(a, axis);
	        var p2 = project(b, axis);

	        if (p1.max < p2.min || p1.min > p2.max){
	          axesOverlap = false;
	          break;
	        } else {
	          var overlapP1 = p1.min < p2.min ? p2.min : p1.min;
	          var overlapP2 = p1.max < p2.max ? p1.max : p2.max;
	          var overlap = overlapP2 - overlapP1;
	          if (smallestOverlap == null || overlap < smallestOverlap) {
	            smallestOverlap = overlap;
	            smallestAxis = axis;
	          }
	        }
	      }

	      return {
	        hasOverlap: axesOverlap,
	        overlap: smallestOverlap,
	        axis: smallestAxis
	      };
	    }

	    function handleCollision(shapeA, shapeB, axesOverlap) {

	      if (!shapeB.components.RigidBody.solid || !shapeA.components.RigidBody.solid) {
	        return;
	      }

	      var v = shapeA.components.RigidBody.physicsBody.v;//.unit();

	      var n = axesOverlap.axis;//.unit();
	      var vn = v.dot(n);
	      var u = n.multiply(vn);
	      var w = v.subtract(u);
	      var v2 = w.subtract(u);


	      var sign = vn ? vn < 0 ? -1 : 1:0;
	      var pushOutVector = n.unit().multiply(axesOverlap.overlap * -sign);

	      shapeA.components.RigidBody.dimensions.move(pushOutVector);

	      if (shapeB.components.BaseMaterial) {
	        var data = {
	          material: shapeB.components.BaseMaterial,
	          entity: shapeB,
	          otherEntity: shapeA,
	          force: v2,
	          surface: n.perpendicular()
	        };
	        game.getEventManager().trigger('physics.collide.trigger', data);
	        game.getEventManager().trigger('physics.collide.absorb', data);
	        v2 = data.force;
	      }

	      if (!shapeB.components.RigidBody.frozen) {
	//      collisionShape.physicsBody.v = collisionShape.physicsBody.v.add(v.multiply(energyTransfer));
	//      v2 = v2.multiply(energyTransfer);
	      }

	      shapeA.components.RigidBody.physicsBody.f = shapeA.components.RigidBody.physicsBody.f.subtract(shapeA.components.RigidBody.physicsBody.v);
	      shapeA.components.RigidBody.physicsBody.f = shapeA.components.RigidBody.physicsBody.f.add(v2);

	    }

	    var axesOverlap = checkOverlap(getNormalAxes(b), a, b);

	    if (axesOverlap.hasOverlap) {
	      handleCollision(shapeA, shapeB, axesOverlap);
	    }
	  };

	  Collision.prototype.run = function() {
	    var game = this.options.game;

	    //console.log('collision', game.completeTree.length);
	    for (var t = 0; t < game.completeTree.length; t++) {
	      var branch = game.completeTree[t];

	      for (var x = 0; x < branch.length; x++) {
	        var mainEntity = branch[x];

	        if (mainEntity.components.RigidBody.physicsBody.v.x == 0 && mainEntity.components.RigidBody.physicsBody.v.y == 0) {
	          continue;
	        }

	        for (var y = 0; y < branch.length; y++) {
	          if (x !== y) {
	            var otherEntity = branch[y];

	            this.satTest(mainEntity, otherEntity);
	          }
	        }
	      }
	    }
	  };
	  
	  module.exports = Collision;
	}());


/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	(function() {
	  "use strict";
	  
	  var Vector = __webpack_require__(13);
	  var BaseSystem = __webpack_require__(26);

	  var Physics = function (options) {
	    BaseSystem.call(this, options);

	    this.options = options || {};
	    this.gameTime = options.game.getGameTime();
	  };

	  Physics.prototype = Object.create( BaseSystem.prototype );
	  Physics.prototype.constructor = Physics;

	  Physics.prototype.name = 'Physics';

	  Physics.prototype.checkDependencies = function(entity) {
	    return entity.components.RigidBody ? true : false;
	  };

	  Physics.prototype.perform = function(entity) {
	    var dt = 1/6;//this.gameTime.getDelta() / 100;

	    var rigidBody = entity.components.RigidBody;

	    if (!entity.components.RigidBody.frozen) {
	      var physicsBody = rigidBody.physicsBody;

	      if (physicsBody.f.x !== 0 || physicsBody.f.y !== 0) {
	        physicsBody.v = physicsBody.v.add(physicsBody.f);
	      }

	      var oldV = physicsBody.v;
	      var move = new Vector(
	          (oldV.x + physicsBody.v.x) * 0.5 * dt,
	          (oldV.y + physicsBody.v.y) * 0.5 * dt
	      );

	      if (move.x !== 0 || move.y !== 0) {
	        rigidBody.dimensions.move(move);
	      }
	    }

	    rigidBody.physicsBody.f = new Vector(0, 0);
	    rigidBody.physicsBody.a = new Vector(0, 0);
	  };
	  
	  module.exports = Physics;
	}());


/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	(function() {
	  "use strict";  
	  var Vector = __webpack_require__(13);

	  var BaseSystem = __webpack_require__(26);
	  var Mover = function (options) {
	    BaseSystem.call(this, options);

	    this.options = options || {};

	  };

	  Mover.prototype = Object.create( BaseSystem.prototype );
	  Mover.prototype.constructor = Mover;

	  Mover.prototype.name = 'Mover';

	  Mover.prototype.checkDependencies = function(entity) {
	    return entity.components.RigidBody ? true : false;
	  };

	  Mover.prototype.perform = function(entity) {
	    if (entity.components.RigidBody && !entity.components.RigidBody.frozen) {
	      var rigidBody = entity.components.RigidBody;

	      if (entity.components.Visual) {
	        var visual = entity.components.Visual;
	        visual.setPosition(rigidBody.dimensions.origin.x, rigidBody.dimensions.origin.y, rigidBody.dimensions.origin.z);
	      }

	      entity.components.RigidBody.move = new Vector(0, 0);
	    }
	  };

	  module.exports = Mover;
	}());


/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	var dirLight;
	(function() {
	  "use strict";

	  var Vector = __webpack_require__(13);

	  /**
	   * @constructor
	   */
	  var ProtoDog = function (options) {
	    this.game = options.game;
	    console.log('ProtoDog loaded...');
	  };

	  ProtoDog.prototype.init = function() {
	    console.log('ProtoDog setup...');

	    this.registerSystems();
	    // this.setupCamera();
	    // this.setupScene();
	    // this.buildWorld();

	    // this.setupMechanics();
	    //this.setupControls();
	    //this.setupGrid();
	    //this.setupPlayer();

	    this.game.getRenderer().render();
	  };

	  ProtoDog.prototype.setupMechanics = function() {
	  };

	  ProtoDog.prototype.setupControls = function() {

	  };

	  ProtoDog.prototype.buildWorld = function() {
	    var Block = __webpack_require__(40);
	    var game = this.game;
	    
	    function createBlock(options) {
	      var block = new Block({
	        position: options.position,
	        dimension: options.dimension,
	        material: options.material,
	        renderer: game.getRenderer(),
	        eventManager: game.getEventManager()
	      });
	      game.getEntityManager().addEntity(block.entity);

	      return block.entity;
	    }

	    createBlock({
	      position: new Vector(0, 0),
	      dimension: new Vector(100, 100),
	      material: {
	        color: 0xFF0000
	      }
	    });

	    createBlock({
	      position: new Vector(500, 0),
	      dimension: new Vector(100, 100),
	      material: {
	        color: 0x0000FF
	      }
	    });
	  };

	  ProtoDog.prototype.setupCamera = function() {
	  };

	  ProtoDog.prototype.setupScene = function() {
	  };

	  ProtoDog.prototype.registerSystems = function() {
	  };

	  ProtoDog.prototype.setupPlayer = function() {
	  };
	  
	  module.exports = ProtoDog;
	}());


/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	(function() {
	  "use strict";

	  var Entity = __webpack_require__(41);
	  var Rectangle = __webpack_require__(15);
	  var RigidBody = __webpack_require__(42);
	  var Visual = __webpack_require__(11);

	  /**
	   * @param options
	   * @returns {Entity|*}
	   * @constructor
	   */
	  var Block = function (options) {
	    this.entity = new Entity({
	      eventManager: options.eventManager
	    });

	    var rigidBody = new RigidBody({
	      dimensions: new Rectangle({
	        origin: options.position,
	        dimension: options.dimension,
	        material: options.material
	      }),
	      frozen: options.frozen
	    });
	    var visualComponent = new Visual({
	      color: options.color,
	      alpha: options.alpha,
	      useSprite: options.useSprite,
	      shape: rigidBody.dimensions,
	      renderer: options.renderer
	    });

	    this.entity.addComponent(rigidBody);
	    this.entity.addComponent(visualComponent);
	  };
	  
	  module.exports = Block;
	}());


/***/ },
/* 41 */
/***/ function(module, exports) {

	(function() {
	  "use strict";

	  /**
	   * @type {void|*}
	   */
	  var Entity = function (options) {
	    this.components = {};

	    this.id = (+new Date()).toString(16) + (Math.random() * 100000000 | 0).toString(16);
	    this.eventManager = options.eventManager;

	    return this;
	  };

	  /**
	   * @param component
	   */
	  Entity.prototype.addComponent = function(component) {
	    //TODO: What should happen when a 'subcomponent' was added? Split up the name?
	    this.components[component.name] = component;
	    this.eventManager.trigger('entity.component.add', {entity: this});
	  };

	  /**
	   * @param {String} name
	   */
	  Entity.prototype.removeComponent = function(name) {
	    delete this.components[name];
	    this.eventManager.trigger('entity.component.remove', {entity: this});
	  };

	  /**
	   * @returns {string|*}
	   */
	  Entity.prototype.getId = function() {
	    return this.id;
	  };
	  
	  module.exports = Entity;
	}());


/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	(function() {
	  "use strict";

	  var BaseComponent = __webpack_require__(12);
	  
	  var Dimensions = __webpack_require__(16);
	  var PhysicsBody = __webpack_require__(43);  
	  var Vector = __webpack_require__(13);

	  var RigidBody = function (options) {
	    BaseComponent.call(this);

	    options = options || {};
	    this.dimensions = options.dimensions || new Dimensions();
	    this.physicsBody = options.physicsBody || new PhysicsBody();
	    this.move = new Vector(0, 0);

	    this.frozen = options.frozen;
	    this.solid = true;
	  };

	  RigidBody.prototype = Object.create(BaseComponent.prototype);
	  RigidBody.prototype.constructor = RigidBody;
	  RigidBody.prototype.name = 'RigidBody';
	  
	  module.exports = RigidBody;
	}());


/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	(function() {
	  "use strict";

	  var Vector = __webpack_require__(13);

	  /**
	   *
	   * @class wrect.Physics.PhysicsBody
	   * @constructor
	   */
	  var PhysicsBody = function (options) {
	    options = options || {};

	    this.f = options.f || new Vector(0, 0);

	    this.v = options.v || new Vector(0, 0);
	    this.a = options.a || new Vector(0, 0);
	    this.m =  options.m || 1;
	    this.theta = options.theta || 0;
	    this.omega = options.omega || 0;
	    this.alpha = options.alpha || 0;

	    this.J = 0;
	  };

	  module.exports = PhysicsBody;
	}());


/***/ }
/******/ ]);