define(function(require, exports, module) {
    var View          = require('famous/core/View');
    var Surface       = require('famous/core/Surface');
    var Transform     = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');
    var Easing        = require('famous/transitions/Easing');  

    var PageView = require('views/PageView');
    var MenuView = require('views/MenuView');
    var StripData = require('data/StripData');
    var GenericSync =  require('famous/inputs/GenericSync');
    var TouchSync = require('famous/inputs/TouchSync');
    var MouseSync = require('famous/inputs/MouseSync');

    function AppView() {
        View.apply(this, arguments);

        this.menuToggle = false;
        
        _createPageView.call(this);
        _setListeners.call(this);
        _createMenuView.call(this);
        _handleSwipe.call(this);

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

    // adding the swpe and touch events using geneic sync
    function _handleSwipe () {
        var sync = new GenericSync(
            ['mosue', 'swipe'],
            {direction: GenericSync.DIRECTION_X}
        );

        this.pageView.pipe(sync);

        sync.on('update', function (data) {
           this.pageViewPos += data.delta;
           this.pageModifier.setTransform(Transform.translate(this.pageViewPos, 0, 0)); 
        }.bind(this));
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
        this.menuView = new MenuView({ stripData: StripData });
        
        var menuModifier = new StateModifier({
            trasform: Transform.behind
        });

        this.add(menuModifier).add(this.menuView);
    }

    module.exports = AppView;
}); 
