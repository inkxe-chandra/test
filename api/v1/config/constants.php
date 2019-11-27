<?php
/*
 |--------------------------------------------------------------------------
 | Global Constants for the Application
 |--------------------------------------------------------------------------
 */

defined('XE_ENV') OR define('XE_ENV', 'development');

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
defined('RELATIVE_PATH')                OR define('RELATIVE_PATH', $_SERVER['DOCUMENT_ROOT'] . WORKING_DIR );
defined('BASE_URL')                     OR define('BASE_URL', $domainUrl . WORKING_DIR); // http://localhost/api/v1/

/*
|--------------------------------------------------------------------------
| Assets Read and Write Path Configuration
|--------------------------------------------------------------------------
|
| You can set the Assets path before using the applciation
|
| IMPORTANT: Assets folder contains all the module's corresponding fodlers and sub-folders. 
|            Make sure that all the module's folders are setup correctly
*/
// defined('ASSETS_PATH_W')                  OR define('ASSETS_PATH_W', $_SERVER['DOCUMENT_ROOT'] . '/api/v1/uploads/');
defined('ASSETS_PATH_W')                  OR define('ASSETS_PATH_W', $_SERVER['DOCUMENT_ROOT'] . '/api/assets/'); ///for server
defined('ASSETS_PATH_R')                  OR define('ASSETS_PATH_R', $domainUrl . '/api/assets/'); ///for server
// defined('ASSETS_PATH_R')                  OR define('ASSETS_PATH_R', $domainUrl . '/api/v1/uploads/');

// Modules Folders
defined('EXTRACTED_FOLDER')             OR define('EXTRACTED_FOLDER', 'extracted/');
defined('VECTOR_FOLDER')                OR define('VECTOR_FOLDER', 'vectors/'); // clipart folder
defined('PRODUCT_FOLDER')               OR define('PRODUCT_FOLDER', 'products/');
defined('SWATCH_FOLDER')                OR define('SWATCH_FOLDER', 'swatches/');
defined('PRINT_PROFILE_FOLDER')         OR define('PRINT_PROFILE_FOLDER', 'print_profile/');
defined('PRINT_AREA_FOLDER')            OR define('PRINT_AREA_FOLDER', 'print_area/');
defined('PRINT_AREA_TYPE_FOLDER')       OR define('PRINT_AREA_TYPE_FOLDER', 'print_area_type/');
defined('FONT_FOLDER')                  OR define('FONT_FOLDER', 'fonts/');
defined('SHAPE_FOLDER')                 OR define('SHAPE_FOLDER', 'shapes/');
defined('DISTRESS_FOLDER')              OR define('DISTRESS_FOLDER', 'distresses/');
defined('COLOR_FOLDER')                 OR define('COLOR_FOLDER', 'colors/');
defined('BACKGROUNDPATTERN_FOLDER')     OR define('BACKGROUNDPATTERN_FOLDER', 'patterns/');
defined('MASK_FOLDER')                  OR define('MASK_FOLDER', 'masks/');
defined('GRAPHICFONT_FOLDER')           OR define('GRAPHICFONT_FOLDER', 'graphics/');
defined('WORDCLOUDS_FOLDER')            OR define('WORDCLOUDS_FOLDER', 'wordclouds/');
defined('SHOW_EXCEPTION')               OR define('SHOW_EXCEPTION', true);
defined('PAGINATION_MAX_ROW')           OR define('PAGINATION_MAX_ROW', 10);

/**
 * Store's Installation Global Constants
 * CHANGED AT INSTALLATION TIME
 */
defined('STORE_NAME')                   OR define('STORE_NAME', 'Woocommerce');
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
