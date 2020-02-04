"use strict";

jQuery(function($) {
    $(document).ready(function() {
        $('.unique').sameHeight();
        var screenRatio = verge.aspect(screen);

        if (screenRatio >= 1.5) {
            var elemWidth = verge.viewportW(),
                elemHeight = elemWidth / 3 * 2;
            $('#winning').css('min-height', elemHeight);
        }
    });
});
//# sourceMappingURL=maat-landing-page.js.map
