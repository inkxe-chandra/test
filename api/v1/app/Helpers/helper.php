<?php
    /**
     * @author: <tanmayap@riaxe.com>
     * 
     * ---- INDEX ----
     * #. email()
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
    //use StoreSpace\Controllers\StoreProductsController as StoreProduct;
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
        // Parameter should be sent in below format
        $emailFormat = [
            'from' => ['email' => 'tanmayap@riaxe.com', 'name' => 'Tanmaya Riaxe'],
            'recipients' => [
                'to' => ['email' => 'tanmayapatra09@gmail.com', 'name' => 'Tanmaya Personal 1'],
                'reply_to' => ['email' => 'tanmaya4u12@gmail.com', 'name' => 'Tanmaya Personal 2'],
                'cc' => ['email' => 'tanmayasmtpdev@gmail.com', 'name' => 'Tanmaya Personal 3'],
                'bcc' => ['email' => 'satyabratap@riaxe.com', 'name' => 'Satyabrata Riaxe'],
            ],
            'attachments' => [
                '', ''
            ],
            'subject' => 'This is a test mail with a test subject',
            'body' => 'This is a test mail with a test body',
        ];
        
        // Email functionality starts here
        $configs = require RELATIVE_PATH . 'config/email.php';
        $mailResponse = [];
        $mail = new XEMailer\PHPMailer(true);
        try {
            //Server settings
            if(!empty($configs['do_debug']) && $configs['do_debug'] === true)
                $mail->SMTPDebug = XEMailer\SMTP::DEBUG_SERVER;
            $mail->isSMTP();
            $mail->Host       = $configs['host_name'];
            if(!empty($configs['smtp_auth']) && $configs['smtp_auth'] === true)
                $mail->SMTPAuth   = true;
            $mail->Username   = $configs['username'];
            $mail->Password   = $configs['password'];
            $mail->SMTPSecure = XEMailer\PHPMailer::ENCRYPTION_STARTTLS;
            $mail->Port       = $configs['port'];
        
            // From Email settings
            if(!empty($params['from']) && count($params['from']) > 0) {
                $mail->setFrom($params['from']['email'], $params['from']['name']);
            }
            
            // Recipients Setup
            if(!empty($params['recipients']) && count($params['recipients']) > 0) {
                if(!empty($params['recipients']['to']['email']))
                    $mail->addAddress($params['recipients']['to']['email'], $params['recipients']['to']['name']);     // Add a recipient

                if(!empty($params['recipients']['reply_to']['email']))
                    $mail->addReplyTo($params['recipients']['reply_to']['email'], $params['recipients']['reply_to']['name']);     // Add a recipient
                
                if(!empty($params['recipients']['cc']['email']))
                    $mail->addCC($params['recipients']['cc']['email'], $params['recipients']['cc']['name']);     // Add a recipient

                if(!empty($params['recipients']['bcc']['email']))
                    $mail->addBCC($params['recipients']['bcc']['email'], $params['recipients']['bcc']['name']);     // Add a recipient
            }
            
            // Attachments linking
            if(!empty($params['attachments']) && count($params['attachments']) > 0) {
                foreach ($params['attachments'] as $attachment) {
                    if(!empty($attachment))
                        $mail->addAttachment($attachment);
                }
            }
        
            // Content
            $mail->isHTML(true);// Set email format to HTML
            if(!empty($params['subject']) && $params['subject'] != "")
                $mail->Subject = $params['subject'];
            if(!empty($params['body']) && $params['body'] != "")
                $mail->Body    = $params['body'];
        
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

    function showException() {
        $setting = include RELATIVE_PATH . 'config/settings.php';
        return $setting['settings']['show_exception'];
    }

    function json_clean_decode($json, $assoc = false, $depth = 512, $options = 0) {
        // search and remove comments like /* */ and //
        $json = preg_replace("#(/\*([^*]|[\r\n]|(\*+([^*/]|[\r\n])))*\*+/)|([\s\t]//.*)|(^//.*)#", '', $json);
       
        if(version_compare(phpversion(), '5.4.0', '>=')) {
            $json = json_decode($json, $assoc, $depth, $options);
        }
        elseif(version_compare(phpversion(), '5.3.0', '>=')) {
            $json = json_decode($json, $assoc, $depth);
        }
        else {
            $json = json_decode($json, $assoc);
        }
    
        return $json;
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
        $conditions = [];
        $getStoreId = getDefaultStoreId();
        if(!empty($getStoreId) && $getStoreId > 0) {
            $conditions['store_id'] = $getStoreId;
        } else {
            $conditions = [];
        }
        /*$conditions = [];
        // option 1
        $getStoreId = $request->getQueryParam('store');
        // option 2
        $postStoreId = !empty($request->getParsedBody()['store_id']) ? $request->getParsedBody()['store_id'] : null;
        // option 3
        $initStoreProduct = new StoreProduct();
        $putStoreId = !empty($initStoreProduct->parsePut()['store_id']) ? $initStoreProduct->parsePut()['store_id'] : null;
        if(!empty($getStoreId) && $getStoreId > 0) {
            $conditions['store_id'] = $getStoreId;
        } else if(!empty($postStoreId) && $postStoreId > 0) {
            $conditions['store_id'] = $postStoreId;
        } else if(!empty($putStoreId) && $putStoreId > 0) {
            $conditions['store_id'] = $putStoreId;
        } else {
            $getStoreId = getDefaultStoreId();
            if(!empty($getStoreId) && $getStoreId > 0) {
                $conditions['store_id'] = $getStoreId;
            } else {
                $conditions = [];
            }
        }*/
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
        $currencies = require RELATIVE_PATH . '/currencies.php';
        debug($currencies[$isoCurrencyCode]);
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
                'clone' => "Record was cloned successfully",
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
        $deleteCount = 0;
        if(isset($tableName) && $tableName != "" && isset($fileColumn) && $fileColumn != "") {
            $getSelectedRecord = DB::table($tableName);
            if(isset($condition) && count($condition) > 0) {
                $getSelectedRecord->where($condition);
            }
            $getFileData = $getSelectedRecord->select($fileColumn)->get();
            if($getSelectedRecord->select($fileColumn)->count() > 0) {
                $getAllFileName = $getSelectedRecord->select($fileColumn)->get();
                
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
        }
        return $deleteCount > 1 ? true : false;
    }

    /**
     * Convert the stdClass() object Array to Normal Associative array
     * @author: tanmayap@riaxe.com
     * @date: 13 aug 2019 
     * @input: objectified Array
     * @return: associative array
     */
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

    /**
     * Get random numbers based on timestamp
     * @author: tanmayap@riaxe.com
     * @date: 13 aug 2019 
     * @input: Table Name, File Column Name, Where Condition, Folder Name from where file will be deleted
     * @return: boolean
     */
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
    /**
     * Generate more strong random string which can be used for token purposes
     * @author: tanmayap@riaxe.com
     * @date: 13 aug 2019 
     * @input: Table Name, File Column Name, Where Condition, Folder Name from where file will be deleted
     * @return: boolean
     */
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
