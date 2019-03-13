<?php
/**
 * Default config settings
 *
 * Enter any WordPress config settings that are default to all environments
 * in this file.
 *
 * Please note if you add constants in this file (i.e. define statements)
 * these cannot be overridden in environment config files so make sure these are only set once.
 *
 * @package    Studio 24 WordPress Multi-Environment Config
 * @version    2.0.0
 * @author     Studio 24 Ltd  <hello@studio24.net>
 */

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8mb4');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY', '6PeeR2fPogonEbqGkO5bnaUz4HocEHuj0z0Opa1nDfkkFUM85VKIckYtCWrPyNGvz1KDFulrRVrOErIqjKZvTw==');
define('SECURE_AUTH_KEY', 'UCYQSsZltjOZbV+AXuH9PmcvERO41x2E1j1uAYc5F6V2B3QncIl/Tiowt6AUTFvMxvwu98XGGwhGpPUJA0Py4Q==');
define('LOGGED_IN_KEY', 'a7c3eoA5jqE3CrMcvlgKT5ScSst5iZFJU0i9xsusw/qA2iXlG1OKejfNR6YAr4ybi77V+p/pX8ysXw+ZpWYG9w==');
define('NONCE_KEY', 'SCZawaFX+0TSM0j7XeT1LgBey2i7O8KyzIT8MrNkiukYsPljjQPPmGIFOLHDL58h+0YPN0pG37WGfHXbrC0RTw==');
define('AUTH_SALT', '52sObNKmhRv/Xc0gNPUHOppNvU5oggjDsQqij0Z7Tb3Yp+oUkUwxAtmzuYEm2zDzruo2UlFS5yZzbcKXfHoWXA==');
define('SECURE_AUTH_SALT', 'p4gGfp25BKJYaeaeFMhW0BPC7EkiThYAwcdmCVadk/nh/itCbO4n+RZ8KWq1bOsbKgTazpo0Jf0XV98wAx7Fiw==');
define('LOGGED_IN_SALT', 'y8qxxlvnA46xi9UDOQ42+se6D7N0I45OrV+PsO9AVCWDMg52JeCBcofEKfN5BTRcOEmCaIx2zio1LkLlMepaZA==');
define('NONCE_SALT', 'M3BWKnAuYr4mFpR48DLLkMEHA4K9mA0PH2k/M5pm7GcaJuszNVvEJ/p+ObwS1U/IBgzvAuq/ndjcguyFpRFfSw==');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each a unique
 * prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';

/**
 * WordPress Localized Language, defaults to English.
 *
 * Change this to localize WordPress. A corresponding MO file for the chosen
 * language must be installed to wp-content/languages. For example, install
 * de_DE.mo to wp-content/languages and set WPLANG to 'de_DE' to enable German
 * language support.
 */
define('WPLANG', '');

/**
 * Increase memory limit.
 */
define('WP_MEMORY_LIMIT', '64M');

/**
 * Debug settings
 */

define('WP_DEBUG_LOG', true);
define('WP_DEBUG_DISPLAY', false);
@ini_set('display_errors', 0);
error_reporting(E_ERROR | E_WARNING | E_PARSE);
