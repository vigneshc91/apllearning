<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

class StudentController extends Controller
{
    public function dashboard(){
        try{

            return view('student.dashboard');

        } catch(Exception $e){
            return $e;
        }
    }
}
