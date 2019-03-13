<?php
 // Create variable length excerpt
function maat_variable_length_excerpt($text, $length = 30, $finish_sentence = 1)
{

    $tokens = array();
    $out = '';
    $word = 0;

    //Divide the string into tokens; HTML tags, or words, followed by any whitespace.
    $regex = '/(<[^>]+>|[^<>\s]+)\s*/u';
    preg_match_all($regex, $text, $tokens);
    foreach ($tokens[0] as $t) {
        //Parse each token
        if ($word >= $length && !$finish_sentence) {
            //Limit reached
            break;
        }
        if ($t[0] != '<') {
            //Token is not a tag.
            //Regular expression that checks for the end of the sentence: '.', '?' or '!'
            $regex1 = '/[\?\.\!\,]\s*$/uS';
            if ($word >= $length && $finish_sentence && preg_match($regex1, $t) == 1) {
                //Limit reached, continue until ? . or ! occur to reach the end of the sentence.
                $out .= trim($t);
                break;
            }
            $word++;
        }
        //Append what's left of the token.
        $out .= $t;
    }
    //Add the excerpt ending as a link.
    $excerpt_end = ' [&hellip;]';

    //Add the excerpt ending as a non-linked ellipsis with brackets.
    //$excerpt_end = ' [&hellip;]';

    //Append the excerpt ending to the token.
    $out .= $excerpt_end;

    return trim(force_balance_tags($out));
}

function maat_excerpt_filter($text)
{

    $text = get_the_content('');
    $text = strip_shortcodes($text);
    $text = apply_filters('the_content', $text);

    $text = str_replace(']]>', ']]&gt;', $text);

    /**By default the code allows all HTML tags in the excerpt**/
    //Control what HTML tags to allow: If you want to allow ALL HTML tags in the excerpt, then do NOT touch.

    //If you want to Allow SOME tags: THEN Uncomment the next line + Line 80.
    $allowed_tags = '<p>'; /* Here I am allowing p, a, strong tags. Separate tags by comma. */

    //If you want to Disallow ALL HTML tags: THEN Uncomment the next line + Line 80,
    //$allowed_tags = ''; /* To disallow all HTML tags, keep it empty. The Excerpt will be unformated but newlines are preserved. */
    $text = strip_tags($text, $allowed_tags); /* Line 80 */

    //Create the excerpt.
    $text = maat_variable_length_excerpt($text, 15, 1);
    return $text;
}
add_filter('get_the_excerpt', 'maat_excerpt_filter', 5);
