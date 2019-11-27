<?php
/**
 * Author : Tanmaya Patra/India
 * Inkxe-X Microservice Framework
 * @date 01 nov 2019
 * An open source application development framework for PHP
 *
 * This content is released under the MIT License (MIT)
 *
 * Copyright (c) 2014 - 2018, British Columbia Institute of Technology
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 * @package Inkxe-X Microservice Framework
 * @author  Inkxe-X Dev Team
 * @copyright   Copyright (c) 2019 , InkXE Pvt Ltd
 * @license http://opensource.org/licenses/MIT  MIT License
 * @link    https://inkxe.com
 * @version 1.0.0
 */

// Initialize the constant file
require __DIR__ . '/config/constants.php';

// Application blocks if the server has PHP version lower than 7.1
if (!version_compare(PHP_VERSION, '5.6', '>=')) {
    header('HTTP/1.1 503 Service Unavailable.', TRUE, 503);
    echo 'Warning: Application requires PHP version greater than 7.0. PHP version 7.2.x will be suits best';
    exit(1); // EXIT_ERROR
}

// Setup vendor autoload
$loader = require __DIR__ . '/vendor/autoload.php';
$loader->setPsr4("StoreSpace\\", "app/Modules/Stores/" . STORE_NAME . "/" . STORE_VERSION . "/");

// Set environment type
define('ENVIRONMENT', XE_ENV ? XE_ENV : 'production');

// Set default timezone
ini_set('date.timezone', 'America/Denver');

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


// Instantiate the app
$settings = require __DIR__ . '/config/settings.php';
$app = new \Slim\App($settings);
$container = $app->getContainer();

// initialize the Helper methods
require __DIR__ . '/app/Helpers/helper.php';

/**
 * Registering all other child routes
 */
$modules = require __DIR__ . '/config/modules.php';
$custom_loader_directory = $container->get('settings')['custom_loader_directory'];
//debug($modules, true);
foreach($modules as $module => $status) {
    if(isset($status) && count($status) > 0) {
        if(isset($status) && $status['CORE'] === true) {
            $routeFilePath = __DIR__ . '/app/Modules/'.$module.'/index.php';
            require $routeFilePath;
        } else if(isset($status) && $status['CUSTOM'] === true) {
            $routeFilePath = __DIR__ . '/app/' . $custom_loader_directory . '/'.$module.'/index.php';
            require $routeFilePath;
        }
    }
}
//End of registration of routes

// Configure Eloquent Capsule and run the applciation
$dbSettings = $container->get('settings')['db'];
$capsule = new Illuminate\Database\Capsule\Manager;
$capsule->addConnection($dbSettings);
$capsule->bootEloquent();
$capsule->setAsGlobal();

// Run app
$app->run();
