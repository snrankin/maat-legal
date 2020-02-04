<?php
/** ===========================================================================
 * @package maat
 * @subpackage /sidebar.php
 * @created 3-4-19
 * @author Sam Rankin sam@maatlegal.com>
 * @copyright 2019 Maat Legal
 * -----
 * Last Modified: 3-12-19 at 1:11 pm
 * Modified By: Sam Rankin <sam@maatlegal.com>
 * -----
 * Description: The sidebar containing the main widget area
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 * -----
 * HISTORY:
 * Date      	By	Comments
 * ----------	---	----------------------------------------------------------
* ========================================================================= */

?>
<?php
if ( ! is_active_sidebar( 'sidebar-1' ) ) {
	return;
}
?>

<aside id="secondary" class="widget-area">
	<?php dynamic_sidebar( 'sidebar-1' ); ?>
</aside><!-- #secondary -->
