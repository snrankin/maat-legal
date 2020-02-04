<?php
/** ===========================================================================
 * @package maat
 * @subpackage /inc/components/page-loader/partials/template.php
 * @created 3-15-19
 * @author Sam Rankin sam@maatlegal.com>
 * @copyright 2019 Maat Legal
 * -----
 * Last Modified: 3-21-19 at 3:17 pm
 * Modified By: Sam Rankin <sam@maatlegal.com>
 * -----
 * Description: Item description
 * @return mixed
 * -----
 * HISTORY:
 * Date      	By	Comments
 * ----------	---	----------------------------------------------------------
* ========================================================================= */


// Variables

?>

<style type="text/css">
#wrapper {
    opacity: 0;
}

.loaded #wrapper {
    opacity: 1;
}

#loader-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 9999;
}

#loader {
    display: block;
    position: absolute;
    left: 50%;
    top: 50%;
    width: 33vw;
    z-index: 1001;
    max-width: 250px;
    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    -o-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
}

#loader::before {
    content: '';
    display: block;
    width: 100%;
    padding-bottom: 66.67%;
}

#loader>svg {
    display: block;
    width: 100%;
    position: absolute;
    height: auto;
    top: 0;
    left: 0;
}

#loader.custom-icon {
    -webkit-animation: fade 2s ease-in-out infinite;
    animation: fade 2s ease-in-out infinite;
}

@-webkit-keyframes fade {
    0% {
        opacity: 0;
    }

    50% {
        opacity: 1;
    }

    100% {
        opacity: 0;
    }
}

@keyframes fade {
    0% {
        opacity: 0;
    }

    50% {
        opacity: 1;
    }

    100% {
        opacity: 0;
    }
}

#loader-wrapper .loader-section {
    position: fixed;
    width: 100vw;
    height: 100vh;
    z-index: 1000;
    -webkit-transform: translateX(0);
    /* Chrome, Opera 15+, Safari 3.1+ */
    -ms-transform: translateX(0);
    /* IE 9 */
    transform: translateX(0);

    /* Firefox 16+, IE 10+, Opera */
}

#loader-wrapper .loader-section.section-left {
    left: -2px;
    top: 0;
    background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA3NSAxMDAiPjx0aXRsZT5sZWZ0LXNodXR0ZXI8L3RpdGxlPjxnIGlkPSJMYXllcl8yIiBkYXRhLW5hbWU9IkxheWVyIDIiPjxnIGlkPSJMYXllcl8xLTIiIGRhdGEtbmFtZT0iTGF5ZXIgMSI+PHBvbHlnb24gcG9pbnRzPSIwIDEwMCA3NSAwIDAgMCAwIDEwMCIgc3R5bGU9ImZpbGw6IzNjMTA1MyIvPjwvZz48L2c+PC9zdmc+");
    background-size: cover;
    background-position: top right;
    background-repeat: no-repeat;
}

#loader-wrapper .loader-section.section-right {
    right: -2px;
    top: 0;
    background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA3NSAxMDAiPjx0aXRsZT5yaWdodC1zaHV0dGVyPC90aXRsZT48ZyBpZD0iTGF5ZXJfMiIgZGF0YS1uYW1lPSJMYXllciAyIj48ZyBpZD0iTGF5ZXJfMS0yIiBkYXRhLW5hbWU9IkxheWVyIDEiPjxwb2x5Z29uIHBvaW50cz0iNzUgMTAwIDAgMCA3NSAwIDc1IDEwMCIgc3R5bGU9ImZpbGw6IzNjMTA1MyIvPjwvZz48L2c+PC9zdmc+");
    background-size: cover;
    background-position: top left;
    background-repeat: no-repeat;
}

@media screen and (orientation: landscape) {
    #loader-wrapper .loader-section {
        width: 100vw;
        height: 100vh;
    }
}

@media screen and (orientation: portrait) {
    #loader-wrapper .loader-section {
        width: 150vw;
        height: 100vh;
    }
}

#loader-wrapper .loader-section.section-bottom {
    bottom: -2px;
    left: 0;
    width: 100vw;
    height: 60vh;
    background-color: #3C1053;
    transform-origin: bottom center;
}

/* Loaded */
.loaded #loader-wrapper .loader-section.section-left {

    transform: translate(-150%, -100%);
    transition: all 1.25s 0.3s cubic-bezier(0.645, 0.045, 0.355, 1.000);
}

.loaded #loader-wrapper .loader-section.section-right {
    transform: translate(150%, -100%);
    transition: all 1.25s 0.3s cubic-bezier(0.645, 0.045, 0.355, 1.000);
}

.loaded #loader-wrapper .loader-section.section-bottom {
    transform: translateY(100%);
    transition: all 1.25s 0s cubic-bezier(0.645, 0.045, 0.355, 1.000);
}

.loaded #loader {
    opacity: 0;
    visibility: hidden;
    -webkit-transition: all 0.3s ease-out;
    transition: all 0.3s ease-out;
}


/* JavaScript Turned Off */
.no-js #loader-wrapper {
    display: none;
}

.no-js #wrapper {
    opacity: 1;
}

</style>
<div id="loader-wrapper">
    <div class="loader-section section-left"></div>
    <div class="loader-section section-right"></div>
    <div class="loader-section section-bottom"></div>
    <div id="loader" class="custom-icon">
        <?php echo file_get_contents(ASSETS_PATH . '/imgs/Icon-Color-Light.svg');?>
    </div>
</div>
<script type="text/javascript">
setTimeout(function() {
    if (!document.body.classList.contains('loaded')) {
        document.body.classList.add('loaded');
    }
}, 2500);
setTimeout(function() {
    document.getElementById("loader-wrapper").outerHTML = "";
}, 5000);
</script>
