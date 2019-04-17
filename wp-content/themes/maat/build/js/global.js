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


class ResponsiveBackgroundImage {

    constructor(element) {
        this.element = element;
        this.img = element.querySelector('img');
        this.src = '';

        this.img.addEventListener('load', () => {
            this.update();
        });

        if (this.img.complete) {
            this.update();
        }
    }

    update() {
        let src = typeof this.img.currentSrc !== 'undefined' ? this.img.currentSrc : this.img.src;
        if (this.src !== src) {
            this.src = src;
            this.element.style.backgroundImage = 'url("' + this.src + '")';

        }
    }
}

jQuery(function($) {
    function makeFullHeight(elem) {
        var windowHeight = $(window).innerHeight();
        $(elem).css('min-height', windowHeight);
    }

    $.fn.extend({
        sameHeight: function() {
            var elementHeights = $(this)
                .map(function() {
                    return $(this).outerHeight();
                })
                .get();
            var minHeight = Math.max.apply(null, elementHeights);
            $(this).css('min-height', minHeight);
        }
    });

    function minBoxWidth(elem1, elem2) {
        var elementWidths = $(elem1)
            .map(function() {
                return $(this).outerWidth();
            })
            .get();
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
        let elements = document.querySelectorAll('[data-responsive-background-image]');
        for (let i = 0; i < elements.length; i++) {
            new ResponsiveBackgroundImage(elements[i]);
        }
    })
});

//# sourceMappingURL=scripts.js.map