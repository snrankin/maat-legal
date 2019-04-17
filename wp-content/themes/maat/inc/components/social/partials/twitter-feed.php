<?php
/** ===========================================================================
 * @package maat
 * @subpackage /inc/components/social/partials/twitter-feed.php
 * @created 3-15-19
 * @author Sam Rankin sam@maatlegal.com>
 * @copyright 2019 Maat Legal
 * -----
 * Last Modified: 3-15-19 at 2:59 pm
 * Modified By: Sam Rankin <sam@maatlegal.com>
 * -----
 * Description: Item description
 * @return mixed
 * -----
 * HISTORY:
 * Date      	By	Comments
 * ----------	---	----------------------------------------------------------
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

        // add each url to the array
        foreach ($tweet['entities']['urls'] as $url) {
            $tweetEntites[] = array(
                'type' => 'url',
                'curText' => substr($tweetText, $url['indices'][0], ($url['indices'][1] - $url['indices'][0])),
                'newText' => '<a href="' . $url['expanded_url'] . '" target="_blank">' . $url['display_url'] . '</a>',
            );
        } // end foreach

        // add each user mention to the array
        foreach ($tweet['entities']['user_mentions'] as $mention) {
            $string = substr($tweetText, $mention['indices'][0], ($mention['indices'][1] - $mention['indices'][0]));
            $tweetEntites[] = array(
                'type' => 'mention',
                'curText' => mb_substr($tweetText, $mention['indices'][0], ($mention['indices'][1] - $mention['indices'][0]), 'UTF-8'),
                'newText' => '<a href="http://twitter.com/' . $mention['screen_name'] . '" target="_blank">' . $string . '</a>',
            );
        } // end foreach

        // add each hashtag to the array
        foreach ($tweet['entities']['hashtags'] as $tag) {
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

function returnTweet($screen_name, $number_of_tweets, $add_links, $add_username, $add_author_link)
{

    // Get Tweets

    $oauth_access_token = "2296334100-mxbTpDoDNJwkMDsYX4A4QovelYNTBRtArfobWYe";
    $oauth_access_token_secret = "AYBoR4XzbnxcEZPggRLsx01x6fZ3chfDkbIGg4bVtANBc";
    $consumer_key = "v3uCcEDNF3CuBblKlHWEWtdYH";
    $consumer_secret = "kZbHhSsPTalVQfsR9mDxcMHsPrlRCeyf5JbBfsahWpzRUTJh8i";

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
    $options = array(CURLOPT_HTTPHEADER => $header,
        CURLOPT_HEADER => false,
        CURLOPT_URL => "https://api.twitter.com/1.1/statuses/$twitter_timeline.json?" . http_build_query($request),
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_SSL_VERIFYPEER => false);

    $feed = curl_init();
    curl_setopt_array($feed, $options);
    $json = curl_exec($feed);
    curl_close($feed);

    $items = json_decode($json, true);

    $tweets = '';
    $links = array();

    foreach ($items as $item) {
        $tweetTxt = addTweetEntityLinks($item, $add_links);
        $tweetDate = time_elapsed_string($item['created_at']);
        $tweetIcon = '<i class="maat-tweet-icon"></i>';
        $tweetAuthorTxt = '@' . $item['user']['screen_name'];
        $tweetAuthor = ($add_author_link == 1) ? '<a href="https://twitter.com/' . $tweetAuthorTxt . '" target="_blank" class="maat-tweet-meta-txt">' . $tweetAuthorTxt . '</a>' : '<span class="maat-tweet-meta-txt">' . $tweetAuthorTxt . '</span>';

        $tweets .= '<div class="maat-tweet">';
        $tweets .= '<p class="maat-tweet-txt">' . $tweetTxt . '</p>';
        $tweets .= ($add_username == 1) ? '<p class="maat-tweet-meta maat-tweet-author"><span class="maat-tweet-meta-inner">' . $tweetIcon . $tweetAuthor . '</span></p>' : '';
        $tweets .= '<p class="maat-tweet-date maat-tweet-meta"><span class="maat-tweet-meta-inner">';
        $tweets .= $tweetIcon;
        $tweets .= '<span class="maat-tweet-meta-txt">';
        $tweets .= $tweetDate;
        $tweets .= '</span>';
        $tweets .= '</span></p>';
        $tweets .= '</div>';
    }

    return $tweets;
}
