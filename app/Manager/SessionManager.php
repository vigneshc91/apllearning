<?php

namespace App\Manager;

use Illuminate\Support\Facades\Auth;
use App\Session;

class SessionManager {

    public function getLoggedInUser($token = ''){
        try {
            if(!empty($token)){
                $session = Session::find($token);
                if($session){
                    return $session;
                } else {
                    return false;
                }
            } else {
                return Auth::user();
            }

        } catch(Exception $e){
            throw $e;
        }
    }
}