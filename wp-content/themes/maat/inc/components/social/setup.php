<?php
function socialProfiles($location = '', $class = ''){
    $parent_location_id = get_field('parent_location', 'options');
    $location_id = (!empty($location)) ? get_post_id_by_slug($location, 'location') : $parent_location_id;
    $company_name = (!empty($location)) ? get_the_title($location_id) : get_bloginfo('name');
    $socials = get_field('location_social_profiles', $location_id);
    $social_profiles = '<div class="social-list ' . $class . '"><div class="social-list-inner">';
    foreach ($socials as $social) {
        $profile = '<div class="social-list-item ' . sanitize_key($social['profile_title'])  . '"><a href="' . $social['profile_url'] . '" title="' .  $company_name . ' ' . $social['profile_title'] . '" target="_blank">';
        if ($social['icon_type'] === 'icon') {
            $profile .= '<i class="profile-icon ';
            $profile .= $social['icon_class'];
            $profile .= '"></i>';
        } else if ($social['icon_type'] === 'custom') {
            $profile .= '<img class="profile-icon custom-icon" src="';
            $profile .= $social['custom_icon'];
            $profile .= '"/>';
        }
        if (!empty($social['profile_title'])) {
            $profile .= '<span class="profile-title';
            $profile .= ($social['show_title'] !== 1) ? ' sr-only' : '';
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
