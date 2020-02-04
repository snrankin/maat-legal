<?php

/** ===========================================================================
 * Description
 * @package Maat Legal Theme
 * @version 0.9.0
 * -----
 * @author Sam Rankin <sam@maatlegal.com>
 * @copyright Copyright (c) 2019 Maat Legal
 * -----
 * Created Date:  3-15-19
 * Last Modified: 5-9-19 at 4:13 pm
 * Modified By:   Sam Rankin <sam@maatlegal.com>
 * -----
 * HISTORY:
 * Date    	By	Comments
 * --------	--	--------------------------------------------------------------
 * ========================================================================= */

// Twitter Feed
function buildBaseString($baseURI, $method, $params)
{
    $r = array();
    ksort($params);
    foreach ($params as $key => $value) {
        $r[] = "$key=" . rawurlencode($value);
    }
    return $method . "&" . rawurlencode($baseURI) . '&' . rawurlencode(implode('&', $r));
}

function buildAuthorizationHeader($oauth)
{
    $r = 'Authorization: OAuth ';
    $values = array();
    foreach ($oauth as $key => $value) {
        $values[] = "$key=\"" . rawurlencode($value) . "\"";
    }

    $r .= implode(', ', $values);
    return $r;
}

function addTweetEntityLinks($tweet, $add_links)
{
    // actual tweet as a string
    $tweetText = $tweet['text'];

    // If we want to actually add the links
    if ($add_links == 1) {
        // create an array to hold urls
        $tweetEntites = array();

        $entites = $tweet['entities'];
        $urls = $entites['urls'];
        $hashtags = $entites['hashtags'];
        $mentions = $entites['user_mentions'];


        // add each url to the array
        foreach ($urls as $url) {
            $tweetEntites[] = array(
                'type' => 'url',
                'curText' => substr($tweetText, $url['indices'][0], ($url['indices'][1] - $url['indices'][0])),
                'newText' => '<a href="' . $url['expanded_url'] . '" target="_blank">' . $url['url'] . '</a>',
            );
        } // end foreach

        // add each user mention to the array
        foreach ($mentions as $mention) {
            $string = substr($tweetText, $mention['indices'][0], ($mention['indices'][1] - $mention['indices'][0]));
            $tweetEntites[] = array(
                'type' => 'mention',
                'curText' => mb_substr($tweetText, $mention['indices'][0], ($mention['indices'][1] - $mention['indices'][0]), 'UTF-8'),
                'newText' => '<a href="http://twitter.com/' . $mention['screen_name'] . '" target="_blank">' . $string . '</a>',
            );
        } // end foreach

        // add each hashtag to the array
        foreach ($hashtags as $tag) {
            $string = substr($tweetText, $tag['indices'][0], ($tag['indices'][1] - $tag['indices'][0]));
            $tweetEntites[] = array(
                'type' => 'hashtag',
                'curText' => substr($tweetText, $tag['indices'][0], ($tag['indices'][1] - $tag['indices'][0])),
                'newText' => '<a href="http://twitter.com/search?q=%23' . $tag['text'] . '&src=hash" target=_blank>' . $string . '</a>',
            );
        } // end foreach

        // replace the old text with the new text for each entity
        foreach ($tweetEntites as $entity) {
            $tweetText = str_replace($entity['curText'], $entity['newText'], $tweetText);
        } // end foreach

        return $tweetText;
    } else {
        return $tweetText;
    }
}

function buildTwitterFeed($screen_name, $number_of_tweets, $args = array())
{

    $defaults = array(
        'add_tweet_links'   => 1,
        'show_header'       => 1,
        'header_tag'        => 'h5',
        'header_title'      => 'Latest Tweets',
        'show_username'     => 1,
        'add_username_link' => 1,
    );

    $args = wp_parse_args($args, $defaults);

    $maat = get_option('maat_theme');

    $twitterKeys = $maat['twitter_feed'];

    $oauth_access_token         = $twitterKeys['access_token'];
    $oauth_access_token_secret  = $twitterKeys['access_token_secret'];
    $consumer_key               = $twitterKeys['consumer_api_key'];
    $consumer_secret            = $twitterKeys['consumer_api_key_secret'];

    $twitter_timeline = "user_timeline"; //  mentions_timeline / user_timeline / home_timeline / retweets_of_me

    //  create request
    $request = array(
        'screen_name' => $screen_name,
        'count' => $number_of_tweets,
    );

    $oauth = array(
        'oauth_consumer_key' => $consumer_key,
        'oauth_nonce' => time(),
        'oauth_signature_method' => 'HMAC-SHA1',
        'oauth_token' => $oauth_access_token,
        'oauth_timestamp' => time(),
        'oauth_version' => '1.0',
    );

    //  merge request and oauth to one array
    $oauth = array_merge($oauth, $request);

    //  do some magic
    $base_info = buildBaseString("https://api.twitter.com/1.1/statuses/$twitter_timeline.json", 'GET', $oauth);
    $composite_key = rawurlencode($consumer_secret) . '&' . rawurlencode($oauth_access_token_secret);
    $oauth_signature = base64_encode(hash_hmac('sha1', $base_info, $composite_key, true));
    $oauth['oauth_signature'] = $oauth_signature;

    //  make request
    $header = array(buildAuthorizationHeader($oauth), 'Expect:');
    $options = array(
        CURLOPT_HTTPHEADER => $header,
        CURLOPT_HEADER => false,
        CURLOPT_URL => "https://api.twitter.com/1.1/statuses/$twitter_timeline.json?" . http_build_query($request),
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_SSL_VERIFYPEER => false
    );

    $feed = curl_init();
    curl_setopt_array($feed, $options);
    $json = curl_exec($feed);
    curl_close($feed);

    $items = json_decode($json, true);

    $twitterFeed = '<div class="maat-twitter-feed">';
    $tweetAuthor = '@' . $screen_name;
    if ($args['add_username_link'] == 1) {
        $tweetAuthor = '<a href="https://twitter.com/' . $screen_name . '" target="_blank" class="maat-tweet-meta-txt">@' . $screen_name . '</a>';
    }
    if ($args['show_header'] == 1 && !empty($args['header_title'])) {
        $twitterFeed .= '<div class="maat-twitter-feed-header">';
        $twitterFeed .= '<div class="' . $args['header_tag'] . '"><i class="maat-twitter-icon fab fa-twitter large"></i><span>' . $args['header_title'] . '</span></div>';
        $twitterFeed .= '</div>';
    }
    $tweets = '<div class="maat-tweets flex-fill">';
    foreach ($items as $item) {
        $tweets .= '<div class="maat-tweet">';
        $tweets .= '<p class="maat-tweet-txt">' . addTweetEntityLinks($item, $args['add_tweet_links']) . '</p>';
        $tweets .= '<time class="small maat-tweet-meta"><i class="far fa-clock"></i><span class="maat-tweet-meta-txt">';
        $tweets .= time_elapsed_string($item['created_at']);
        $tweets .= '</span>';
        $tweets .= '</time>';
        $tweets .= '</div>';
    }
    $tweets .= '</div>';

    $twitterFeed .= $tweets;
    if ($args['show_username']  == 1) {
        $twitterFeed .= '<div class="maat-twitter-feed-footer small text-right">Follow Us: ' . $tweetAuthor . '</div >';
    }
    $twitterFeed .= '</div>';

    return $twitterFeed;
}
