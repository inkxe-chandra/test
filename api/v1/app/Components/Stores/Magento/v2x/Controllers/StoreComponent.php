<?php
    /**
     * This is a common store component which will be used across all Module-store-controllers
     */

    namespace ComponentStoreSpace\Controllers;

    use App\Components\Component;

    class StoreComponent extends Component
    {

        /**
         * @info: Soap connection for Magento store API
         * @created: 18 Dec 2019
         * @author: tapasranjanp@riaxe.com
         * @return: Response of store API
         */
        public function apiCall($model, $service, $param)
        {
            if (strpos($_SERVER['DOCUMENT_ROOT'], '/pub') !== false && strpos($_SERVER['DOCUMENT_ROOT'], '/public_html') == false) {
                $root = str_replace('/pub', '', $_SERVER['DOCUMENT_ROOT']);
            } else {
                $root = $_SERVER['DOCUMENT_ROOT'];
            }
            $path = $root . '/';
            require_once $path . 'vendor/zendframework/zend-server/src/Client.php';
            require_once $path . 'vendor/zendframework/zend-soap/src/Client.php';
            require_once $path . 'vendor/zendframework/zend-soap/src/Client/Common.php';

            $url = 'html5designCedapi' . $model . 'V1';
            $wsdlUrl = XEPATH . 'soap?wsdl&services=' . $url;
            $callUrl = $url . ucfirst($service);
            $opts = ['http' => ['header' => "Authorization: Bearer " . ACCESSTOKEN]];

            try {
                $context = stream_context_create($opts);
                $soapClient = new \Zend\Soap\Client($wsdlUrl);
                $soapClient->setSoapVersion(SOAP_1_2);
                $soapClient->setStreamContext($context);

                return $soapResponse = $soapClient->$callUrl($param);
            } catch (Exception $e) {
                echo 'Error1 : ' . $e->getMessage();
            }
        }
    }