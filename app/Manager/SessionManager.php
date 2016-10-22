<?php

namespace App\Manager;

use Illuminate\Support\Facades\Auth;

class SessionManager {

    public function getLoggedInUser(){
        try {

            return Auth::user();

        } catch(Exception $e){
            throw $e;
        }
    }
}