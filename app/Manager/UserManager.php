<?php

namespace App\Manager;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Helper\AppConstants;
use App\User;

class UserManager {
    
    public function login($input){
        try {

            $userName = $input['user_name'];
            $password = $input['password'];

            return Auth::Attempt(['user_name' => $userName, 'password' => $password, 'status' => AppConstants::userStatus['Approved']]);

        } catch(Exception $e){
            throw $e;
        }
    }

    public function logout(){
        try{

            return Auth::logout();

        } catch(Exception $e) {
            throw $e;
        }
    }

    public function changePassword($loggedInUser, $input){
        try {

            $oldPassword = $input['old_password'];
            $newPassword = bcrypt($input['new_password']);

            $userId = $loggedInUser->id;

            $user = User::find($userId)->first();

            if(!Hash::check($oldPassword, $user->password)){
                return false;
            } else {
                $user->password = $newPassword;
                $user->save();
                return true;
            }


        } catch(Exception $e){
            throw $e;
        }
    }
}