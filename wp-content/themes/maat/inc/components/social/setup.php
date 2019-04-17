<?php

function socialProfiles($class = ''){
    $company_name = get_bloginfo('name');
    $socials = get_field('social_media', 'options');
    $social_profiles = '<div class="social-list ' . $class . '"><div class="social-list-inner">';
    foreach ($socials as $social) {
        $profile = '<div class="social-list-item ' . sanitize_key($social['profile_title'])  . '"><a href="' . $social['profile_url'] . '" title="' .  $company_name . ' ' . $social['profile_title'] . '" target="_blank">';
        if ($social['profile_icon_type'] === 'icon') {
            $profile .= '<i class="profile-icon ';
            $profile .= $social['profile_icon'];
            $profile .= '"></i>';
        } else if ($social['profile_icon_type'] === 'custom') {
            $profile .= '<img class="profile-icon custom-icon" src="';
            $profile .= $social['profile_custom_icon'];
            $profile .= '"/>';
        }
        if (!empty($social['profile_title'])) {
            $profile .= '<span class="profile-title';
            $profile .= ($social['display_profile_title'] !== 1) ? ' sr-only' : '';
            $profile .= '">';
            $profile .= $social['profile_title'];
            $profile .= '</span>';
        }
        $profile .= '</a></div>';

        $social_profiles .= $profile;
    }

    $social_profiles .= '</div></div>';

    return $social_profiles;
}

function maat_social_shortcode($atts){
    $atts = shortcode_atts(
        array(
            'class' => '',
        ),
        $atts
    );

    return socialProfiles($atts['class']);
}
add_shortcode('maat_social_profiles', 'maat_social_shortcode');

include_component_partial(basename(__DIR__), 'social-share');
