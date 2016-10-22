<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Validator;

use App\Http\Requests;
use App\Helper\ServiceResponse;
use App\Helper\AppConstants;
use App\Helper\SuccessConstants;
use App\Helper\ErrorConstants;
use App\Manager\SessionManager;
use App\Manager\SuperAdminManager;
use App\User;

class SuperAdminController extends Controller
{
    function __construct(){
        $this->superAdminManager = new SuperAdminManager();
        $this->sessionManager = new SessionManager();
    }

    public function createUser(Request $request){
        $response = new ServiceResponse();
        try{

            $user = $this->sessionManager->getLoggedInUser();
            if($user == null){
                $response->status = false;
                $response->result = ErrorConstants::USER_NOT_LOGGED_IN;
                return json_encode($response);
            } elseif ($user->user_type == AppConstants::userType['Student']) {
                $response->status = false;
                $response->result = ErrorConstants::NO_PRIVILEGE;
                return json_encode($response);
            }

            $input = $request->only('user_name', 'user_type', 'grade_id');

            $createAdminValidation = Validator::make($input, User::$createUserRule);
            if(!($createAdminValidation->passes()) || ($input['user_type'] == AppConstants::userType['Student'] && empty($input['grade_id']))){
                $response->status = false;
                $response->result = ErrorConstants::REQUIRED_FIELDS_EMPTY;
                return json_encode($response);
            }

            if($this->superAdminManager->createUser($input)){
                $response->status = true;
                $response->result = SuccessConstants::USER_CREATED_SUCCESSFULLY;
                return json_encode($response);
            } else {
                $response->status = false;
                $response->result = ErrorConstants::USER_CREATION_FAILED;
                return json_encode($response);   
            }
 

        } catch(Exeception $e){
            $response->status = false;
            $response->result = $e;
            return json_encode($response);
        }
    }

    public function resetPassword(Request $request){
        $response = new ServiceResponse();
        try {

            $user = $this->sessionManager->getLoggedInUser();
            if($user == null){
                $response->status = false;
                $response->result = ErrorConstants::USER_NOT_LOGGED_IN;
                return json_encode($response);
            } elseif ($user->user_type == AppConstants::userType['Student']) {
                $response->status = false;
                $response->result = ErrorConstants::NO_PRIVILEGE;
                return json_encode($response);
            }

            $input = $request->only('user_id');

            $resetPasswordValidation = Validator::make($input, User::$resetPasswordRule);
            if(!$resetPasswordValidation->passes()){
                $response->status = false;
                $response->result = ErrorConstants::REQUIRED_FIELDS_EMPTY;
                return json_encode($response);
            }

            if($this->superAdminManager->resetPassword($input)){
                $response->status = true;
                $response->result = SuccessConstants::PASSWORD_RESET_SUCCESSFULLY;
                return json_encode($response);
            } else {
                $response->status = false;
                $response->result = ErrorConstants::PASSWORD_RESET_FAILED;
                return json_encode($response); 
            }

        } catch(Exception $e){
            $response->status = false;
            $response->result = $e;
            return json_encode($response);
        }

    }

    public function deleteUser(Request $request){
        $response = new ServiceResponse();
        try {

            $user = $this->sessionManager->getLoggedInUser();
            if($user == null){
                $response->status = false;
                $response->result = ErrorConstants::USER_NOT_LOGGED_IN;
                return json_encode($response);
            } elseif ($user->user_type == AppConstants::userType['Student']) {
                $response->status = false;
                $response->result = ErrorConstants::NO_PRIVILEGE;
                return json_encode($response);
            }

            $input = $request->only('user_id');

            $deleteUserValidation = Validator::make($input, User::$deleteUserRule);
            if(!$deleteUserValidation->passes()){
                $response->status = false;
                $response->result = ErrorConstants::REQUIRED_FIELDS_EMPTY;
                return json_encode($response);
            }

            if($this->superAdminManager->deleteUser($input)){
                $response->status = true;
                $response->result = SuccessConstants::USER_DELETED_SUCCESSFULLY;
                return json_encode($response);
            } else {
                $response->status = false;
                $response->result = ErrorConstants::USER_DELETION_FAILED;
                return json_encode($response); 
            }

        } catch(Exception $e) {
            $response->status = false;
            $response->result = $e;
            return json_encode($response);
        }
    }
}
