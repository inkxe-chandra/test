<?php 
/**
 *
 * - This is a common Component which will be used accross all Module-Controllers
 * 
 * - Use of abstract classes are that, all base classes implementing this class should give 
 *   implementation of abstract methods declared in parent class
 * 
 * - The main purpose of this abstarct class is to initialize the ContainerInterface across all other classes
 * 
 * @category   Slim-Component
 * @package    Eloquent
 * @author     Original Author <tanmayap@riaxe.com>
 * @author     Another Author <>
 * @copyright  2019-2020 Riaxe Systems
 * @license    http://www.php.net/license/3_0.txt  PHP License 3.0
 * @version    Release: @package_version@1.0
 */

namespace App\Components;

use Interop\Container\ContainerInterface;
use App\Modules\Cliparts\Models\ClipartTag as Tag;
use App\Modules\Cliparts\Models\ClipartTagRelation;
use Illuminate\Database\Capsule\Manager as DB;
use App\Modules\Cliparts\Models\Clipart;
use Intervention\Image\ImageManagerStatic as ImageManager;

abstract class Component {

    protected $c;
    protected $key;
    /**
     * the object of ContainerInterface is created and set the object to a variable &c and distributes all over the classes
     * @input: ContainerInterface's object
     * 
     * Monolog: We use a plugin Monolog for logging all the logs. So here Monolog is instantiated and 
     * all the configurations are set inside the constructer
     */
    public function __construct(ContainerInterface $c) {
        $this->c = $c;
        // Set a secure hash salt key for Encryption methods
        $this->secret = "SgUkXp2s5v8y/B?E(H+MbQeThWmYq3t6w9z^C&F)J@NcRfUjXn2r4u7x!A%D*G-K";

        // Set up Logger to use in Controller
        $logger = new \Monolog\Logger('inkxe_logger');
        $fileHandler = new \Monolog\Handler\StreamHandler(APP_BASE_PATH . 'logs/app.log');
        $logger->pushHandler($fileHandler);
        $this->logger = $logger;

        $this->datetime = \Carbon\Carbon::now()->toDateTimeString();
    }

    public function test()
    {
        return "TEST OKAY";
    }
    
    /**
     * As with predefirened PUT parser we were unable to get data and files in form data. 
     * So this custom Parser is used for adding a intermediate Parser so that we can get the form data
     * @author: tanmayap@riaxe.com
     * @date: 17 sept 2019 
     * @input: None
     * @return: The total data that was fetched
     */
    public function parsePut() {
        /* PUT data comes in on the stdin stream */
        $putdata = fopen("php://input", "r");
        /* Open a file for writing */
        // $fp = fopen("myputfile.ext", "w");
        $raw_data = '';
        /* Read the data 1 KB at a time
           and write to the file */
        while ($chunk = fread($putdata, 1024))
            $raw_data .= $chunk;
        /* Close the streams */
        fclose($putdata);
        // Fetch content and determine boundary
        $boundary = substr($raw_data, 0, strpos($raw_data, "\r\n"));
        if(empty($boundary)){
            parse_str($raw_data,$data);
            return $data;
        }
        // Fetch each part
        $parts = array_slice(explode($boundary, $raw_data), 1);
        $data = array();
        foreach ($parts as $part) {
            // If this is the last part, break
            if ($part == "--\r\n") break;
            // Separate content from headers
            $part = ltrim($part, "\r\n");
            list($raw_headers, $body) = explode("\r\n\r\n", $part, 2);
            // Parse the headers list
            $raw_headers = explode("\r\n", $raw_headers);
            $headers = array();
            foreach ($raw_headers as $header) {
                list($name, $value) = explode(':', $header);
                $headers[strtolower($name)] = ltrim($value, ' ');
            }
            // Parse the Content-Disposition to get the field name, etc.
            if (isset($headers['content-disposition'])) {
                $filename = null;
                $tmp_name = null;
                preg_match(
                    '/^(.+); *name="([^"]+)"(; *filename="([^"]+)")?/',
                    $headers['content-disposition'],
                    $matches
                );
                list(, $type, $name) = $matches;
                //Parse File
                if( isset($matches[4]) )
                {
                    //if labeled the same as previous, skip
                    if( isset( $_FILES[ $matches[ 2 ] ] ) )
                    {
                        continue;
                    }
                    //get filename
                    $filename = $matches[4];
                    //get tmp name
                    $filename_parts = pathinfo( $filename );
                    $tmp_name = tempnam( ini_get('upload_tmp_dir'), $filename_parts['filename']);
                    //populate $_FILES with information, size may be off in multibyte situation
                    $_FILES[ $matches[ 2 ] ] = array(
                        'error'=>0,
                        'name'=>$filename,
                        'tmp_name'=>$tmp_name,
                        'size'=>strlen( $body ),
                        'type'=>$value
                    );
                    //place in temporary directory
                    file_put_contents($tmp_name, $body);
                }
                //Parse Field
                else
                {
                    $data[$name] = substr($body, 0, strlen($body) - 2);
                }
            }
        }
        return  $data;
    }

    /**
     * - Carbon: The Carbon class is inherited from the PHP DateTime class.
     * - Carbon is used by Eloquent exclusively
     * 
     * - For Date and time operations, we use Carbon and this method uses Carbon to make all such operations
     * Add, Subtract, get Current, yesterday, tomorrow etc using Carbon
     * @author: tanmayap@riaxe.com
     * @date: 13 aug 2019 
     * @input: option, conditions[array|optional], format[string|optional]
     */
    public function dateTimeOperations($option = 'current', $condition = [], $format = 'string') {
        $dateReturn = '';
        switch ($option) {
            case 'today':
                $dateReturn = \Carbon\Carbon::now();
                break;
            case 'tomorrow':
                $dateReturn = \Carbon\Carbon::tomorrow();
                break;
            case 'add':
                $dt = \Carbon\Carbon::now();
                $dateReturn = $dt->addDays($condition['days']);
                break;
            case 'sub':
                $dt = \Carbon\Carbon::now();
                $dateReturn = $dt->subDays($condition['days']);
                break;
            default:
                //
                break;
        }
        if ($format == 'string') {
            return $dateReturn->toDateTimeString();
        } else if($format == 'timestamp') {
            return $dateReturn->timestamp;
        }
    }

    /**
     * Get Auto Increment Id number of a Table, Which is used for renaming images
     * @author: tanmayap@riaxe.com
     * @date: 03 sept 2019 
     * @input: table_name
     * @return: auto_increment_id
     */
    public function getTableNextId($table) {
        if (isset($table) && $table != "") {
            $statement = DB::select("SHOW TABLE STATUS LIKE '" . $table . "'");
            $nextId = $statement[0]->Auto_increment;
            if (isset($nextId) && $nextId != "" && $nextId > 0) {
                return $nextId;
            }
        }
    }

    /**
     * Save Tags and Clipart-Tag Relations
     * Here the Common Controller is used to process this common logic
     * @author: tanmayap@riaxe.com
     * @date: 13 aug 2019 
     * @input: cliart_id, tags(in comma separated)
     * @return: boolean
     */
    public function saveClipartTags($clipartId, $multipletags) {
         // Save Clipart and tags relation
         if(isset($multipletags) && $multipletags != "") {
            $tags = $multipletags;
            $updatedTagIds = [];
            $tagsStringToArray = explode(',', $tags);
            foreach ($tagsStringToArray as $key => $tag) {
                // Save each individual Tag to table
                if(Tag::where(['name' => trim($tag)])->count() == 0) {
                    $saveTag = new Tag(['name' => trim($tag)]);
                    $saveTag->save();
                    $tagLastInsertId = $saveTag->xe_id;
                } else {
                    $getTagDetails = Tag::where(['name' => trim($tag)])->select('xe_id')->first();
                    $tagLastInsertId = $getTagDetails['xe_id'];
                }
                if(isset($tagLastInsertId) && $tagLastInsertId > 0) {
                    $updatedTagIds[] = $tagLastInsertId;
                }
            }

            // Start SYNC Tags into Clipart_Tag Relationship Table
            $findClipart = Clipart::find($clipartId);
            if($findClipart->tags()->sync($updatedTagIds)) {
                return true;
            } else {
                return false;
            }
        } else {
            // If user requests blank/no tags
            $clipartTags = ClipartTagRelation::where('clipart_id', $clipartId);
            if($clipartTags->delete()) {
                return true;
            } else {
                return false;
            }
        }
    }
    /**
     * Save Categories/Sub-categories and Clipart-Category Relations
     * Here the Common Controller is used to process this common logic
     * @author: tanmayap@riaxe.com
     * @date: 17 sept 2019 
     * @input: clipart_id, tags(in comma separated)
     * @return: boolean
     */
    public function saveClipartCategories($clipartId, $categoryIds) {
        $getAllCategoryArr = json_decode($categoryIds);
        // SYNC Categories to the Clipart_Category Relationship Table
        $findClipart = Clipart::find($clipartId);
        if($findClipart->categories()->sync($getAllCategoryArr)) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * Save files
     */
    public function saveFile($fileName = "", $file_path)
    {
        if(!empty($fileName)) {
            if(isset($_FILES) && count($_FILES) > 0) {
                $enabledThumbImageFormats = ['jpeg', 'jpg', 'gif'];
                $convertToSize = [100];
                $uploadPath = isset($file_path) ? $file_path : UPLOAD_FOLDER;
                if (!is_dir($uploadPath)) {
                    mkdir($uploadPath, 0777, true);
                } 
                $fileExtension = pathinfo($_FILES[$fileName]['name'], PATHINFO_EXTENSION);
                $random = getRandom();
                $uploadFileName = $random . "." . $fileExtension;
                if (copy($_FILES[$fileName]['tmp_name'], $uploadPath . $uploadFileName) === true) {
                    // Image Uploaded. Write any operations if required --
                    if(isset($fileExtension) && in_array($fileExtension, $enabledThumbImageFormats)) {
                        $fileToProcess = $uploadPath . $uploadFileName;
                        $img = ImageManager::make($fileToProcess);
                        foreach ($convertToSize as $dimension) {
                            $img->resize($dimension, $dimension);
                            $img->save($uploadPath . 'thumb_' . $random . "." . $fileExtension);
                        }
                    }

                    return $uploadFileName;
                }
            }
        }
    }
}
