<?php
//require_once __DIR__ . '/lib.php';
require_once __DIR__ . '/config.php';

class signDoc {
    public $fName;
    public $lName;
    public $reg;
    public $email;
    public $company;
    public $location;
    public $phone;
    public $agree;
    public $client;
    public $id;
    public $signingMethod;

    public $forwardFName;
    public $forwardLName;
    public $forwardEmail;
    public $forwardFName2;
    public $forwardLName2;
    public $forwardEmail2;

    public $fNameError = 'PALUN TÄIDA';
    public $lNameError = 'PALUN TÄIDA';
    public $regError = 'PALUN TÄIDA';
    public $emailError = 'PALUN TÄIDA';
    public $companyError = 'PALUN TÄIDA';
    public $locationError = 'PALUN TÄIDA';
    public $phoneError = 'PALUN TÄIDA';
    public $agreeError = null;
    public $idError = 'PALUN TÄIDA';

    private $error;

    public $zip;
    public $xml;
    public $templateFilename;
    public $inputFilename;
    public $contractNr;
    public $replaceName;

    public $action;
    public $statusResponse;
    public $uploadResponse;
    public $file;
    public $files;
    public $signer;
    public $signers;
    public $signingName;
    public $createResponse;
    public $type;
    public $signerUID;
    public $signerUID2;
    public $signingUrl;
    
    #from conf
    public $apiUrl = 'https://gateway-sandbox.dokobit.com';
    public $accessToken = 'testgw_bcgxvDEpDst0WIqj77qwz8pHYxwyx7pn';
    public $postbackUrl = 'https://epo.ee/proov/postback-handler.php';

    #sendForSigning()
    public $from;
    public $headers;
    public $subject;
    public $message;

    public const REQUEST_GET = false;
    public const REQUEST_POST = true;

    public $response;
    public $result;
    public $path;
    public $requestHeaders;
    public $ch;


    public function printContract() {
    echo '
        <div class="overlay" id="overlay"></div>
        <div class="container">
            
            <div class="info-wrap">
            
                

                <p class="margin-30"><b>SISESTAGE ANDMED:</b></p>

                <div class="info-2">
                    <form method="POST" action="'. $_SERVER["PHP_SELF"]. '" autocomplete="off">

                        <div class="radio-btn">
                            <span>
                                <input type="radio" name="client" id="r1" value="Eraisik"'; if($this->client == 'Eraisik') { echo 'checked';} echo '>
                                <label for="r1">Eraisik</label>
                            </span>
                            <span>
                                <input type="radio" name="client" id="r2" value="Juriidiline"'; if($this->client == 'Juriidiline' || empty($this->client)) {echo 'checked';} echo '>
                                <label for="r2">Juriidline isik</label>
                                </span>
                        </div>

                        <div class="row">
                            <span>Eesnimi</span>
                            <span class="span-end">
                                <span class="span-error" id="1">'. $this->fNameError. '</span>
                                <input class="input" type="text" id="input1" name="fname" placeholder="Eesnimi" data-id="1" value="'. $this->fName. '"';
                                if($this->fNameError == "Palun täitke nime väli.") {
                                    echo ' style="background-color: #ff5f5f;"';
                                } echo '
                                >
                            </span>
                        </div>

                        <div class="row">
                            <span>Perekonnanimi</span>
                            <span class="span-end">
                                <span class="span-error" id="2">'. $this->lNameError. '</span>
                                <input class="input" type="text" id="input2" name="lname" placeholder="Perenimi"  data-id="2" value="'. $this->lName. '"';
                                if($this->lNameError == "Palun täitke nime väli.") {
                                    echo ' style="background-color: #ff5f5f;"';
                                } echo '
                                >
                            </span>
                        </div>

                        <div class="row show">
                            <span>Isikukood</span>
                            <span class="span-end">
                                <span class="span-error" id="9">'. $this->idError. '</span>
                                <input class="input" type="tel" id="input9" name="id" placeholder="Isikukood"  data-id="9" value="'. $this->id. '"';
                                if($this->idError == "Palun sisestage isikukood.") {
                                    echo ' style="background-color: #ff5f5f;"';
                                } echo '
                                >
                            </span>
                        </div>

                        <div class="row hide">
                            <span>Registrikood</span>
                            <span class="span-end">
                                <span class="span-error" id="3">'. $this->regError. '</span>
                                <input class="input" type="tel" id="input3" name="reg" placeholder="Registrikood"  data-id="3" value="'. $this->reg. '"';
                                if($this->regError == "Palun täitke registrikoodi väli.") {
                                    echo ' style="background-color: #ff5f5f;"';
                                } echo '
                                >
                            </span>
                        </div>

                        <div class="row">
                            <span>Meiliaadress</span>
                            <span class="span-end">
                                <span class="span-error" id="4">'. $this->emailError. '</span>
                                <input class="input" type="email" id="input4" name="email" placeholder="E-mail"  data-id="4" value="'. $this->email. '"';
                                if($this->emailError == "Palun täike emaili väli.") {
                                    echo ' style="background-color: #ff5f5f;"';
                                } echo '
                                >
                            </span>
                        </div>

                        <div class="row">
                            <span>Telefoninumber</span>
                            <span class="span-end">
                                <span class="span-error" id="5">'. $this->phoneError. '</span>
                                <input class="input" type="tel" id="input5" name="phone" placeholder="Telefon"  data-id="5" value="'. $this->phone. '"';
                                if($this->phoneError == "Palun täitke telefoninumbri väli.") {
                                    echo ' style="background-color: #ff5f5f;"';
                                } echo '
                                >
                            </span>
                        </div>

                        <div class="row hide">
                            <span>Asukoht</span>
                            <span class="span-end">
                                <span class="span-error" id="6">'. $this->locationError. '</span>
                                <input class="input" type="text" id="input6" name="location" placeholder="Tänav, linn, maakond"  data-id="6" value="'. $this->location. '"';
                                if($this->locationError == "Palun täitke asukoha väli.") {
                                    echo ' style="background-color: #ff5f5f;"';
                                } echo '
                                >
                            </span>
                        </div>

                        <div class="row no-border hide">
                            <span>Firma nimi</span>
                            <span class="span-end">
                                <span class="span-error" id="7">'. $this->companyError. '</span>
                                <input class="input" type="text" id="input7" name="company" placeholder="Firma nimi"  data-id="7" value="'. $this->company. '"';
                                if($this->companyError == "Palun täitke firma nime väli.") {
                                    echo ' style="background-color: #ff5f5f;"';
                                } echo '
                                >
                            </span>
                        </div>
                </div>
            </div>';
    }
    
    public function printContractEnd() {

                    echo '<div class="agreement">
                        <div class="agreement-wrap">
                            <input type="checkbox" id="agree" name="agree" value="Agree">
                            <label for="agree"';
                            if(!empty($this->agreeError)) {
                                    echo ' style="background-color: #ff5f5f;"';
                                } echo '
                                >Olen läbi lugenud ja mõistan lepingu tingimusi.</label>
                            <div class="span-error">'. $this->agreeError. '</div>
                            <div class="button-js" id="button-js">Allkirjasta dokument</div>
                            <div class="button-js hide" id="button-js2">Saada allkirjastamiseks</div>
                        </div>
                    </div>

                    <input type="submit" name="submitInfo" value="Jätkan" id="submit-button" style="display: none;">

                    <div class="modal modal1" id="modal">
                        <p class="close-button" id="close-button">✕</p>
                        <p class="modal-text">Lepingut saab allkirjastada vaid ettevõtte allkirjaõiguslik esindaja.</p>
                        <input type="submit" name="signMyself" value="Jätkan" id="submit-button">
                    </div>

                    <div class="modal modal2" id="modal2">
                        <p class="close-button" id="close-button2">✕</p>
                        <p class="modal-text">Lisa andmed, kellele teavitus saata.</p>
                        <div class="sender-info">
                            <input class="input-modal" type="text" id="input10" name="fname2" placeholder="Eesnimi" value="'. $this->forwardFName. '">
                            <input class="input-modal" type="text" id="input11" name="lname2" placeholder="Perenimi" value="'. $this->forwardLName. '">
                            <input class="input-modal" type="email" id="input12" name="email2" placeholder="Email" value="'. $this->forwardEmail. '">
                        </div>
                        <p class="plus" id="plus">+</p>
                        <div class="extra-info" id="extra" style="display: none;">
                            <input class="input-modal" type="text" id="input13" name="fname3" placeholder="Eesnimi" value="'. $this->forwardFName2. '">
                            <input class="input-modal" type="text" id="input14" name="lname3" placeholder="Perenimi" value="'. $this->forwardLName2. '">
                            <input class="input-modal" type="email" id="input15" name="email3" placeholder="Email" value="'. $this->forwardEmail2. '">
                        </div>
                        <input type="submit" name="sendForSigning" value="Saada" id="submit-button2" disabled>
                    </div>
                </form>
        </div>';
    }

    private function testInput($data) {
        $data = trim($data);
        $data = stripslashes($data);
        $data = htmlspecialchars($data);
	    return $data;
    }

    public function checkInput($data) {
        $this->error = false;
        
        if(isset($data['fname']) && !empty($data['fname'])) {
            $this->fName = $this->testInput($data['fname']);
            $this->fNameError = null;
        } else {
            $this->fNameError = "Palun täitke nime väli.";
            $this->error = true;
        }

        if(isset($data['lname']) && !empty($data['lname'])) {
            $this->lName = $this->testInput($data['lname']);
            $this->lNameError = null;
        } else {
            $this->lNameError = "Palun täitke nime väli.";
            $this->error = true;
        }

        if(isset($data['email']) && !empty($data['email'])) {
            $this->email = $this->testInput($data['email']);
            $this->emailError = null;
        } else {
            $this->emailError = "Palun täike emaili väli.";
            $this->error = true;
        }

        if($data['client'] == 'Juriidiline') {
            $this->client = $data['client'];

            if(isset($data['reg']) && !empty($data['reg'])) {
                $this->reg = $this->testInput($data['reg']);
                $this->regError = null;
            } else {
                $this->regError = "Palun täitke registrikoodi väli.";
                $this->error = true;
            }

            if(isset($data['company']) && !empty($data['company'])) {
                $this->company = $this->testInput($data['company']);
                $this->companyError = null;
            } else {
                $this->companyError = "Palun täitke firma nime väli.";
                $this->error = true;
            }

            if(isset($data['location']) && !empty($data['location'])) {
                $this->location = $this->testInput($data['location']);
                $this->locationError = null;
            } else {
                $this->locationError = "Palun täitke asukoha väli.";
                $this->error = true;
            }
        }

        if($data['client'] == 'Eraisik') {
            $this->client = $data['client'];

            if(isset($data['id']) && !empty($data['id'])) {
                $this->id =  $this->testInput($data['id']);
                $this->idError = null;
            } else {
                $idError = "Palun sisestage isikukood.";
                $this->error = true;
            }
        }

        if(isset($data['phone']) && !empty($data['phone'])) {
            $this->phone = $this->testInput($data['phone']);
            $this->phoneError = null;
        } else {
            $this->phoneError = "Palun täitke telefoninumbri väli.";
            $this->error = true;
        }

        if(isset($data['agree']) && !empty($data['agree'])) {
            $this->agree = null;
        } else {
            $this->agreeError = "Palun märkige väli.";
            $this->error = true;
        }

        if(isset($data['signMyself'])) {
            $this->signingMethod = 0;
        } else {
            $this->signingMethod = 1;

            if(isset($data['fname2']) && !empty($data['fname2'])) {
                $this->forwardFName = $data['fname2'];
            }
            if(isset($data['lname2']) && !empty($data['lname2'])) {
                $this->forwardLName = $data['lname2'];
            }
            if(isset($data['email2']) && !empty($data['email2'])) {
                $this->forwardEmail = $data['email2'];
            }
            if(isset($data['fname3']) && !empty($data['fname3'])) {
                $this->forwardFName2 = $data['fname3'];
            }
            if(isset($data['lname3']) && !empty($data['lname3'])) {
                $this->forwardLName2 = $data['lname3'];
            }
            if(isset($data['email3']) && !empty($data['email3'])) {
                $this->forwardEmail2 = $data['email3'];
            }
        }   

        if($this->error) {
            return false;
        } else {
            return true;
        }
    }

    public function createDocument() {

        $this->zip = new ZipArchive();

        $this->replaceName = $this->fName. ' '. $this->lName;

        if($this->client == "Juriidiline") {
            $this->templateFilename = 'Teenuse_leping_nr_.docx';
            $this->inputFilename = 'testingsamplecopy.docx';
        } else {
            $this->templateFilename = 'Teenuse_leping_nr_eraisik.docx';
            $this->inputFilename = 'testingsamplecopy2.docx';
        }

        if(!copy($this->templateFilename, $this->inputFilename)) {
            die();
        }
        if ($this->zip->open($this->inputFilename, ZipArchive::CREATE)!==TRUE) {
            die;
        }

        $this->xml = $this->zip->getFromName('word/document.xml');

        if($this->client == "Juriidiline") {
            $this->contractNr = date("ymd"). $this->reg;
            $this->xml = str_replace("(FIRMA)",$this->company ,$this->xml);
            $this->xml = str_replace("(REG)",$this->reg ,$this->xml); 
            $this->xml = str_replace("(ASUKOHT)",$this->location ,$this->xml);
        } else {
            $this->contractNr = date("ymd"). $this->id;
            $this->xml = str_replace("(ID)", $this->id ,$this->xml);
        }

        $this->xml = str_replace("(NIMI)",$this->replaceName ,$this->xml);
        $this->xml = str_replace("(EMAIL)",$this->email ,$this->xml);
        $this->xml = str_replace("(TELF)",$this->phone ,$this->xml);
        $this->xml = str_replace("(LEPINGUNR)",$this->contractNr ,$this->xml);
        $this->xml = str_replace("(PAEVAD)",$this->days ,$this->xml);

        $this->zip->addFromString('word/document.xml', $this->xml);

        $this->zip->close();

        return true;
    }

    public function createSigning() {

        $this->file['name'] = 'Teenuse_leping_nr_'. $this->contractNr. '.docx'; 

        if($this->client == 'Juriidiline') {
            $this->file['url'] = 'http://epo.ee/proov/testingsamplecopy.docx';
            $this->file['digest'] = hash_file('sha256', 'testingsamplecopy.docx');
        } else if($this->client == 'Eraisik') {
            $this->file['url'] = 'http://epo.ee/proov/testingsamplecopy2.docx';
            $this->file['digest'] = hash_file('sha256', 'testingsamplecopy2.docx');
        }

        /**
         * Upload file
         */
        $this->action = 'file/upload';
        $this->uploadResponse = $this->request($this->getApiUrlByAction($this->action), [
            'file' => $this->file
        ], REQUEST_POST);

        if ($this->uploadResponse['status'] != 'ok') {
            echo "File could not be uploaded.
        Please ensure that file URL is accessible from the internet." . PHP_EOL;
            exit;
        }

        /**
         * Check file status
         */
        $this->action = 'file/upload/status/' . $this->uploadResponse['token'];
        $this->statusResponse = '';
        while ($this->statusResponse === '' || $this->statusResponse['status'] == 'pending') {
            $this->statusResponse = $this->request($this->getApiUrlByAction($this->action), [
                'token' => $this->uploadResponse['token']
            ], REQUEST_GET);
            sleep(2);
        }

        if (empty($this->statusResponse) || $this->statusResponse['status'] != 'uploaded') {
            echo "Gateway API could not download the file.
        Please ensure that file URL is accessible from the internet." 
                . PHP_EOL;
            exit;
        }

        /**
         * Success. Signing can be created using file token.
         */
        if ($this->statusResponse['status'] == 'uploaded') {

            $this->signers = [];
            $this->files = [];
            $this->file = [];
            /**
             * File token provided by file upload response.
             */

            $this->file['token'] = $this->uploadResponse['token'];
            array_push($this->files, $this->file); // For 'pdf' type only one file is supported.

            /**
             * Signed document format. Check documentation for all available options.
             */
            $this->type = 'asice';

            /**
             * Signing name. Will be displayed as the main title.
             */
            $this->signingName = 'Teenuse_leping_nr_'. $this->contractNr;

            if($this->signingMethod == 0) {
                /**
                 * Signer's unique identifier - personal code.
                 */
                $this->signerUID = '51001099999';
                $this->signer['id'] = $this->signerUID;

                /**
                 * Name
                 */
                $this->signer['name'] = $this->fName;

                /**
                 * Surname
                 */
                $this->signer['surname'] = $this->lName;

                /**
                 * Signing purpose. Availabe options listed in documentation.
                 */
                $this->signer['signing_purpose'] = 'signature';

                array_push($this->signers, $this->signer); // Add as many signers as you need.

            } else {

                if(empty($this->forwardFName2) && empty($this->forwardLName2) && empty($this->forwardEmail2)) {

                    $this->signerUID = '51001099999';
                    $this->signer['id'] = $this->signerUID;

                    /**
                     * Name
                     */
                    $this->signer['name'] = $this->forwardFName;

                    /**
                     * Surname
                     */
                    $this->signer['surname'] = $this->forwardLName;

                    /**
                     * Signing purpose. Availabe options listed in documentation.
                     */
                    $this->signer['signing_purpose'] = 'signature';

                    array_push($this->signers, $this->signer); // Add as many signers as you need.

                } else {
                    $this->signerUID = '51001099999';
                    $this->signer['id'] = $this->signerUID;

                    $this->signer2UID = '39303220256';
                    $this->signer2['id'] = $this->signer2UID;
                    /**
                     * Name
                     */
                    $this->signer['name'] = $this->forwardFName;
                    $this->signer2['name'] = $this->forwardFName2;

                    /**
                     * Surname
                     */
                    $this->signer['surname'] = $this->forwardLName;
                    $this->signer2['surname'] = $this->forwardLName2;

                    /**
                     * Signing purpose. Availabe options listed in documentation.
                     */
                    $this->signer['signing_purpose'] = 'signature';

                    array_push($this->signers, $this->signer); // Add as many signers as you need.
                    array_push($this->signers, $this->signer2); // Add as many signers as you need.
                }
            }

            /**
             * Create signing
             */
            $this->action = 'signing/create';
            $this->createResponse = $this->request($this->getApiUrlByAction($this->action), [
                'type' => $this->type,
                'name' => $this->signingName,
                'signers' => $this->signers,
                'files' => $this->files,
                'postback_url' => $this->postbackUrl,
            ], REQUEST_POST);

            if ($this->createResponse['status'] != 'ok') {
                print_r($this->createResponse);
                echo "Signing could not be created." . PHP_EOL;
                exit;
            }  
        }
    }

    public function signMyself() {
        $this->signingUrl = trim(/*$this->apiUrl*/conf::$apiUrl, '/') . "/signing/" . $this->createResponse['token'] . '?access_token=' . $this->createResponse['signers'][$this->signerUID];
        header("Location:".$this->signingUrl);
    }

    public function sendForSigning() {
        $this->from = "info@deskis.ee";
        $this->headers = 'From: ' . $this->from . "\r\n";
        $this->subject = 'Leping';
        $this->message = "Teile on saadetud leping allkirjastamiseks.".  "\r\n". "Saate lepingut allkirjastada alloleva lingi kaudu:". "\r\n";

        if(empty($forwardFName2) && empty($forwardLName2) && empty($forwardEmail2)) {

            $this->signingUrl = trim(/*$this->apiUrl*/conf::$apiUrl, '/') . "/signing/" . $this->createResponse['token'] . '?access_token=' . $this->createResponse['signers'][$this->signerUID];

            $this->message .= $this->signingUrl;

            mail($this->email, $this->subject, $this->message, $this->headers);

            header("Location:http://epo.ee/proov?mailsent");

        } else {
            $this->signingUrl = trim(/*$this->apiUrl*/conf::$apiUrl, '/') . "/signing/" . $this->createResponse['token'] . '?access_token=' . $this->createResponse['signers'][$this->signerUID];
            $this->signingUrl2 = trim(/*$this->apiUrl*/conf::$apiUrl, '/') . "/signing/" . $this->createResponse['token'] . '?access_token=' . $this->createResponse['signers'][$this->signer2UID];
            /*$first = $createResponse['signers'][$signerUID];
            $second = $createResponse['token'];*/
            $this->message2 = $this->message. $this->signingUrl2;
            $this->message .= $this->signingUrl;

            mail($this->email, $subject, $this->message, $this->headers);
            mail($this->email2, $this->subject, $this->message2, $this->headers);
            
            header("Location:http://epo.ee/proov?mailsent");
        }
    }

    public function getApiUrlByAction($action) {
      /////  global $apiUrl, $accessToken;
        
        return trim($this->apiUrl, '/') . '/api/' .  $action . '.json?access_token='.$this->accessToken;
    }


    public function request($requestUrl, $fields = [], $post = REQUEST_POST) {
        
        

        $this->REQUEST_GET = false;
        $this->REQUEST_POST = true;


        
        $this->fields = http_build_query($fields);
        $this->ch = curl_init();
        curl_setopt($this->ch, CURLOPT_URL, $requestUrl);
        curl_setopt($this->ch, CURLOPT_HEADER, false);
        curl_setopt($this->ch, CURLOPT_TIMEOUT, 180);
        curl_setopt($this->ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($this->ch, CURLOPT_SSL_VERIFYPEER, false);
        if ($post) {
            curl_setopt($this->ch, CURLOPT_POST, 1);
            curl_setopt($this->ch, CURLOPT_POSTFIELDS, $this->fields);
            $this->requestHeaders = array(
                'Content-Type: application/x-www-form-urlencoded; ',
                'Content-Length: ' . strlen($this->fields),
            );
            curl_setopt($this->ch, CURLOPT_HTTPHEADER, $this->requestHeaders);
        }
        $this->response = curl_exec($this->ch);
        $this->result = json_decode($this->response, true);
        if ($this->result ===  null) {
            $this->path = __DIR__ . '/error.log';
            var_dump($this->response);
            file_put_contents($this->path, $this->response);
            echo "\nGOT NULL RESULT. Actual response:". $this->path. "\n";
            echo curl_error($this->ch);
        }
        curl_close($this->ch);
        return $this->result;
    }
}