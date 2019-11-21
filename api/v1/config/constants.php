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
defined('UPLOAD_FOLDER')                OR define('UPLOAD_FOLDER', $_SERVER['DOCUMENT_ROOT'] . '/assets/');
defined('EXTRACTED_FOLDER')             OR define('EXTRACTED_FOLDER', $_SERVER['DOCUMENT_ROOT'] . '/assets/extracted/');
defined('VECTOR_FOLDER')                OR define('VECTOR_FOLDER', $_SERVER['DOCUMENT_ROOT'] . '/assets/vectors/');
defined('PRODUCT_FOLDER')               OR define('PRODUCT_FOLDER', $_SERVER['DOCUMENT_ROOT'] . '/assets/products/');
defined('SWATCH_FOLDER')                OR define('SWATCH_FOLDER', $_SERVER['DOCUMENT_ROOT'] . '/assets/swatches/');
defined('PRINT_PROFILE_FOLDER')         OR define('PRINT_PROFILE_FOLDER', $_SERVER['DOCUMENT_ROOT'] . '/assets/print_profile/');
defined('PRINT_AREA_FOLDER')            OR define('PRINT_AREA_FOLDER', $_SERVER['DOCUMENT_ROOT'] . '/assets/print_area/');
defined('PRINT_AREA_TYPE_FOLDER')       OR define('PRINT_AREA_TYPE_FOLDER', $_SERVER['DOCUMENT_ROOT'] . '/assets/print_area_type/');
defined('FONT_FOLDER')                  OR define('FONT_FOLDER', $_SERVER['DOCUMENT_ROOT'] . '/assets/fonts/');
defined('SHAPE_FOLDER')                 OR define('SHAPE_FOLDER', $_SERVER['DOCUMENT_ROOT'] . '/assets/shapes/');
defined('DISTRESS_FOLDER')              OR define('DISTRESS_FOLDER', $_SERVER['DOCUMENT_ROOT'] . '/assets/distresses/');
defined('COLOR_FOLDER')                 OR define('COLOR_FOLDER', $_SERVER['DOCUMENT_ROOT'] . '/assets/colors/');
defined('BACKGROUNDPATTERN_FOLDER')     OR define('BACKGROUNDPATTERN_FOLDER', $_SERVER['DOCUMENT_ROOT'] . '/assets/patterns/');
defined('MASK_FOLDER')                  OR define('MASK_FOLDER', $_SERVER['DOCUMENT_ROOT'] . '/assets/masks/');
defined('GRAPHICFONT_FOLDER')           OR define('GRAPHICFONT_FOLDER', $_SERVER['DOCUMENT_ROOT'] . '/assets/graphics/');
defined('WORDCLOUDS_FOLDER')            OR define('WORDCLOUDS_FOLDER', $_SERVER['DOCUMENT_ROOT'] . '/assets/wordclouds/');
defined('SHOW_EXCEPTION')               OR define('SHOW_EXCEPTION', true);
defined('PAGINATION_MAX_ROW')           OR define('PAGINATION_MAX_ROW', 10);

/**
 * Store's Installation Global Constants
 * CHANGED AT INSTALLATION TIME
 */
defined('STORE_NAME')                   OR define('STORE_NAME', 'WCV3'.'StoreCategory');
defined('STORE_VERSION')                OR define('STORE_VERSION', 'v3x');
defined('WC_API_URL')                   OR define('WC_API_URL', 'http://18.188.71.224/stores/woocommerce/');
defined('WC_API_CK')                    OR define('WC_API_CK', 'ck_654ba63979664c47eb14587dcb33030fd81970a3');
defined('WC_API_CS')                    OR define('WC_API_CS', 'cs_c19b5120a54e25cf4e95bd6d8a4ec3d5db8e44cf');
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
