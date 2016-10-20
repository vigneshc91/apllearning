<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Validator;

use App\Http\Requests;

use App\Helper\SuccessConstants;
use App\Helper\ErrorConstants;
use App\Helper\ServiceResponse;
use App\Manager\UserManager;
use App\User;

class UserController extends Controller
{
    function __construct(){
        $this->userManager = new UserManager();
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

            if($this->userManager->login($input)) {
                $response->status = true;
                $response->result = SuccessConstants::LOGIN_SUCCESS;
                return json_encode($response);
            } else {
                $response->status = false;
                $response->result = ErrorConstants::LOGIN_FAILED;
                return json_encode($response);
            }
            

        } catch(Exception $e){
            $response->status = false;
            $response->result = $e;
            return json_encode($response);
        }
    }
}
