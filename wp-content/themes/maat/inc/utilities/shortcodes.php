<?php
function maat_phone_shortcode($atts){
    $atts = shortcode_atts(
        array(
            'location' => '',
            'wrapper' => '',
            'class' => '',
            'title' => '',
            'icons' => 0,
            'phone_wrapper' => '',
            'phone_link' => 1,
            'phone_class' => '',
            'phone_title' => '',
        ),
        $atts
    );

    $location = $atts['location'];
    $location_info = getLocationInfo();

    $location_id = (!empty($location)) ? $location_info[$location] : $location_info;

    $args = array(
        'wrapper' => $atts['wrapper'],
        'class' => $atts['class'],
        'title' => $atts['title'],
        'icons' => $atts['icons'],
        'phone' => array(
            'content' => $location_id['phone'],
            'link' => $atts['phone_link'],
            'wrapper' => $atts['phone_wrapper'],
            'class' => $atts['phone_class'],
            'title' => $atts['phone_title'],
        ),
    );

    $info = displayLocationInfo($args);

    return $info;
}
add_shortcode('company_phone', 'maat_phone_shortcode');

function maat_email_shortcode($atts){
    $atts = shortcode_atts(
        array(
            'location' => '',
            'wrapper' => '',
            'class' => '',
            'title' => '',
            'icons' => 0,
            'email_wrapper' => '',
            'email_link' => 1,
            'email_class' => '',
            'email_title' => '',
        ),
        $atts
    );

    $location = $atts['location'];
    $location_info = getLocationInfo();

    $location_id = (!empty($location)) ? $location_info[$location] : $location_info;

    $args = array(
        'wrapper' => $atts['wrapper'],
        'class' => $atts['class'],
        'title' => $atts['title'],
        'icons' => $atts['icons'],
        'email' => array(
            'content' => $location_id['email'],
            'link' => $atts['email_link'],
            'wrapper' => $atts['email_wrapper'],
            'class' => $atts['email_class'],
            'title' => $atts['email_title'],
        ),
    );

    $info = displayLocationInfo($args);

    return $info;
}
add_shortcode('company_email', 'maat_email_shortcode');

function maat_contactinfo_shortcode($atts){
    $atts = shortcode_atts(
        array(
            'location' => '',
            'wrapper' => '',
            'class' => '',
            'title' => '',
            'icons' => 0,
            'email_wrapper' => '',
            'email_link' => 1,
            'email_class' => '',
            'email_title' => '',
            'phone_wrapper' => '',
            'phone_link' => 1,
            'phone_class' => '',
            'phone_title' => '',
        ),
        $atts
    );

    $location = $atts['location'];
    $location_info = getLocationInfo();

    $location_id = (!empty($location)) ? $location_info[$location] : $location_info;

    $args = array(
        'wrapper' => $atts['wrapper'],
        'class' => $atts['class'],
        'title' => $atts['title'],
        'icons' => $atts['icons'],
        'phone' => array(
            'content' => $location_id['phone'],
            'link' => $atts['phone_link'],
            'wrapper' => $atts['phone_wrapper'],
            'class' => $atts['phone_class'],
            'title' => $atts['phone_title'],
        ),
        'email' => array(
            'content' => $location_id['email'],
            'link' => $atts['email_link'],
            'wrapper' => $atts['email_wrapper'],
            'class' => $atts['email_class'],
            'title' => $atts['email_title'],
        ),
    );

    $info = displayLocationInfo($args);

    return $info;
}
add_shortcode('company_contact_info', 'maat_contactinfo_shortcode');

function maat_theme_logo_shortcode($atts){
    $atts = shortcode_atts(
        array(
            'class' => '',
        ),
        $atts
    );

    return theme_logo($atts['class']);

}
add_shortcode('theme_logo', 'maat_theme_logo_shortcode');
?>
