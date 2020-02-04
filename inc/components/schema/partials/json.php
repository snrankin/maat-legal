<?php

/*
 * Copyright (c) 2018 snrankin
 *
 * @Script: json.php
 * @Author: snrankin
 * @Email: snrankin@me.com
 * @Create At: 2018-05-23 11:54:21
 * @Last Modified By: snrankin
 * @Last Modified At: 2018-06-08 11:41:55
 * @Description: This is description.
 */

$settings = get_option('themesettings_');

function parentSchema()
{
    $parent_ID = get_field('parent_location', 'options');
    $parent_name = (get_field('location_name', $parent)) ? get_field('location_name', $parent) : get_bloginfo('name');
    $parent_type = get_field('location_type', $parent_ID);
    $parent_address = address_schema($parent_ID);
    $parent_hob = hob_schema($parent_ID);
    $parent_social = social_schema($parent_ID);
    $parent_image = get_the_post_thumbnail_url($parent_ID);
    $parent_phone = get_field('location_phone', $parent_ID);
    $parent_email = get_field('location_email', $parent_ID);

    $parentJSON = array(
        '@type' => $parent_type,
        'name' => $parent_name,
    );

    if(!empty($parent_image)){
        $parentJSON['image'] = $parent_image;
    }
    if (!empty($parent_address)) {
        $parentJSON = array_merge($parentJSON, $parent_address);
    }

    if (!empty($parent_phone)) {
        $parentJSON['telephone'] = $parent_phone;
    }
    if (!empty($parent_email)) {
        $parentJSON['email'] = $parent_email;
    }

    // return '<p>Test</p><script type="application/ld+json">' . $json . '</script>';
    return $parentJSON;
}

function address_schema($location_id){
    $locationJSON = '';
    $address = get_field('location_address', $location_id);
    $map_url = get_field('location_map_url', $location_id);

    if (!empty($address)) {
        $locationJSON = array();
        $full_address = $address['address'];
        $lat = $address['lat'];
        $lng = $address['lng'];

        $address_parts = getAddress($lat, $lng);
        $street = $address_parts[0]['short_name'] . ' ' . $address_parts[1]['short_name'];
        preg_match('/(APT|BLDG|FL|SUITE|STE|UNIT|ROOM|RM|DEPT|#)\h?\w*/i', $full_address, $unit);
        $street .= (isset($unit[0])) ? ', ' . $unit[0] : '';
        $city = $address_parts[3]['short_name'];
        $state = $address_parts[5]['short_name'];
        $zip = $address_parts[7]['short_name'];
        $addressJson = array(
            '@type' => 'PostalAddress',
        );

        if (!empty($street)) {
            $addressJson['streetAddress'] = $street;
        }
        if (!empty($city)) {
            $addressJson['addressLocality'] = $city;
        }
        if (!empty($state)) {
            $addressJson['addressRegion'] = $state;
        }
        if (!empty($zip)) {
            $addressJson['postalCode'] = $zip;
        }

        $locationJSON['address'] = $addressJson;

        $locationJSON['geo'] = array(
            '@type' => 'GeoCoordinates',
            'latitude' => $lat,
            'longitude' => $lng,
        );
        $map_url = (!empty($map_url)) ? $map_url : 'https://www.google.com/maps/place/' . urlencode($full_address);
        $locationJSON['hasmap'] = $map_url;

    }

    return $locationJSON;
}

function contact_schema($location_id){
    $contactJSON = '';
    $phone = get_field('location_phone', $location_id);
    $fax = get_field('location_fax', $location_id);
    $email = get_field('location_email', $location_id);
    $parent_ID = get_field('parent_location', 'options');
    $parent_phone = get_field('location_phone', $parent_ID);
    $parent_fax = get_field('location_fax', $parent_ID);
    $parent_email = get_field('location_email', $parent_ID);
    if (!empty($phone) || !empty($email) || !empty($fax)) {
        $contactJSON = array();
        if (!empty($phone)) {
            $contactJSON['telephone'] = $phone;
        } else{
            $contactJSON['telephone'] = $parent_phone;
        }
        if (!empty($email)) {
            $contactJSON['email'] = $email;
        } else{
            $contactJSON['email'] = $parent_email;
        }
        if (!empty($fax)) {
            $contactJSON['faxNumber'] = $fax;
        } else{
            $contactJSON['faxNumber'] = $parent_fax;
        }
    }

    return $contactJSON;
}

function hob_schema($location_id){
    $hobJSON = '';
    $hob = get_field('location_hob', $location_id);
    $profiles = get_field('location_social_profiles', $location_id);
    if (!empty($hob)) {
        $schedules = $hob;
        $hobJSON = array();
        foreach ($schedules as $schedule) {
            $open_days = $schedule['applicable_days'];
            $open_time = $schedule['opening_time'];
            $close_time = $schedule['closing_time'];
            $schedule_slot = '';
            if ($open_days) {
                $day_01 = substr($open_days[0], 0, 2);
                $day_02 = substr(end($open_days), 0, 2);
                if (count($open_days) > 1) {
                    $schedule_slot .= $day_01 . '-' . $day_02;
                } elseif (count($open_days) == 1) {
                    $schedule_slot .= $day_01;
                }
            }
            $open_time = date('H:i', strtotime($open_time));
            $close_time = date('H:i', strtotime($close_time));
            if (!empty($open_time) && !empty($close_time)) {
                $schedule_slot .= ' ' . $open_time . '-' . $close_time;
            } elseif (!empty($open_time)) {
                $schedule_slot .= ' ' . $open_time;
            } elseif (!empty($close_time)) {
                $schedule_slot .= ' ' . $close_time;
            }
            $hobJSON[] = $schedule_slot;
        }
    }

    return $hobJSON;
}

function social_schema($location_id){
    $location_profiles = get_field('location_social_profiles', $location_id);
    $social = '';
    if (!empty($location_profiles)) {
        $location_social = array();
        foreach($location_profiles as $location_profile){
		    $location_social[] = $location_profile['profile_url'];
        }
    }
    return $location_social;
}

function schemaJSON()
{

    $schema = '';

    $locationPosts = wp_count_posts('location');
    $locationCount = $locationPosts->publish;
    $parent_ID = get_field('parent_location', 'options');
    $parent_name = (get_field('location_name', $parent)) ? get_field('location_name', $parent) : get_bloginfo('name');
    $parent_type = get_field('location_type', $parent_ID);
    $parent_address = address_schema($parent_ID);
    $parent_contact = contact_schema($parent_ID);
    $parent_hob = hob_schema($parent_ID);
    $parent_social = social_schema($parent_ID);

    $location_id = '';
    // If there are any physical locations
    if($locationPosts->publish > 0){

        $locationCount = $locationPosts->publish;

        $schema = array();

        $schema['@context'] = 'http://schema.org';
        $schema['@id'] = esc_url(home_url('/'));
        $schema['url'] = esc_url(home_url('/'));
        $schema['name'] = $parent_name;
        $schema['description'] = (!empty(get_field('location_description', $parent_ID))) ? get_field('location_description', $parent_ID) : get_bloginfo('description');
        $logo = get_field('location_logo', $parent_ID);
        if (!empty($logo)) {
            $schema['logo'] = $logo;
        }
        if($locationCount == 1){
            $schema['@type'] = $parent_type;
            if (!empty($parent_address)) {
                $schema = array_merge($schema, $parent_address);
            }
            if (!empty($parent_hob)) {
                $schema['openingHoursSpecification'] = $parent_hob;
            }

        } else {
            $schema['@type'] =  'Organization';
        }
        if (!empty($parent_contact)) {
            $schema = array_merge($schema, $parent_contact);
        }
        if (!empty($parent_social)) {
            $schema['sameAs'] = $parent_social;
        }

        if($locationCount >= 2){
            $all_locations = '';
            $args = array(
                'post_type' => array('location'),
                'posts_per_page' => '-1'
            );

            $all_locations = array();

            // The Query
            $locations = new WP_Query($args);

            // The Loop
            if ($locations->have_posts()) {
                while ($locations->have_posts()) {
                    $locationJSON = array();
                    $locations->the_post();
                    $location_address = address_schema(get_the_ID());
                    $location_contact = contact_schema(get_the_ID());
                    $location_hob = hob_schema(get_the_ID());
                    $location_social = social_schema(get_the_ID());
                    $locationJSON['@id'] = get_the_permalink();
                    $locationJSON['name'] = (get_field('location_name')) ? get_field('location_name') : get_the_title();
                    $locationJSON['@type'] = 'LocalBusiness';

                    $locationJSON['parentOrganization'] = parentSchema();

                    if(!empty(get_the_post_thumbnail_url())){
                        $locationJSON['image'] = get_the_post_thumbnail_url();
                    }
                    if (!empty($location_address)) {
                        $locationJSON = array_merge($locationJSON, $location_address);
                    }
                    if (!empty($location_contact)) {
                        $locationJSON = array_merge($locationJSON, $location_contact);
                    }
                    if (!empty($location_social) && get_the_ID() !== $parent_ID) {
                        $locationJSON['sameAs'] = $location_social;
                    }
                    if (!empty($location_hobb)) {
                        $locationJSON['openingHoursSpecification'] = $location_hob;
                    }
                    $all_locations[] = $locationJSON;
                }
            }
            wp_reset_postdata();
            if (!empty( $all_locations)) {
                $schema['location'] = $all_locations;
            }
        }
    }
    $json = json_encode($schema);
    echo '<script type="application/ld+json">' . $json . '</script>';
}
