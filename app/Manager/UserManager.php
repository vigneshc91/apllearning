<?php

namespace App\Manager;

use Illuminate\Support\Facades\Auth;
use App\Helper\AppConstants;

class UserManager {
    
    public function login($input){
        try {

            $userName = $input['user_name'];
            $password = bcrypt($input['password']);

            return Auth::Attempt(['user_name' => $userName, 'password' => $password, 'status' => AppConstants::userStatus['Approved']]);

        } catch(Exception $e){
            throw $e;
        }
    }
}