<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Validator;

use App\Http\Requests;
use App\Helper\ServiceResponse;
use App\Helper\AppConstants;
use App\Helper\SuccessConstants;
use App\Helper\ErrorConstants;
use App\Manager\SessionManager;
use App\Manager\TeacherManager;
use App\Material;

class TeacherController extends Controller
{
    function __construct(){
        $this->sessionManager = new SessionManager();
        $this->teacherManager = new TeacherManager();
    }

    public function createMaterial(Request $request){
        $response = new ServiceResponse();
        try {
            
            $user = $this->sessionManager->getLoggedInUser();
            if($user == null){
                $response->status = false;
                $response->result = ErrorConstants::USER_NOT_LOGGED_IN;
                return json_encode($response);
            } elseif ($user->user_type != AppConstants::userType['Teacher']) {
                $response->status = false;
                $response->result = ErrorConstants::NO_PRIVILEGE;
                return json_encode($response);
            }

            $input = $request->only('grade_id', 'subject_id', 'title', 'url', 'description');

            $createMaterialValidation = Validator::make($input, Material::$createMaterialRule);
            if(!$createMaterialValidation->passes()){
                $response->status = false;
                $response->result = ErrorConstants::REQUIRED_FIELDS_EMPTY;
                return json_encode($response);
            }

            if($this->teacherManager->createMaterial($user, $input)){
                $response->status = true;
                $response->result = SuccessConstants::MATERIAL_CREATED_SUCCESSFULLY;
                return json_encode($response);
            }
            
            $response->status = false;
            $response->result = ErrorConstants::MATERIAL_CREATION_FAILED;
            return json_encode($response); 
            

        } catch(Exception $e){
            $response->status = false;
            $response->result = $e;
            return json_encode($response);
        }
    }

    public function editMaterial(Request $request){
        $response = new ServiceResponse();
        try {
            
            $user = $this->sessionManager->getLoggedInUser();
            if($user == null){
                $response->status = false;
                $response->result = ErrorConstants::USER_NOT_LOGGED_IN;
                return json_encode($response);
            } elseif ($user->user_type != AppConstants::userType['Teacher']) {
                $response->status = false;
                $response->result = ErrorConstants::NO_PRIVILEGE;
                return json_encode($response);
            }

            $input = $request->only('material_id', 'grade_id', 'subject_id', 'title', 'url', 'description');

            $editMaterialValidation = Validator::make($input, Material::$editMaterialRule);
            if(!$editMaterialValidation->passes()){
                $response->status = false;
                $response->result = ErrorConstants::REQUIRED_FIELDS_EMPTY;
                return json_encode($response);
            }

            if($this->teacherManager->editMaterial($user, $input)){
                $response->status = true;
                $response->result = SuccessConstants::MATERIAL_EDITED_SUCCESSFULLY;
                return json_encode($response);
            } else {
                $response->status = false;
                $response->result = ErrorConstants::MATERIAL_EDIT_FAILED;
                return json_encode($response); 
            }
            
            

        } catch(Exception $e){
            $response->status = false;
            $response->result = $e;
            return json_encode($response);
        }
    }

    public function deleteMaterial(Request $request){
        $response = new ServiceResponse();
        try {
            
            $user = $this->sessionManager->getLoggedInUser();
            if($user == null){
                $response->status = false;
                $response->result = ErrorConstants::USER_NOT_LOGGED_IN;
                return json_encode($response);
            } elseif ($user->user_type != AppConstants::userType['Teacher']) {
                $response->status = false;
                $response->result = ErrorConstants::NO_PRIVILEGE;
                return json_encode($response);
            }

            $input = $request->only('material_id');

            $deleteMaterialValidation = Validator::make($input, Material::$deleteMaterialRule);
            if(!$deleteMaterialValidation->passes()){
                $response->status = false;
                $response->result = ErrorConstants::REQUIRED_FIELDS_EMPTY;
                return json_encode($response);
            }

            if($this->teacherManager->deleteMaterial($user, $input)){
                $response->status = true;
                $response->result = SuccessConstants::MATERIAL_DELETED_SUCCESSFULLY;
                return json_encode($response);
            } else {
                $response->status = false;
                $response->result = ErrorConstants::MATERIAL_DELETION_FAILED;
                return json_encode($response); 
            }
            
            

        } catch(Exception $e){
            $response->status = false;
            $response->result = $e;
            return json_encode($response);
        }
    }

    public function getMaterialsList(Request $request){
        $response = new ServiceResponse();
        try {
            
            $user = $this->sessionManager->getLoggedInUser();
            if($user == null){
                $response->status = false;
                $response->result = ErrorConstants::USER_NOT_LOGGED_IN;
                return json_encode($response);
            } elseif ($user->user_type != AppConstants::userType['Teacher'] && $user->user_type != AppConstants::userType['Student']) {
                $response->status = false;
                $response->result = ErrorConstants::NO_PRIVILEGE;
                return json_encode($response);
            }

            $input = $request->only('user_id', 'grade_id', 'subject_id', 'start', 'size');

            if(empty($input['start'])){
                $input['start'] = AppConstants::MATERIALS_START_VALUE;
            }
            if(empty($input['size'])){
                $input['size'] = AppConstants::MATERIALS_SIZE_VALUE;
            }

            $response->result = $this->teacherManager->getMaterialsList($input);
            $response->status = true;
            return json_encode($response);            

        } catch(Exception $e){
            $response->status = false;
            $response->result = $e;
            return json_encode($response);
        }
    }
}
