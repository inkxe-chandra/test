<?php
    /**
     * @author: <tanmayap@riaxe.com>
     * 
     * ---- INDEX ----
     * #. storeId()
     * #. getDefaultStoreId()
     * #. getCurrencySymbol() // JPY -> ¥
     * #. get_client_ip()
     * #. message()
     * #. storeSettings()
     * #. deleteOldFile()
     * #. objectToArray()
     * #. timeElapsed()
     * #. trimChar()
     * #. debug()
     * #. dd()
     * #. downloadFile()
     * #. getRandom()
     * #. cryptoNumber()
     * #. getToken()
     */
    
    use Illuminate\Database\Capsule\Manager as DB;
    use StoreSpace\Controllers\StoreProductsController as StoreProduct;
    use Carbon\Carbon as Carbon;
    use PHPMailer\PHPMailer as XEMailer;
    use App\Components\Component;
    /**
     * @info: Get dynamic read/write path for modules
     * @input: read/write, module_name
     * @created: 09 sep 2019
     * @author: tanmayap@riaxe.com
     * @return: valid URL
     */
    function email($params = []) {
        // $component = new Component();
        echo $c->get('settings');
        echo RELATIVE_PATH . 'config/settings.php';

        exit;

        $mailResponse = [];
        $mail = new XEMailer\PHPMailer(true);

        try {
            //Server settings
            //$mail->SMTPDebug = XEMailer\SMTP::DEBUG_SERVER;                      // Enable verbose debug output
            $mail->isSMTP();                                            // Send using SMTP
            $mail->Host       = 'smtp.gmail.com';                    // Set the SMTP server to send through
            $mail->SMTPAuth   = true;                                   // Enable SMTP authentication
            $mail->Username   = 'shradha.riaxe.02@gmail.com';                     // SMTP username
            $mail->Password   = 'riaxe#1234';                               // SMTP password
            $mail->SMTPSecure = XEMailer\PHPMailer::ENCRYPTION_STARTTLS;         // Enable TLS encryption; `PHPMailer::ENCRYPTION_SMTPS` also accepted
            $mail->Port       = 587;                                    // TCP port to connect to
        
            //Recipients
            $mail->setFrom('tanmayapatra09@gmail.com', 'Mailer');
            $mail->addAddress('tanmayap@riaxe.com', 'Joe User');     // Add a recipient
            //$mail->addAddress('ellen@example.com');               // Name is optional
            //$mail->addReplyTo('info@example.com', 'Information');
            //$mail->addCC('cc@example.com');
            //$mail->addBCC('bcc@example.com');
        
            // Attachments
            //$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
            //$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
        
            // Content
            $mail->isHTML(true);                                  // Set email format to HTML
            $mail->Subject = 'Here is the subject';
            $mail->Body    = 'This is the HTML message body <b>in bold!</b>';
            $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';
        
            $mail->send();
            $mailResponse = [
                'status' => 1,
                'message' => 'Email sent successfully'
            ];
        } catch (XEMailer\Exception $e) {
            $mailResponse = [
                'status' => 0,
                'message' => "Message could not be sent. Mailer Error: {$mail->ErrorInfo}"
            ];
        }
        return $mailResponse;
    }

    function appSettings() {

    }
    /**
     * @info: Get dynamic read/write path for modules
     * @input: read/write, module_name
     * @created: 09 sep 2019
     * @author: tanmayap@riaxe.com
     * @return: valid URL
     */
    function path($mode, $module) {
        $moduleFolder = strtoupper($module) . "_FOLDER";
        if($mode === 'abs') { // C:/Xampp/
            return ASSETS_PATH_W . constant($moduleFolder);
        } else if($mode === 'read') {
            return ASSETS_PATH_R . constant($moduleFolder);
        }
    }
    /**
     * @info: Send Json formatted data with Headers and Origins
     * @input: Slim response and array of data and http status
     * @created: 09 sep 2019
     * @author: tanmayap@riaxe.com
     * @return: Slim originated Response
     */
    function response($response, $apiResponse = []) {
        return  $response->withJson($apiResponse['data'])
            ->withHeader("Access-Control-Allow-Origin", "*")
            ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
            ->withStatus($apiResponse['status']);
    }
    /**
     * @info: return a store ID by validationg various scenarios
     * @input: Slim Request param
     * @created: 09 sep 2019
     * @author: tanmayap@riaxe.com
     * @return: Store ID
     */
    function storeId($request) {
        $conditions = ['store_id' => 1];
        // // option 1
        // $getStoreId = $request->getQueryParam('store');
        // // option 2
        // $postStoreId = !empty($request->getParsedBody()['store_id']) ? $request->getParsedBody()['store_id'] : null;
        // // option 3
        // $initStoreProduct = new StoreProduct();
        // $putStoreId = !empty($initStoreProduct->parsePut()['store_id']) ? $initStoreProduct->parsePut()['store_id'] : null;
        // if(!empty($getStoreId) && $getStoreId > 0) {
        //     $conditions['store_id'] = $getStoreId;
        // } else if(!empty($postStoreId) && $postStoreId > 0) {
        //     $conditions['store_id'] = $postStoreId;
        // } else if(!empty($putStoreId) && $putStoreId > 0) {
        //     $conditions['store_id'] = $putStoreId;
        // } else {
        //     $getStoreId = getDefaultStoreId();
        //     if(!empty($getStoreId) && $getStoreId > 0) {
        //         $conditions['store_id'] = $getStoreId;
        //     } else {
        //         $conditions = [];
        //     }
        // }
        return $conditions;
    }
    /**
     * Get default store id from the store setting
     */
    function getDefaultStoreId()
    {
        $getStoreSetting = storeSettings();
        return $getStoreSetting['active_store_id'];
    }

    /**
     * @info: converts ISO format Currency Code to their respective HTML Symbols
     * with the help of a snippet file
     * @input: ISO CURRENCY CODE
     * @created: 09 sep 2019
     * @author: tanmayap@riaxe.com
     * @return: HTML Currency Symbol
     */
    function getCurrencySymbol($isoCurrencyCode) {
        $currencies = require RELATIVE_PATH_CONFIG . '/currencies.php';
        debug($currencies[$isoCurrencyCode]);
    }

    function convertDate($string, $format) {
        $getStoreSetting = storeSettings();
        $defaultDateFormat = $getStoreSetting['date_format'];
        $defaultTimeFormat = $getStoreSetting['time_format'];
        if(empty($format)) {
            $format = $defaultDateFormat;
        }
        $carbon = Carbon::createFromFormat('d/m/Y', $string);

        echo $carbon; exit;
       
    }

    /**
     * @info: This method will give IP of current client system
     * @input: none
     * @created: 09 sep 2019
     * @author: tanmayap@riaxe.com
     * @return: IP address
     */
    if ( ! function_exists('get_client_ip'))
    {
        function get_client_ip() {
            $ipaddress = '';
            if (getenv('HTTP_CLIENT_IP'))
                $ipaddress = getenv('HTTP_CLIENT_IP');
            else if(getenv('HTTP_X_FORWARDED_FOR'))
                $ipaddress = getenv('HTTP_X_FORWARDED_FOR');
            else if(getenv('HTTP_X_FORWARDED'))
                $ipaddress = getenv('HTTP_X_FORWARDED');
            else if(getenv('HTTP_FORWARDED_FOR'))
                $ipaddress = getenv('HTTP_FORWARDED_FOR');
            else if(getenv('HTTP_FORWARDED'))
            $ipaddress = getenv('HTTP_FORWARDED');
            else if(getenv('REMOTE_ADDR'))
                $ipaddress = getenv('REMOTE_ADDR');
            else
                $ipaddress = 'UNKNOWN';
            return $ipaddress;
        }
    }
    /**
     * @info: this method dynamically gives you messages according to work
     * @input: none
     * @created: 09 nov 2019
     * @author: tanmayap@riaxe.com
     * @return: Dynamic Message
     */
    function message($moduleName = null, $type = null) {
        if(isset($moduleName)) {
            $messages = [
                'saved' => "[MODULE] was saved into application",
                'done' => 'The last operation was successfull',
                'updated' => "[MODULE] was updated successfully",
                'deleted' => "[MODULE] was deleted permanently from system",
                'insufficient' => "Insufficient data provided, please provide some valid data",
                'not_found' => "The record(s) you was requested not found, please try again later",
                'exception' => "Sorry! Exception was occured",
                'exist' => "Duplicate record exists. Please delete previous record before inserting new one",
                'error' => "Something went wrong, please try again later"
            ];
            // dynamic set the string according to the provided module name
            $returnMessage = str_replace('[MODULE]', $moduleName, $messages[$type]);
            return $returnMessage;
        }
    }

    /**
     * @info: Get store settings irrespective to the users
     * @input: null
     * @created: 20 nov 2019
     * @author: tanmayap@riaxe.com
     * @return: Settings in array format
     */
    function storeSettings()
    {
        $siteSettings = [];
        $condition = [
            'is_secure' => 0,
            'autoload' => 1
        ];
        $columns = [];
        $settings = DB::table('settings');
        if(isset($condition) && count($condition) > 0) {
            $settings->where($condition);
        }
        if(isset($columns) && count($columns) > 0) {
            $settings->select($columns);
        }
        $settings = $settings->get();
        
        foreach ($settings as $key => $setting) {
            $siteSettings[$setting->setting_key] = $setting->setting_value;
        }
        return $siteSettings;
    }

    /**
     * Delete/Trash old file and thumbs(is exists) of a specific Model from its corsp. Folder
     * @author: tanmayap@riaxe.com
     * @date: 13 aug 2019 
     * @input: Table Name, File Column Name, Where Condition, Folder Name from where file will be deleted
     * @return: boolean
     */
    function deleteOldFile($tableName, $fileColumn, $condition, $folder) {
        
        if(isset($tableName) && $tableName != "" && isset($fileColumn) && $fileColumn != "") {
            $getSelectedRecord = DB::table($tableName);
            if(isset($condition) && count($condition) > 0) {
                $getSelectedRecord->where($condition);
            }
            $getFileData = $getSelectedRecord->select($fileColumn)->get();
            if($getSelectedRecord->select($fileColumn)->count() > 0) {
                $getAllFileName = $getSelectedRecord->select($fileColumn)->get();
                $deleteCount = 0;
                foreach ($getAllFileName as $key => $getFile) {
                    if(isset($getFile->file_name) && $getFile->file_name != "") {
                        $rawFileLocation = $folder . $getFile->file_name;
                        $rawThumbFileLocation = $folder . 'thumb_' . $getFile->file_name;

                        if (file_exists($rawFileLocation)) {
                            chmod($rawFileLocation, 0755);
                            // For Linux System Below code will change the permission of the file
                            shell_exec('chmod -R 777 ' . $rawFileLocation);
                            $deleteCount++;
                            if(unlink($rawFileLocation)) {
                                unlink($rawThumbFileLocation);
                            }
                        } 
                    }
                }
            }
            
            // exit;

            // $rawFileLocation = $folder . $getFileData->{$fileColumn};
            // $rawThumbFileLocation = $folder . 'thumb_' . $getFileData->{$fileColumn};
            // if (file_exists($rawFileLocation)) {
            //     chmod($rawFileLocation, 0755);
            //     // For Linux System Below code will change the permission of the file
            //     shell_exec('chmod -R 777 ' . $rawFileLocation);
            //     if(unlink($rawFileLocation)) {
            //         unlink($rawThumbFileLocation);
            //         return true;
            //     } else {
            //         return false;
            //     }
            // } 
        }
        return $deleteCount > 1 ? true : false;
    }

    function objectToArray($d) {
        if (is_object($d)) {
            // Gets the properties of the given object
            // with get_object_vars function
            $d = get_object_vars($d);
        }
		
        if (is_array($d)) {
            /*
            * Return array converted to object
            * Using __FUNCTION__ (Magic constant)
            * for recursive call
            */
            return array_map(__FUNCTION__, $d);
        }
        else {
            // Return array
            return $d;
        }
    }

    /**
     * @info: It will convert a long text into a short text with a elipse dots
     * @input: long string
     * @created: 09 sep 2019
     * @modified: 
     * @author: tanmayap@riaxe.com
     * @return: a short format of string with elipse dots
     */
    function timeElapsed($datetime, $full = false) {
        $now = new DateTime;
        $ago = new DateTime($datetime);
        $diff = $now->diff($ago);

        $diff->w = floor($diff->d / 7);
        $diff->d -= $diff->w * 7;

        $string = array(
            'y' => 'year',
            'm' => 'month',
            'w' => 'week',
            'd' => 'day',
            'h' => 'hour',
            'i' => 'minute',
            's' => 'second',
        );
        foreach ($string as $k => &$v) {
            if ($diff->$k) {
                $v = $diff->$k . ' ' . $v . ($diff->$k > 1 ? 's' : '');
            } else {
                unset($string[$k]);
            }
        }

        if (!$full) $string = array_slice($string, 0, 1);
        return $string ? implode(', ', $string) . ' ago' : 'just now';
    }
    /**
     * @info: It will convert a long text into a short text with a elipse dots
     * @input: long string
     * @created: 09 sep 2019
     * @modified: 
     * @author: tanmayap@riaxe.com
     * @return: a short format of string with elipse dots
     */
    function trimChar( $text, $length = 340 ) {
        $length = (int) $length;
        $text = trim( strip_tags( $text ) );

        if ( strlen( $text ) > $length ) {
            $text = substr( $text, 0, $length + 1 );
            $words = preg_split( "/[\s]|&nbsp;/", $text, -1, PREG_SPLIT_NO_EMPTY );
            preg_match( "/[\s]|&nbsp;/", $text, $lastchar, 0, $length );
            if ( empty( $lastchar ) )
                array_pop( $words );

            $text = implode( ' ', $words ); 
        }

        return $text. "...";
    }

    /**
     * @info: Sometimes while printing an array we need to write print_r and pre tags to display it in a 
     * readable format. So by using this method, this method will help you to print the array in a better readable format
     * @input: Array()
     * @created: 09 sep 2019
     * @modified: 
     * @author: tanmayap@riaxe.com
     * @return: a readable array 
     */
    function debug($array, $abort = false)
    {
        echo '<pre>';
        print_r($array);
        echo '</pre>';
        if($abort === true){
            exit(0);
        }
    }
    /**
     * @info: Sometimes to display an array we need to use toArray() additionaly like Laravel used.
     * So to display these array those use toArray() additionally, dd() is used for this purpose
     */
    if ( ! function_exists('dd'))
    {
        function dd($array, $abort = false) {
            echo '<pre>';
            print_r($array->toArray());
            echo '</pre>';
            if($abort === true){
                exit(0);
            }
        }
    }

    /**
    * Function : Download a remote file at a given URL and save it to a local folder.
    * @input:
    * $url - URL of the remote file
    * $toDir - Directory where the remote file has to be saved once downloaded.
    * $withName - The name of file to be saved as.
    * @output: 
    * true - if success
    * false - if failed
    * 
    * Note : This function does not work in the Codelet due to network restrictions
    * but does work when executed from command line or from within a webserver.
    */
    function downloadFile($url, $toDir, $withName) {
        // open file in rb mode
        if ($fp_remote = fopen($url, 'rb')) {
            // local filename
            $local_file = $toDir ."/" . $withName;
            // read buffer, open in wb mode for writing
            if ($fp_local = fopen($local_file, 'wb')) {
                // read the file, buffer size 8k
                while ($buffer = fread($fp_remote, 8192)) {
                    // write buffer in  local file
                    fwrite($fp_local, $buffer);
                }
                // close local
                fclose($fp_local);
            }
            else
            {
                // could not open the local URL
                fclose($fp_remote);
                return false;    
            }
            // close remote
            fclose($fp_remote);
            return true;
        }
        else
        {
            // could not open the remote URL
            return false;
        }
    } // end 

    function getRandom()
    {
        $randomNumber = date('Ymdhis').rand(99,9999);
        return $randomNumber;
    }
    /**
     * @info: This method will generate a Strong Random String
     * readable format. So by using this method, this method will help you to print the array in a better readable format
     * @input: Array()
     * @created: 09 sep 2019
     * @modified: 
     * @author: tanmayap@riaxe.com
     * @return: a readable array 
     */
    function cryptoNumber($min, $max)
    {
        $range = $max - $min;
        if ($range < 1) return $min; // not so random...
        $log = ceil(log($range, 2));
        $bytes = (int) ($log / 8) + 1; // length in bytes
        $bits = (int) $log + 1; // length in bits
        $filter = (int) (1 << $bits) - 1; // set all lower bits to 1
        do {
            $rnd = hexdec(bin2hex(openssl_random_pseudo_bytes($bytes)));
            $rnd = $rnd & $filter; // discard irrelevant bits
        } while ($rnd > $range);
        return $min + $rnd;
    }

    function getToken($length)
    {
        $token = "";
        $codeAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        $codeAlphabet.= "abcdefghijklmnopqrstuvwxyz";
        $codeAlphabet.= "0123456789";
        $max = strlen($codeAlphabet); // edited

        for ($i=0; $i < $length; $i++) {
            $token .= $codeAlphabet[cryptoNumber(0, $max-1)];
        }

        return $token;
    }