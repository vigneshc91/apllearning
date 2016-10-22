<?php

namespace App\Manager;

use App\Helper\AppConstants;
use App\User;

class SuperAdminManager {

    public function createUser($input){
        try {

            $userName = $input['user_name'];
            $userType = $input['user_type'];
            $gradeId;
            
            if($userType == AppConstants::userType['Student'] && empty($input['grade_id'])){
                return false;
            } else {
                $gradeId = $input['grade_id'];
            }

            $user = User::where('user_name', $userName)->count();
            if($user == 0){
                User::create([
                    'user_name' => $userName,
                    'password' => bcrypt($userName),
                    'user_type' => $userType,
                    'grade_id' => $gradeId,
                    'status' => AppConstants::userStatus['Approved']
                ]);

                return true;
            } else {
                return false;
            }

        } catch(Exception $e) {
            throw $e;
        }
    }

    public function resetPassword($input){
        try {

            $userId = $input['user_id'];

            $user = User::find($userId);
            if($user != null){
                $user->password = bcrypt($user->user_name);
                $user->save();
                return true;
            } else {
                return false;
            }
             
        } catch(Exception $e){
            throw $e;
        }
    }

    public function deleteUser($input){
        try {

            $userId = $input['user_id'];

            $user = User::find($userId);
            if($user != null){
                $user->delete();
                return true;
            } else {
                return false;
            }

        } catch(Exception $e) {
            throw $e;
        }
    }
}