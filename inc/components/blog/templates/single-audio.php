<?php

/** ===========================================================================
 * Description
 * @package Maat Legal Theme
 * @version 0.9.0
 * -----
 * @author Sam Rankin <sam@maatlegal.com>
 * @copyright Copyright (c) 2019 Maat Legal
 * -----
 * Created Date:  6-8-19
 * Last Modified: 6-10-19 at 12:00 pm
 * Modified By:   Sam Rankin <sam@maatlegal.com>
 * -----
 * HISTORY:
 * Date    	By	Comments
 * --------	--	--------------------------------------------------------------
 * ========================================================================= */
$file_location = get_field('file_location');
$file = ($file_location === 'Internal') ? get_field('internal_audio') : get_field('external_audio');

if (!empty($file) && $file_location === 'Internal') { ?>
<audio controls>
    <source src="<?php echo $file['url']; ?>" type="<?php echo $file['mime_type']; ?>">
    Your browser does not support the audio element.
</audio>
<?php } else { ?>
<?php echo $file; ?>
<?php } ?>
