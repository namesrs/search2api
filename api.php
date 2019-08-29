<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
ini_set('max_execution_time', 300);
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");
include 'Request.php';
include 'config.php';
include 'vendor/autoload.php';
use \JJG\Request as Request;
use Iodev\Whois\Whois;



function Login($baseurl, $apikey)
{
    global $accesstoken;
    $request = new Request($baseurl . 'authenticate/login/' . $apikey);
    $request->enableSSL();
    $request->connectTimeout = 5;
    $request->timeout        = 10;
    $request->setRequestType('GET');
    $request->execute();
    $response = $request->getResponse();
    if (empty($response)) {
        return false;
    }
    $response = json_decode($response, true);
    if (!isset($response['parameters']['token'])) {
        return false;
    }
    $accesstoken = $response['parameters']['token'];
}




function validatePostData($tldlist, $data)
{
$tldlist = array_flip($tldlist);
    $data        = array_filter($data);
    $requestData = array();
    foreach ($data as $key => $value) {
        if (validateDomain($tldlist, $value)) {
            $requestData['domainname[' . $key . ']'] = $value;
        }
    }
    if (empty($requestData)) {
        return false;
    } else {
        return $requestData;
    }
    
}
function validateDomain($tldlist, $domain)
{
$tld = substr($domain, strpos($domain, ".") + 1);
$string_len = strlen($domain);
$tld_len = strlen(substr($domain, strrpos($domain, '.') + 1));
if($tld_len < 2) {
return false;
}
if ($string_len < 3 OR $string_len > 64) {
return false;
}
if(strpos($domain, '.') === FALSE) {
return false;
}
if(!isset($tldlist[$tld])) {
return false;
}

return true;
}
function bulksearch($data, $baseurl, $accesstoken)
{
    $request = new Request($baseurl . 'domain/searchdomain/' . $accesstoken);
    $request->setRequestType('POST');
    $request->setPostFields($data);
    $request->execute();
    $response = $request->getResponse();
    echo $response;
    exit;
}
function whois($domain)
{
    
    try {
        $response = Whois::create()->lookupDomain($domain);
        echo json_encode($response->getText());
    }
    catch (Exception $e) {
        echo json_encode('An error occured, please report this: ' . $e->getMessage());
    }
    
}






$action = $_REQUEST['action'];
// Get list of TLDs
$tldlist = file('tlds.txt', FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
switch ($action) {
    case "bulksearch":
        
        header("HTTP/1.1 200 OK");
	$requestData = validatePostData($tldlist, $_REQUEST['domainlist']);
	if($requestData) {
	
	Login($baseurl, $apikey);
        bulksearch($requestData, $baseurl, $accesstoken);
	}
	else {
	echo json_encode(array("Error" => "Empty or invalid data was given."));
	}
        break;
    
    case "whois":
        if (validateDomain(array_flip($tldlist), $_REQUEST['domain'])) {
            whois($_REQUEST['domain']);
        }
        break;
    case "config":
        echo json_encode($config);
        break;
    
    
    case "domainlist":
        $data         = array();
        $searchstring = urldecode($_REQUEST['search']);
        $searchstring = preg_split('/ +/', $searchstring);
        foreach ($searchstring as $key => $value) {
            
            if (strpos($value, '.') !== false) {
                array_push($data, $value);
            } else {
                foreach ($tldlist as $tldNumber => $tld) {
                    $domain = $value . '.' . $tld;
                    array_push($data, $domain);
                }
            }
            
        }
        echo json_encode($data);
        break;
    default:
        echo json_encode(array("Error" => "Empty data was given."));
}
