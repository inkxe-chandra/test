<?php
/*
 |--------------------------------------------------------------------------
 | Global Configuration for the Application
 |--------------------------------------------------------------------------
 */
return [
    'settings' => [
        'displayErrorDetails' => true, // set to false in production
        'addContentLengthHeader' => false, // Allow the web server to send the content-length header
        'db' => [
            'driver'    => 'mysql',
            'host'      => 'localhost',
            'database'  => 'fonts',
            'username'  => 'root',
            'password'  => '',
            'charset'   => 'utf8',
            'collation' => 'utf8_unicode_ci',
            'prefix'    => '',
        ],
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
        'do_load_jwt' => false,
        'custom_loader_directory' => 'Custom'
    ],
];
