var exports = {};
"use strict";

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}

function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
}

/** ===========================================================================
 * Component: global.js
 * Project: maat
 * Created Date: 3-14-19
 * Author: Sam Rankin (sam@maatlegal.com>)
 * -----
 * Last Modified: 4-12-19 at 4:12 pm
 * Modified By: Sam Rankin <sam@maatlegal.com>
 * -----
 * Copyright (c) 2019 Maat Legal
 * -----
 * HISTORY:
 * Date      	By	Comments
 * ----------	---	----------------------------------------------------------
============================================================================ */
var ResponsiveBackgroundImage =
    /*#__PURE__*/
    function() {
        function ResponsiveBackgroundImage(element) {
            var _this = this;

            _classCallCheck(this, ResponsiveBackgroundImage);

            this.element = element;
            this.img = element.querySelector('img');
            this.src = '';
            this.img.addEventListener('load', function() {
                _this.update();
            });

            if (this.img.complete) {
                this.update();
            }
        }

        _createClass(ResponsiveBackgroundImage, [{
            key: "update",
            value: function update() {
                var src = typeof this.img.currentSrc !== 'undefined' ? this.img.currentSrc : this.img.src;

                if (this.src !== src) {
                    this.src = src;
                    this.element.style.backgroundImage = 'url("' + this.src + '")';
                }
            }
        }]);

        return ResponsiveBackgroundImage;
    }();

jQuery(function($) {
    function makeFullHeight(elem) {
        var windowHeight = $(window).innerHeight();
        $(elem).css('min-height', windowHeight);
    }

    $.fn.extend({
        sameHeight: function sameHeight() {
            var elementHeights = $(this).map(function() {
                return $(this).outerHeight();
            }).get();
            var minHeight = Math.max.apply(null, elementHeights);
            $(this).css('min-height', minHeight);
        }
    });

    function minBoxWidth(elem1, elem2) {
        var elementWidths = $(elem1).map(function() {
            return $(this).outerWidth();
        }).get();
        var minWidth = Math.max.apply(null, elementWidths);
        $(elem2).css('min-width', minWidth);
    }

    $(document).ready(function() {
        makeFullHeight('.section-full-height');
        $('.custom-select').select2();
        $('[data-toggle="tooltip"]').tooltip();
        $('[data-toggle="popover"]').popover({
            trigger: 'focus'
        });
    });
    $(window).on("resize", makeFullHeight('.section-full-height'));
    $(window).load(function() {
        var elements = document.querySelectorAll('[data-responsive-background-image]');

        for (var i = 0; i < elements.length; i++) {
            new ResponsiveBackgroundImage(elements[i]);
        }
    });
});
//# sourceMappingURL=maat-main.js.map