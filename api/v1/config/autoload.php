<?php

// initialize the Helper methods
$dir = RELATIVE_PATH . 'app/Helpers';
$files = scandir($dir);
foreach($files as $key => $helperFile){
    $path = realpath($dir . DIRECTORY_SEPARATOR . $helperFile);
    if(!is_dir($path)) {
        if (strpos($helperFile, 'helper') !== false) {
            require RELATIVE_PATH . '/app/Helpers/' . $helperFile;
        }
    }
}


/**
 * Registering all other child routes
 */
$modules = require RELATIVE_PATH . '/config/modules.php';
$custom_loader_directory = $container->get('settings')['custom_loader_directory'];
foreach($modules as $module => $status) {
    if(isset($status) && count($status) > 0) {
        if(isset($status) && $status['CORE'] === 1) {
            $routeFilePath = RELATIVE_PATH . 'app/Modules/'. $module . '/index.php';
            require $routeFilePath;
        } else if(isset($status) && $status['CUSTOM'] === 1) {
            $routeFilePath = RELATIVE_PATH . 'app/' . $custom_loader_directory . '/' . $module . '/index.php';
            require $routeFilePath;
        }
    }
}
//echo "I AM HERE"; exit;
//End of registration of routes