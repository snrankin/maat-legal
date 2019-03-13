<?php
/**
 * Local settings, you should keep these outside of version control
 *
 * Please note this file is loaded first, then the environment config is loaded.
 * Don't duplicate any WP config settings in this file and the environment file
 * since WordPress uses constants and you'll raise a PHP notice error.
 *
 * Enter any WordPress config settings that are specific to the local environment
 * in this file.
 *
 * @package    Studio 24 WordPress Multi-Environment Config
 * @version    2.0.0
 * @author     Studio 24 Ltd  <hello@studio24.net>
 */

/** MySQL database password */
if (defined('WP_ENV')) {
    if (WP_ENV === 'dev') {
        define('DB_PASSWORD', 'root');
    } elseif (WP_ENV === 'stage') {
        define('DB_PASSWORD', '8RnVZL0KEYe~r*9;n$');
    } elseif (WP_ENV === 'prod') {
        define('DB_PASSWORD', '8RnVZL0KEYe~r*9;n$');
    }
}
