<?php
if ($_GET['key'] != 'martaApp') {
    die;
}
header("Content-type:application/json");
header("Access-Control-Allow-Origin: *");

// https://github.com/J7mbo/twitter-api-php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
require_once('TwitterAPIExchange.php');
require_once('config.php');

/** Perform a GET request and echo the response **/
/** Note: Set the GET field BEFORE calling buildOauth(); **/
$url = "https://api.twitter.com/1.1/statuses/user_timeline.json";
$getfield = '?screen_name=martaservice&tweet_mode=extended&exclude_replies=true&count=50';
$requestMethod = 'GET';
$twitter = new TwitterAPIExchange($settings);
$json = $twitter->setGetfield($getfield)
    ->buildOauth($url, $requestMethod)
    ->performRequest();
//$json = mb_convert_encoding($json, "UTF-8", "auto");
$tweets = json_decode($json, true);
//print_r($tweets);
// Count is roughly 50 above but that includes replies that were stripped so here we limit to 30
// so we really get 30
$tweets = array_slice($tweets, 0, 30);

foreach ($tweets as $k => $t) {

    $rt = false;
    if (isset($t['retweeted_status'])) {
        $rt = true;
        $t = $t['retweeted_status'];
    }
    $theRest = 0;
    $text = $rt ? 'RT @'.$t['user']['screen_name'].': ' : '';
    if (isset($t['entities']['urls']) && is_array($t['entities']['urls'])) {
        foreach ($t['entities']['urls'] as $k2 => $url) {
            $text .= mb_substr($t['full_text'], $theRest, $url['indices'][0]);
            $text .= '<a href="'.$url['url'].'" target="_blank">'.$url['display_url'].'</a>';
            $theRest = $url['indices'][1];
        }
    }
    $text .= mb_substr($t['full_text'], $theRest);

    if (isset($t['entities']['media']) && is_array($t['entities']['media'])) {
        foreach ($t['entities']['media'] as $m) {
            $text = str_replace($m['url'], '', $text);
        }
    }
    if ($rt) {
        $tweets[$k]['retweeted_status']['full_text'] = trim($text);
    } else {
        $tweets[$k]['full_text'] = trim($text);
    }
}

$json = json_encode($tweets);
if ($json === false) {
    switch (json_last_error()) {
        case JSON_ERROR_NONE:
            echo ' - No errors';
            break;
        case JSON_ERROR_DEPTH:
            echo ' - Maximum stack depth exceeded';
            break;
        case JSON_ERROR_STATE_MISMATCH:
            echo ' - Underflow or the modes mismatch';
            break;
        case JSON_ERROR_CTRL_CHAR:
            echo ' - Unexpected control character found';
            break;
        case JSON_ERROR_SYNTAX:
            echo ' - Syntax error, malformed JSON';
            break;
        case JSON_ERROR_UTF8:
            echo ' - Malformed UTF-8 characters, possibly incorrectly encoded';
            break;
        default:
            echo ' - Unknown error';
            break;
    }
} else {
    echo $json;
}