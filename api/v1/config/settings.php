<?php
/*
 |--------------------------------------------------------------------------
 | Global Configuration for the Application
 |--------------------------------------------------------------------------
 */
$databaseSettings = require RELATIVE_PATH . 'config/database.php';

return [
    'settings' => [
        'displayErrorDetails' => true, // set to false in production
        'addContentLengthHeader' => false, // Allow the web server to send the content-length header
        'show_exception' => true,
        'db' => $databaseSettings,
        // Renderer settings
        'renderer' => [
            'template_path' => __DIR__ . '/../app/Views/',
        ],
        'pagination' => [
            'per_page' => 40 // Default value for per page item showing
        ],
        // Monolog settings
        'logger' => [
            'name' => 'slim-app',
            'path' => isset($_ENV['docker']) ? 'php://stdout' : __DIR__ . '/../logs/app.log',
            'level' => \Monolog\Logger::DEBUG,
        ],
        'do_load_jwt' => false, // Enable or Disable JWT Authentication
        'custom_loader_directory' => 'Custom',
        
    ],
];
