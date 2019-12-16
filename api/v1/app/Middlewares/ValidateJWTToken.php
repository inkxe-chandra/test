<?php 
/**
 *
 * - While request the api the api must have a Token which will be validated each and every time in this method. 
 * if the token will be validated then the server responses with a valid response or else, an error message will be thrown
 * 
 * __invoke(): The __invoke() method gets called when the object is called as a function. When you declare it, 
 * you say which arguments it should expect
 * 
 * @category   Slim-JWT-Token-Auth
 * @package    Eloquent
 * @author     Original Author <tanmayap@riaxe.com>
 * @author     Another Author <>
 * @copyright  2019-2020 Riaxe Systems
 * @license    http://www.php.net/license/3_0.txt  PHP License 3.0
 * @version    Release: @package_version@1.0
 */
namespace App\Middlewares;

use App\Components\Component as ParentController;
use \Firebase\JWT\JWT;

class ValidateJWTToken extends ParentController {
    /**
     * Info: Get all Categories from the Database
     * @date: 07 Aug 2019
     * @author: tanmayap@riaxe.com 
     * @input: Slim defined request, response and args
     * @return: json response wheather token is validated or not
     */
    public function __invoke($request, $response, $next)
    {
        $doAllowJWT = getAppSettings('do_load_jwt');
        $headerResponse = [];
        $serverStatusCode = OPERATION_OKAY;
        $headers = $this->server_request_headers();
        // Easily turn on/off JWT from config
        if($doAllowJWT === false) {
            return $next($request, $response);
        }
        if(isset($headers['TOKEN']) && $headers['TOKEN'] != '' && $doAllowJWT === true) {
            // Handle JWT Exception with try catch
            try {
                // Get the token value from Bearer string
                $tokenWithBearer = explode(" ", $headers['TOKEN']);
                $token = (isset($tokenWithBearer[1]) && $tokenWithBearer[1] != "") ? $tokenWithBearer[1] : null;
                
                $secret = $this->secret;
                $decoded = (array) JWT::decode($token, $secret, array('HS256'));
                return $next($request, $response);
            } catch (\Exception $e) {
                $jwtResp = [
                    'status' => 0,
                    'message' => 'Sorry, JWT Token does not match. Plese try again later',
                    'exception' => $e->getMessage()
                ];

                $this->logger->addWarning('JWT Error Occured', $jwtResp, ['date' => date('Y-m-d h:i:s')]);
                
                return response($response, ['data' => $jwtResp, 'status' => $serverStatusCode]);
            } 
        } else {
            $jwtResp = [
                'status' => 0,
                'message' => 'Sorry, JWT token not found. Please provide a valid token'
            ];
            return response($response, ['data' => $jwtResp, 'status' => $serverStatusCode]);
        }
    }
    /**
     * Fetch all HTTP request headers
     */
    private function server_request_headers() { 
        $arrayOfHeader = array();
        $rxHttp = '/\AHTTP_/';
        foreach($_SERVER as $key => $server) {
            if( preg_match($rxHttp, $key) ) {
            $arrayOfHeaderKey = preg_replace($rxHttp, '', $key);
            $rxMatches = array();
            $rxMatches = explode('_', $arrayOfHeaderKey);
            if( count($rxMatches) > 0 and strlen($arrayOfHeaderKey) > 2 ) {
                foreach($rxMatches as $akKey => $akVal) $rxMatches[$akKey] = ucfirst($akVal);
                $arrayOfHeaderKey = implode('-', $rxMatches);
            }
            $arrayOfHeader[$arrayOfHeaderKey] = $server;
            }
        }
        return( $arrayOfHeader );
    } 
}
