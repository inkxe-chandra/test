<?php
/**
 * Autoloading allows us to use PHP classes without the need to require() or include() them 
 * and is considered a hallmark of modern-day programming.
 */
require __DIR__ . '/vendor/autoload.php';


/**
 * Dynamically change Composer file to load Stores according t othe settings
 */
/*
$storeFolder = 'Woocommerce/v3x/';

$getModuleJson = file_get_contents(__DIR__ . '/composer.json');
$modules = json_decode($getModuleJson, true); 
$modules['autoload-dev'] = [
    'psr-4' => [
        'Tests\\' => 'tests/',
        "App\\" => "app/",
        "StoreSpace\\" => "app/Modules/Products/Controllers/Stores/" . $storeFolder
    ]
];
$convertToJson = json_encode($modules, JSON_UNESCAPED_SLASHES);

$file = fopen(__DIR__ . '/composer.json', "w");
fwrite($file, $convertToJson);
fclose($file);
shell_exec('composer dump-autoload');
*/
// End of rewriting Composer Json file


// Instantiate the app
$settings = require __DIR__ . '/config/settings.php';
$app = new \Slim\App($settings);

// Initialize the constant file
require __DIR__ . '/config/constants.php';
// initialize the Helper methods
require __DIR__ . '/app/Helpers/helper.php';
/**
 * Registering all other child routes
 */
$modules = require __DIR__ . '/config/modules.php';

foreach($modules as $module => $status) {
    if(isset($status) && $status === true) {
        $routeFilePath = __DIR__ . '/app/Modules/'.$module.'/index.php';
        if (file_exists($routeFilePath)) {
            // Including the indeex files from the other modules and then injecting the $app object into the each route
            require $routeFilePath;
        }
    }
}
//End of registration of routes

$container = $app->getContainer();
$dbSettings = $container->get('settings')['db'];
$capsule = new Illuminate\Database\Capsule\Manager;
$capsule->addConnection($dbSettings);
$capsule->bootEloquent();
$capsule->setAsGlobal();

// Run app
$app->run();
