<?php

namespace App\Manager;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Helper\AppConstants;
use App\User;
use App\Session;

class StudentManager {
    
    public function login($input){
        try {

            $userName = $input['user_name'];
            $password = $input['password'];

            $result = Auth::Attempt(['user_name' => $userName, 'password' => $password, 'status' => AppConstants::userStatus['Approved']]);
            if($result){
                $token = md5(rand());
                Session::create([
                    'id' => $token,
                    'user_id' => Auth::user()->id,
                    'payload' => Auth::user()->user_name,
                    'last_activity' => time()
                ]);
                $result = Auth::user();
                $result->token = $token;
                return $result;
            } else {
                return false;
            }

        } catch(Exception $e){
            throw $e;
        }
    }

    public function logout($input){
        try{
            $token = $input['token'];

            $session = Session::find($token);
            if($session){
                $session->delete();
                Auth::logout();
                return true;
            }

            return false;

        } catch(Exception $e) {
            throw $e;
        }
    }

}