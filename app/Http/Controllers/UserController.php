<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Validator;

use App\Http\Requests;

use App\Helper\AppConstants;
use App\Helper\SuccessConstants;
use App\Helper\ErrorConstants;
use App\Helper\ServiceResponse;
use App\Manager\UserManager;
use App\Manager\SessionManager;
use App\User;

class UserController extends Controller
{
    function __construct(){
        $this->userManager = new UserManager();
        $this->sessionManager = new SessionManager();
    }

    public function login(Request $request){
        $response = new ServiceResponse(); 
        try {
            $input = $request->only('user_name', 'password');

            $loginValidation = Validator::make($input, User::$userLoginRule);

            if(!$loginValidation->passes()){
                $response->status = false;
                $response->result = ErrorConstants::REQUIRED_FIELDS_EMPTY;
                return json_encode($response);
            }

            $result = $this->userManager->login($input);
            if(!$result) {
                $response->status = false;
                $response->result = ErrorConstants::LOGIN_FAILED;
                return json_encode($response);
            } else {
                $response->status = true;
                $response->result = $result;
                return json_encode($response);
            }
            

        } catch(Exception $e){
            $response->status = false;
            $response->result = $e;
            return json_encode($response);
        }
    }

    public function logout(){
        $response = new ServiceResponse(); 
        try {
            
            $this->userManager->logout();
            
            $response->status = true;
            $response->result = SuccessConstants::LOGOUT_SUCCESS;
            return json_encode($response);


        } catch(Exception $e) {
            $response->status = false;
            $response->result = $e;
            return json_encode($response);
        }
    }

    public function changePassword(Request $request){
        $response = new ServiceResponse(); 
        try {

            $input = $request->only('old_password', 'new_password', 'token');
            
            $user = $this->sessionManager->getLoggedInUser($input['token']);
            if($user == null){
                $response->status = false;
                $response->result = ErrorConstants::USER_NOT_LOGGED_IN;
                return json_encode($response);
            }


            $changePasswordValidation = Validator::make($input, User::$userChangePasswordRule);

            if(!$changePasswordValidation->passes()){
                $response->status = false;
                $response->result = ErrorConstants::REQUIRED_FIELDS_EMPTY;
                return json_encode($response);
            }
            if(!empty($input['token'])){
                $user->id = $user->user_id;
            }
            if($this->userManager->changePassword($user, $input)){
                $response->status = true;
                $response->result = SuccessConstants::PASSWORD_CHANGED_SUCCESSFULLY;
                return json_encode($response);
            } else {
                $response->status = false;
                $response->result = ErrorConstants::INVALID_OLD_PASSWORD;
                return json_encode($response);
            }
            


        } catch(Exception $e){
            $response->status = false;
            $response->result = $e;
            return json_encode($response);
        }
    }

    public function getLoggedInUser(){
        $response = new ServiceResponse(); 
        try {

            $user = $this->sessionManager->getLoggedInUser();
            if($user == null){
                $response->status = false;
                $response->result = ErrorConstants::USER_NOT_LOGGED_IN;
                return json_encode($response);
            } else {
                $response->status = true;
                $response->result = $user;
                return json_encode($response);
            }

        } catch(Exception $e) {
            $response->status = false;
            $response->result = $e;
            return json_encode($response);
        }
    }

    public function userLogout(){
        $response = new ServiceResponse(); 
        try {
            
            $this->userManager->logout();
            
            return redirect('/');


        } catch(Exception $e) {
            $response->status = false;
            $response->result = $e;
            return json_encode($response);
        }
    }

    public function password() {
        try {
            return view('changePassword');
        } catch(Exception $e) {
            return $e;
        }
    }
}
