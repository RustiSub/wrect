(function(){
    "use strict";
    window.GuiManager = window.Class.extend({
        elements: [],
        guiRoot: null,
        init: function(){
            this.createRootGui();
            this.initGlobalEvents();
        },
        createRootGui: function() {
          this.guiRoot = new window.RootGui({
            canvasWidth: window.innerWidth,
            canvasHeight: window.innerHeight
          });
          this.addElement(this.guiRoot);
        },
        getRoot: function() {
          return this.guiRoot;
        },
        addElement: function(guiElement, container) {
            if (guiElement instanceof window.BaseGuiElement) {
                this.elements.push(guiElement);
                if (container === undefined) {
                    container = window.Container.getComponent('Renderer').view.parentNode;
                }
                if (guiElement.htmlWrapper) {
                    container.appendChild(guiElement.htmlWrapper);
                }
                else {
                    container.appendChild(guiElement.htmlElement);
                }
                guiElement.inDom = true;
                guiElement.toDomCallback();
            }
        },
        createElement: function(name, options) {
            if (typeof window[name] === 'function') {
                return new window[name](options);
            }
            console.error(name + ' ain\'t no element I\'ve ever heard of');
            return null;
        },
        initGlobalEvents: function() {
            var helpers = Container.getGame().getHelpers();
            var rootGui = document.getElementById('guiRoot');
            document.addEventListener('mouseover', function(e) {
                if (e.target !== document) {
                    if (!helpers.hasClass(e.target, 'rootGrid') && helpers.hasClass(e.target, 'collection')) {
                       helpers.removeClass(rootGui, 'fade-out');
                    }
                }
            });

            rootGui.addEventListener('transitionend', function fadeIn(e) {
                helpers.removeClass(rootGui, 'fade-out');
            });

            document.addEventListener('mouseout', function(e) {
                if (e.target !== document) {
                      if (!helpers.hasClass(e.target, 'rootGrid') && helpers.hasClass(e.target, 'collection')) {
                          rootGui.addEventListener('transitionend', function fadeOut(e) {
                              rootGui.removeEventListener('transitionend', fadeOut);
                              helpers.addClass(rootGui, 'fade-out');
                          });
                      }
                }
            });
        },
        // Untested
        reset: function() {
            for (var i = this.elements.length; i; i--) {
                var el = this.elements[i];
                if (el.inDom) {
                    if (el.htmlWrapper) {
                        el.htmlWrapper.removeChild(el.htmlElement);
                        el.htmlWrapper.parentNode.removeChild(el.htmlWrapper);
                    }
                    else if (el.htmlElement){
                        el.htmlElement.parentNode.removeChild(el.htmlElement);
                    }
                }
            }
            this.elements = [];
            this.init();
        }
    });
})();
