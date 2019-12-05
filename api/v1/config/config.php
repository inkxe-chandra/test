<?php 

require __DIR__ . '/constants.php';

// Autoload Composer
$vendor = require RELATIVE_PATH . '/vendor/autoload.php';

// Instantiate the app
$settings = require RELATIVE_PATH . '/config/settings.php';
$app = new \Slim\App($settings);
$container = $app->getContainer();

// Autoload components of applciation
require RELATIVE_PATH . '/config/autoload.php';


// Application blocks if the server has PHP version lower than 7.1
if (!version_compare(PHP_VERSION, '5.6', '>=')) {
    header('HTTP/1.1 503 Service Unavailable.', TRUE, 503);
    echo 'Warning: Application requires PHP version greater than 7.0. PHP version 7.2.x will be suits best';
    exit(1); // EXIT_ERROR
}

// Set environment type
define('ENVIRONMENT', XE_ENV ? XE_ENV : 'production');

// Set default timezone
// ini_set('date.timezone', 'Asia/Kolkata');

/*
*---------------------------------------------------------------
* ERROR REPORTING
*---------------------------------------------------------------
*
* Different environments will require different levels of error reporting.
* By default development will show errors but testing and live will hide them.
*/
switch (ENVIRONMENT)
{
    case 'development':
        error_reporting(-1);
        ini_set('display_errors', 1);
    break;

    case 'testing':
    case 'production':
        // Surpress all error and warnings
        ini_set('display_errors', 0);
        error_reporting(E_ALL & ~E_NOTICE & ~E_DEPRECATED & ~E_STRICT & ~E_USER_NOTICE & ~E_USER_DEPRECATED);
    break;

    default:
        header('HTTP/1.1 503 Service Unavailable.', TRUE, 503);
        echo 'The application environment is not set correctly.';
        exit(1); // EXIT_ERROR
}

// Configure Eloquent Capsule and run the applciation
$dbSettings = $container->get('settings')['db'];
$capsule = new Illuminate\Database\Capsule\Manager;
$capsule->addConnection($dbSettings);
$capsule->bootEloquent();
$capsule->setAsGlobal();