<?php
/**
 * Function to get Schema Information
 *
 * @return array
 */
function getLocationInfo(){
    $location_info = array();
    $phone = get_field('phone', 'options');
    $fax = get_field('fax', 'options');
    $email = get_field('email', 'options');

    if( have_rows('company_locations', 'options') ) {
        $all_locations = array();
        while( have_rows('company_locations', 'options') ){
            the_row();
                $loc_info       = array();
                $location       = get_sub_field('location');
                $title          = $location['location_label'];
                $full_address   = '';

                if(isset($location['street_address']))       {
                    $loc_info['street'] = $location['street_address'];
                    $full_address .= $location['street_address'];
                }
                if(isset($location['unit']))       {
                    $loc_info['unit'] = $location['unit'];
                    $full_address .= $location['unit'];
                }
                if(isset($location['city']))       {
                    $loc_info['city'] = $location['city'];
                    $full_address .= ', ' . $location['city'];
                }
                if(isset($location['state']))       {
                    $loc_info['state'] = $location['state'];
                    $full_address .= ', ' . $location['state'];
                }
                if(isset($location['zip']))       {
                    $loc_info['zip'] = $location['zip'];
                    $full_address .= $location['zip'];
                }
                if(isset($location['latitude']))       {
                    $loc_info['lat'] = $location['latitude'];
                }

                if(isset($location['longitude']))       {
                    $loc_info['lng'] = $location['longitude'];
                }

                if(isset($location['map_url']))       {
                    $loc_info['map_url'] = $location['map_url'];
                }

                if(isset($location['email']))       {
                    $loc_info['email'] = $location['email'];
                }

                if(isset($location['phone']))       {
                    $loc_info['phone'] = $location['phone'];
                }

                if(!empty($full_address)) {
                    $loc_info['full_address'] = $full_address;
                }

                $all_locations[$title] = $loc_info;
        }
        $location_info['locations'] = $all_locations;
    }
    if (!empty($phone)) {
        $location_info['phone'] = $phone;
    }
    if (!empty($email)) {
        $location_info['email'] = $email;
    }
    if (!empty($fax)) {
        $location_info['fax'] = $fax;
    }
    // if (!empty($hob)) {
    //     $location_info['hob'] = $hob;
    // }
    return $location_info;
}

/**
 * Function to display html markup for company info
 *
 * @param array $args
 *
 * @return string
 */
function displayLocationInfo($args = array()){

    $defaults = array(
        'wrapper' => '',
        'class' => '',
        'title' => '',
        'icons' => 0,
        'address' => array(
            'content' => '',
            'link' => 0,
            'wrapper' => '',
            'class' => '',
            'title' => '',
        ),
        'phone' => array(
            'content' => '',
            'link' => 1,
            'wrapper' => '',
            'class' => '',
            'title' => '',
        ),
        'fax' => array(
            'content' => '',
            'wrapper' => '',
            'class' => '',
            'title' => '',
        ),
        'email' => array(
            'content' => '',
            'link' => 1,
            'wrapper' => '',
            'class' => '',
            'title' => '',
        ),
        'hob' => array(
            'content' => '',
            'day' => 'D',
            'time' => 'g:ia',
            'wrapper' => '',
            'class' => '',
            'title' => '',
        ),
    );

    $options = array_merge($defaults, $args);
    $wrapper = $options['wrapper'];
    $class = $options['class'];
    $title = $options['title'];
    $icons = $options['icons'];

    // Start Wrapper ===========================================================

    $schema_info = '';
    $schema_info .= (!empty($wrapper)) ? '<' . $wrapper . ' class="schema-info-container' : '';
    $schema_info .= (!empty($class) && !empty($wrapper)) ? ' ' . $class : '';
    $schema_info .= (!empty($wrapper)) ? '">' : '';
    $schema_info .= (!empty($title)) ? '<h4 class="widget-title schema-title">' . $title . '</h4>' : '';

    // Address =================================================================

    $address_content = $options['address']['content'];
    $address_link = $options['address']['link'];
    $address_wrapper = $options['address']['wrapper'];
    $address_class = $options['address']['class'];
    $address_title = $options['address']['title'];

    if (!empty($address_content)) {

        $address_plain = $address_content['full'];
        $street = $address_content['street'];
        $unit = $address_content['unit'];
        $city = $address_content['city'];
        $state = $address_content['state'];
        $zip = $address_content['zip'];
        $map_url = $address_content['map_url'];

        $address = '<span class="schema-info address';
        $address .= ($icons == 1) ? ' has-icon"><span class="schema-icon"></span>' : '">';
        $address .= '<span class="schema-info">';
        $address .= ($street || $unit) ? '<span class="address-line-1">' : '';
        $address .= ($street) ? '<span class="address-street">' . $street . '&nbsp;</span>' : '';
        $address .= ($unit) ? '<span class="address-unit">' . $unit . '</span>' : '';
        $address .= ($street || $unit) ? '</span>' : '';
        $address .= ($city || $state || $zip) ? '<span class="address-line-2">' : '';
        $address .= ($city) ? '<span class="address-city">' . $city . ',&nbsp;</span>' : '';
        $address .= ($state) ? '<span class="address-state">' . $state . '&nbsp;</span>' : '';
        $address .= ($zip) ? '<span class="address-zip">' . $zip . '</span>' : '';
        $address .= ($city || $state || $zip) ? '</span>' : '';
        $address .= '</span>';
        $address .= '</span>';
        $address_url = (!empty($map_url)) ? $map_url : 'http://maps.google.com/?q=' . urlencode($address_plain);

        $schema_info .= (!empty($address_wrapper)) ? '<' . $address_wrapper . ' class="schema-info-block' : '';
        $schema_info .= (!empty($address_wrapper) && !empty($address_class)) ? ' ' . $address_class : '';
        $schema_info .= (!empty($address_wrapper)) ? '">' : '';
        $schema_info .= (!empty($address_title)) ? '<h4 class="widget-title schema-title">' . $address_title . '</h4>' : '';
        $schema_info .= ($address_link == 1) ? '<a href="' . $address_url . '" target="_blank" class="schema-link">' : '';
        $schema_info .= $address;
        $schema_info .= ($address_link == 1) ? '</a>' : '';
        $schema_info .= (!empty($address_wrapper)) ? '</' . $address_wrapper . '>' : '';
    }

    // Phone ===================================================================
    $phone_content = $options['phone']['content'];
    $phone_link = $options['phone']['link'];
    $phone_wrapper = $options['phone']['wrapper'];
    $phone_class = $options['phone']['class'];
    $phone_title = $options['phone']['title'];

    if (!empty($phone_content)) {
        $schema_info .= (!empty($phone_wrapper)) ? '<' . $phone_wrapper . ' class="schema-info-block' : '';
        $schema_info .= (!empty($phone_wrapper) && !empty($phone_class)) ? ' ' . $phone_class : '';
        $schema_info .= (!empty($phone_wrapper)) ? '">' : '';
        $schema_info .= (!empty($phone_title)) ? '<h4 class="widget-title schema-title">' . $phone_title . '</h4>' : '';
        $schema_info .= ($phone_link == 1) ? '<a href="tel:' . urlencode($phone_content) . '" target="_blank" class="schema-link">' : '';
        $schema_info .= '<span class="schema-info phone';
        $schema_info .= ($icons == 1) ? ' has-icon"><span class="schema-icon"></span>' : '">';
        $schema_info .= '<span>' . $phone_content . '</span>';
        $schema_info .= '</span>';
        $schema_info .= ($phone_link == 1) ? '</a>' : '';
        $schema_info .= (!empty($phone_wrapper)) ? '</' . $phone_wrapper . '>' : '';
    }

    // Fax =====================================================================

    $fax_content = $options['fax']['content'];
    $fax_wrapper = $options['fax']['wrapper'];
    $fax_class = $options['fax']['class'];
    $fax_title = $options['fax']['title'];

    if (!empty($fax_content)) {
        $schema_info .= (!empty($fax_wrapper)) ? '<' . $fax_wrapper . ' class="schema-info-block' : '';
        $schema_info .= (!empty($fax_class)) ? ' ' . $fax_class : '';
        $schema_info .= (!empty($fax_wrapper)) ? '">' : '';
        $schema_info .= (!empty($fax_title)) ? '<h4 class="widget-title schema-title">' . $fax_title . '</h4>' : '';
        $schema_info .= '<span class="schema-info fax';
        $schema_info .= ($icons == 1) ? ' has-icon"><span class="schema-icon"></span>' : '">';
        $schema_info .= '<span>' . $fax_content . '</span>';
        $schema_info .= '</span>';
        $schema_info .= (!empty($fax_wrapper)) ? '</' . $fax_wrapper . '>' : '';
    }

    // Email ===================================================================
    $email_content = $options['email']['content'];
    $email_link = $options['email']['link'];
    $email_wrapper = $options['email']['wrapper'];
    $email_class = $options['email']['class'];
    $email_title = $options['email']['title'];

    if (!empty($email_content)) {
        $schema_info .= (!empty($email_wrapper)) ? '<' . $email_wrapper . ' class="schema-info-block' : '';
        $schema_info .= (!empty($email_wrapper) && !empty($email_class)) ? ' ' . $email_class : '';
        $schema_info .= (!empty($email_wrapper)) ? '">' : '';
        $schema_info .= (!empty($email_title)) ? '<h4 class="widget-title schema-title">' . $email_title . '</h4>' : '';
        $schema_info .= ($email_link == 1) ? '<a href="mailto:' . antispambot($email_content) . '" class="schema-link">' : '';
        $schema_info .= '<span class="schema-info email';
        $schema_info .= ($icons == 1) ? ' has-icon"><span class="schema-icon"></span>' : '">';
        $schema_info .= '<span>' . antispambot($email_content) . '</span>';
        $schema_info .= '</span>';
        $schema_info .= ($email_link == 1) ? '</a>' : '';
        $schema_info .= (!empty($email_wrapper)) ? '</' . $email_wrapper . '>' : '';
    }

    // Hours of Business  ======================================================
    $hob_content = $options['hob']['content'];
    $hob_wrapper = $options['hob']['wrapper'];
    $hob_class = $options['hob']['class'];
    $hob_title = $options['hob']['title'];

    if (!empty($hob_content)) {
        $schedules = $hob_content;
        $day_format = $options['hob']['day'];
        $time_format = $options['hob']['time'];
        $hob = '<span class="schema-info hours-of-business';
        $hob .= ($icons == 1) ? ' has-icon"><span class="schema-icon"></span>' : '">';
        $hob .= '<span class="schema-info-inner">';
        foreach ($schedules as $schedule) {
            $open_days = $schedule['applicable_days'];
            $open_time = $schedule['opening_time'];
            $close_time = $schedule['closing_time'];
            $hob .= '<span class="schema-info open-days d-block">';
            if ($open_days) {
                if (count($open_days) > 1) {
                    $day_01 = strtotime($open_days[0]);
                    $day_02 = strtotime(end($open_days));
                    $hob .= '<time class="day-value open">' . date($day_format, $day_01) . '</time><span class="day-label divider">&ndash;</span><time class="day-value closed">' . date($day_format, $day_02) . ': </time>';
                } elseif (count($open_days) == 1) {
                    $day_01 = strtotime($open_days[0]);
                    $hob .= '<time class="day-value open">' . date($day_format, $day_01) . ': </time>';
                }
            }

            if (!empty($open_time) && !empty($close_time)) {
                $open_time = strtotime($open_time);
                $close_time = strtotime($close_time);
                $hob .= '<time class="time-value open">' . date($time_format, $open_time) . '</time><span class="time-label divider">&ndash;</span><time class="time-value closed">' . date($time_format, $close_time) . '</time>';
            } elseif (!empty($open_time)) {
                $open_time = strtotime($open_time);
                $hob .= '<span class="time-label">Opens: </span><time class="time-value">' . date($time_format, $open_time) . '</time>';
            } elseif (!empty($close_time)) {
                $close_time = strtotime($close_time);
                $hob .= '<span class="time-label">Closes: </span><time class="time-value">' . date($time_format, $close_time) . '</time>';
            }
            $hob .= '</span>';
        }
        $hob .= '</span></span>';
        $schema_info .= (!empty($hob_wrapper)) ? '<' . $hob_wrapper . ' class="schema-info-block' : '';
        $schema_info .= (!empty($hob_wrapper) && !empty($hob_class)) ? ' ' . $hob_class : '';
        $schema_info .= (!empty($hob_wrapper)) ? '">' : '';
        $schema_info .= (!empty($hob_title)) ? '<h4 class="widget-title schema-title">' . $hob_title . '</h4>' : '';
        $schema_info .= $hob;
        $schema_info .= (!empty($hob_wrapper)) ? '</' . $hob_wrapper . '>' : '';
    }
    // End Wrapper ============================================================

    $schema_info .= (!empty($wrapper)) ? '</' . $wrapper . '>' : '';


    return $schema_info;
}