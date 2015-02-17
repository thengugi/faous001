define(function(require, exports, module) {
    var View          = require('famous/core/View');
    var Surface       = require('famous/core/Surface');
    var Transform     = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');
    var Easing        = require('famous/transitions/Easing');  

    var PageView = require('views/PageView');
    var MenuView = require('views/MenuView');
    var StripData = require('data/StripData');

    function AppView() {
        View.apply(this, arguments);

        this.menuToggle = false;
        // call a helper function
        _createPageView.call(this);
        _setListeners.call(this);
        _createMenuView.call(this);

    }

    AppView.prototype = Object.create(View.prototype);
    AppView.prototype.constructor = AppView;

    AppView.DEFAULT_OPTIONS = {
        openPosition: 276,
        transition: {
            duration: 500,
            curve: Easing.inOutBack
        }
    };

    function _createPageView () {
        this.pageView = new PageView();
        this.pageModifier = new StateModifier();
        
        this.add(this.pageModifier).add(this.pageView);
    }

    function _setListeners () {
        this.pageView.on('menuToggle', this.toggleMenu.bind(this));
    }

    AppView.prototype.toggleMenu = function () {
        if (this.menuToggle) {
            this.slideLeft();
        }else {
            this.slideRight();
        }
        this.menuToggle = !this.menuToggle;
    };

    AppView.prototype.slideRight = function () {
        this.pageModifier.setTransform(Transform.translate(this.options.openPosition, 0, 0), this.options.transition);
    };

    AppView.prototype.slideLeft = function () {
        this.pageModifier.setTransform(Transform.translate(0, 0, 0),this.options.transition); 
    };

    // create a menu view
    function _createMenuView () {
        this.menuView = new MenuView({stripData : StripData});
        
        var menuModifier = new StateModifier({
            trasform: Transform.behind
        });

        this.add(menuModifier).add(this.menuView);
    }

    module.exports = AppView;
}); 
