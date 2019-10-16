<?php
/*
 |--------------------------------------------------------------------------
 | Global Constants for the Application
 |--------------------------------------------------------------------------
 */

/**
 * @info: Commonly used application contacts
 * @author: tanmayap@riaxe.com 
 * @date: 21 Aug 2019
 */
/**
 * NEED TO CHANGE BY USER AFTER INSTALLATION
 */
defined('WORKING_DIR') OR define('WORKING_DIR', '/api/v1/');

/**
 * System Specific Constants.
 * NO NEED TO CHANGE
 */
$domainUrl = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://" . $_SERVER['HTTP_HOST'];
defined('BASE_URL')                     OR define('BASE_URL', $domainUrl . '/api/v1/');
defined('APP_BASE_PATH')                OR define('APP_BASE_PATH', $_SERVER['DOCUMENT_ROOT'] . '/api/v1/');
defined('UPLOAD_FOLDER')                OR define('UPLOAD_FOLDER', $_SERVER['DOCUMENT_ROOT'] . '/api/v1/uploads/');
defined('EXTRACTED_FOLDER')             OR define('EXTRACTED_FOLDER', $_SERVER['DOCUMENT_ROOT'] . '/api/v1/uploads/extracted/');
defined('VECTOR_FOLDER')                OR define('VECTOR_FOLDER', $_SERVER['DOCUMENT_ROOT'] . '/api/v1/uploads/vectors/');
defined('SHOW_EXCEPTION')               OR define('SHOW_EXCEPTION', true);
defined('PAGINATION_MAX_ROW')           OR define('PAGINATION_MAX_ROW', 10);

/**
 * Store's Installation Global Constants
 * CHANGED AT INSTALLATION TIME
 */
defined('STORE_NAME')                   OR define('STORE_NAME', 'WCV3'.'StoreCategory');
defined('STORE_VERSION')                OR define('STORE_VERSION', 'v3x');
defined('WC_API_URL')                   OR define('WC_API_URL', $domainUrl . '/wp-woocommerce/');
defined('WC_API_CK')                    OR define('WC_API_CK', 'ck_e52bef48f59478eeccc233823db3f5bfe09bceb9');
defined('WC_API_CS')                    OR define('WC_API_CS', 'cs_5df7733a67b2acea2e5cb69b62357ed151e51f07');
defined('WC_API_VER')                   OR define('WC_API_VER', 'wc/v3');
defined('WC_API_SECURE')                OR define('WC_API_SECURE', false);

/**
* For managing slashes in both windows ans linux
* Keep the slash as \\ for windows and for Linus keep it as
*/
if (strtoupper(substr(PHP_OS, 0, 3)) === 'WIN') {
    // For Windows System configs
    defined('SLASH') OR define('SLASH', '\\');
} else {
    // For ;linux System configs
    defined('SLASH') OR define('SLASH', '/');
}

/**
 * @info: HTTP ERROR CODE Mapping Constants
 * @author: tanmayap@riaxe.com
 * @date: 11 Sep 2019
 */
defined('AUTH_ERROR')                   OR define('AUTH_ERROR', 401);
defined('OPERATION_OKAY')               OR define('OPERATION_OKAY', 200);
defined('NO_DATA_FOUND')                OR define('NO_DATA_FOUND', 200);
defined('MISSING_PARAMETER')            OR define('MISSING_PARAMETER', 400);
defined('EXCEPTION_OCCURED')            OR define('EXCEPTION_OCCURED', 500);
defined('DATA_NOT_PROCESSED')           OR define('DATA_NOT_PROCESSED', 500);
defined('INVALID_FORMAT_REQUESTED')     OR define('INVALID_FORMAT_REQUESTED', 406);
