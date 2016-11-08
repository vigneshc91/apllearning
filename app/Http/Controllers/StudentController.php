<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Validator;

use App\Http\Requests;
use App\Helper\ServiceResponse;
use App\Helper\AppConstants;
use App\Helper\SuccessConstants;
use App\Helper\ErrorConstants;
use App\Manager\StudentManager;
use App\User;

class StudentController extends Controller
{
    
    function __construct(){
        $this->studentManager = new StudentManager();
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

            $result = $this->studentManager->login($input);
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

    public function logout(Request $request){
        $response = new ServiceResponse(); 
        try {

            $input = $request->only('token');

            $logoutValidation = Validator::make($input, User::$userLogoutRule);

            if(!$logoutValidation->passes()){
                $response->status = false;
                $response->result = ErrorConstants::REQUIRED_FIELDS_EMPTY;
                return json_encode($response);
            }
            
            $result = $this->studentManager->logout($input);
            if($result){
                $response->status = true;
                $response->result = SuccessConstants::LOGOUT_SUCCESS;
                return json_encode($response);
            } else {
                $response->status = false;
                $response->result = ErrorConstants::LOGOUT_FAILED;
                return json_encode($response);
            }


        } catch(Exception $e) {
            $response->status = false;
            $response->result = $e;
            return json_encode($response);
        }
    }
    
    public function dashboard(){
        try{

            return view('student.dashboard');

        } catch(Exception $e){
            return $e;
        }
    }
}
