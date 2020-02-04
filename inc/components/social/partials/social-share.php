<?php
/** ===========================================================================
 * @package maat
 * @subpackage social
 * @created 3-15-19
 * @author Sam Rankin sam@maatlegal.com>
 * @copyright 2019 Maat Legal
 * -----
 * Last Modified: 3-15-19 at 2:58 pm
 * Modified By: Sam Rankin <sam@maatlegal.com>
 * -----
 * Description: Item description
 * @return string
 * -----
 * HISTORY:
 * Date      	By	Comments
 * ----------	---	----------------------------------------------------------
* ========================================================================= */

function displaySocialShare($class = ''){
    $social_links = '';
    $classes = array('maat-social', 'social-share');
		if(!empty($class)){
			$custom_classes = explode(' ',$class);
			foreach ($custom_classes as $custom_class) {
				array_push($classes, $custom_class);
			}
		}
        $classes = maat_add_item_classes($classes);
    ob_start(); ?>
<div <?php echo $classes; ?>>
    <div class="social-inner">';

        <div class="social-icon">
            <a href="http://www.facebook.com/sharer/sharer.php?u=<?php echo the_permalink(); ?>"
               title="Share this post on Facebook" rel="nofollow" target="_blank">
                <i class="fab fa-facebook-f" aria-hidden="true"></i>
            </a>
        </div>

        <div class="social-icon">
            <?php
                    $socials = get_field('social_profiles', 'options');
                    $twitter_handle = '';
                    foreach ($socials as $social) {
                        $profile_url = $social['profile_url'];
                        if (strpos($profile_url, 'twitter') !== false) {
                            $twitter_handle = '&via=' . str_replace('https://twitter.com/','',$profile_url);
                        }
                    }
                ?>
            <a href="https://twitter.com/intent/tweet?source=<?php the_permalink(); ?>&text=<?php echo urlencode(get_the_title()) . $twitter_handle; ?>"
               title="Share this post on Twitter" rel="nofollow" target="_blank">
                <i class="fab fa-twitter" aria-hidden="true"></i>
            </a>
        </div>

        <div class="social-icon">
            <a href="https://getpocket.com/save?url=<?php the_permalink(); ?>&title=<?php echo urlencode(get_the_title()); ?>"
               target="_blank" title="Add to Pocket"><i class="fab fa-get-pocket" aria-hidden="true"></i><span
                      class="sr-only">Add to Pocket</span></a>
        </div>

        <div class="social-icon">
            <a href="http://www.linkedin.com/shareArticle?mini=true&url=<?php the_permalink(); ?>&title=<?php echo urlencode(get_the_title()); ?>&summary=<?php echo urlencode(get_the_excerpt()); ?>&source=<?php the_permalink(); ?>"
               target="_blank" title="Share on LinkedIn"><i class="fab fa-linkedin" aria-hidden="true"></i><span
                      class="sr-only">Share on LinkedIn</span></a>
        </div>

        <div class="social-icon">
            <a href="mailto:?subject=<?php echo urlencode(get_the_title()); ?>&body=<?php echo urlencode(get_the_excerpt()); ?>:%20<?php echo urlencode(get_the_title()); ?>"
               target="_blank" title="Send email"><i class="fas fa-envelope" aria-hidden="true"></i><span
                      class="sr-only">Send email</span></a>
        </div>
    </div>
</div>
<?php
    $social_links = ob_get_clean();
    return $social_links;
}
