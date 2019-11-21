<?php
    use Illuminate\Database\Capsule\Manager as DB;

    /**
     * - This is a helper file where all static methods are written and which can be called from anywhere
     *   without instantiating any object. 
     * - To call these methjods just call the methods directly with parameters if required
     * @category   Helper
     * @package    Helper
     * @author     Original Author <tanmayap@riaxe.com>
     * @author     Another Author <>
     * @copyright  2019-2020 Riaxe Systems
     * @license    http://www.php.net/license/3_0.txt  PHP License 3.0
     * @version    Release: @package_version@1.0
     */
    
    /**
     * @info: This method will give IP of current client system
     * @input: none
     * @created: 09 sep 2019
     * @modified: 
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

    function message($moduleName = null, $type = null) {
        if(isset($moduleName)) {
            switch ($type) {
                // Success Messages
                case 'saved':
                    return $moduleName . " was saved into application";
                    break;

                case 'updated':
                    return $moduleName . " was updated successfully";
                    break;

                case 'deleted':
                    return $moduleName . " was deleted permanently from system";
                    break;
                    
                // Errors and Warnings
                case 'insufficient':
                    return "Insufficient data provided, please provide some valid data";
                    break;

                case 'not_found':
                    return "The record(s) you was requested not found, please try again later";
                    break;

                case 'exception':
                    return "Sorry! Exception was occured";
                    break;

                case 'exist':
                    return "Duplicate record exists. Please delete previous record before inserting new one";
                    break;
                
                case 'error':
                    return "Something went wrong, please try again later";
                    break;

                default:
                    return "Operation was success";
                    break;
            }
        }
    }

    /**
     * Permanently delete a image from the directory
     */
    function trashImage($imageUrl = null) {
        if(isset($imageUrl) && $imageUrl != "") {
            if (file_exists($imageUrl)) {
                chmod($imageUrl, 0755);
                // For Linux System Below code will change the permission of the file
                shell_exec('chmod -R 777 ' . $imageUrl);
                unlink($imageUrl);
            }
        }
    }
    
    function storeSettins()
    {
        $condition = [];
        $columns = [];
        $settings = DB::table('settings')->where($condition)->select($columns)->first();
        
    }

    /**
     * Delete/Trash old file of a specific Model from its corsp. Folder
     * @author: tanmayap@riaxe.com
     * @date: 13 aug 2019 
     * @input: Table Name, File Column Name, Where Condition, Folder Name from where file will be deleted
     * @return: boolean
     */
    function deleteOldFile($tableName, $fileColumn, $condition, $folder) {
        
        if(isset($tableName) && $tableName != "" && isset($fileColumn) && $fileColumn != "") {
            $getFileData = DB::table($tableName)->where($condition)->select($fileColumn)->first();
            $rawFileLocation = $folder . $getFileData->{$fileColumn};
            if (file_exists($rawFileLocation)) {
                chmod($rawFileLocation, 0755);
                // For Linux System Below code will change the permission of the file
                shell_exec('chmod -R 777 ' . $rawFileLocation);
                if(unlink($rawFileLocation)) {
                    return true;
                } else {
                    return false;
                }
            } 
        }
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
    function dd($array, $abort = false)
    {
        echo '<pre>';
        print_r($array->toArray());
        echo '</pre>';
        if($abort === true){
            exit(0);
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