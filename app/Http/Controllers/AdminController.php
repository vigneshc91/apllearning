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
use App\Manager\AdminManager;
use App\User;
use App\Grade;
use App\Subject;
use App\Material;

class AdminController extends Controller
{
    function __construct(){
        $this->adminManager = new AdminManager();
        $this->sessionManager = new SessionManager();
    }

    public function editStudent(Request $request) {
        $response = new ServiceResponse();
        try{

            $user = $this->sessionManager->getLoggedInUser();
            if($user == null){
                $response->status = false;
                $response->result = ErrorConstants::USER_NOT_LOGGED_IN;
                return json_encode($response);
            } elseif ($user->user_type != AppConstants::userType['Admin']  && $user->user_type != AppConstants::userType['Teacher']) {
                $response->status = false;
                $response->result = ErrorConstants::NO_PRIVILEGE;
                return json_encode($response);
            }

            $input = $request->only('user_id', 'grade_id');
            $editStudentValidation = Validator::make($input, User::$editStudentRule);
            if(!$editStudentValidation->passes()){
                $response->status = false;
                $response->result = ErrorConstants::REQUIRED_FIELDS_EMPTY;
                return json_encode($response);
            }

            if($this->adminManager->editStudent($input)){
                $response->status = true;
                $response->result = SuccessConstants::STUDENT_EDITED_SUCCESSFULLY;
                return json_encode($response);
            } else {
                $response->status = false;
                $response->result = ErrorConstants::STUDENT_EDIT_FAILED;
                return json_encode($response);
            }

        } catch(Exception $e){
            $response->status = false;
            $response->result = $e;
            return json_encode($response);
        }
    }

    public function createGrade(Request $request) {
        $response = new ServiceResponse();
        try {
            
            $user = $this->sessionManager->getLoggedInUser();
            if($user == null){
                $response->status = false;
                $response->result = ErrorConstants::USER_NOT_LOGGED_IN;
                return json_encode($response);
            } elseif ($user->user_type != AppConstants::userType['Admin']) {
                $response->status = false;
                $response->result = ErrorConstants::NO_PRIVILEGE;
                return json_encode($response);
            }

            $input = $request->only('grade', 'section');

            $createGradeValidation = Validator::make($input, Grade::$createGradeRule);
            if(!$createGradeValidation->passes()){
                $response->status = false;
                $response->result = ErrorConstants::REQUIRED_FIELDS_EMPTY;
                return json_encode($response);
            }

            if($this->adminManager->createGrade($input)){
                $response->status = true;
                $response->result = SuccessConstants::GRADE_CREATED_SUCCESSFULLY;
                return json_encode($response);
            }
            
            $response->status = false;
            $response->result = ErrorConstants::GRADE_CREATION_FAILED;
            return json_encode($response); 
            

        } catch(Exception $e){
            $response->status = false;
            $response->result = $e;
            return json_encode($response);
        }
    }

    public function editGrade(Request $request){
        $response = new ServiceResponse();
        try{

            $user = $this->sessionManager->getLoggedInUser();
            if($user == null){
                $response->status = false;
                $response->result = ErrorConstants::USER_NOT_LOGGED_IN;
                return json_encode($response);
            } elseif ($user->user_type != AppConstants::userType['Admin']) {
                $response->status = false;
                $response->result = ErrorConstants::NO_PRIVILEGE;
                return json_encode($response);
            }

            $input = $request->only('grade_id', 'grade', 'section');
            $editGradeValidation = Validator::make($input, Grade::$editGradeRule);
            if(!$editGradeValidation->passes()){
                $response->status = false;
                $response->result = ErrorConstants::REQUIRED_FIELDS_EMPTY;
                return json_encode($response);
            }

            if($this->adminManager->editGrade($input)){
                $response->status = true;
                $response->result = SuccessConstants::GRADE_EDITED_SUCCESSFULLY;
                return json_encode($response);
            } else {
                $response->status = false;
                $response->result = ErrorConstants::GRADE_EDIT_FAILED;
                return json_encode($response);
            }

        } catch(Exception $e){
            $response->status = false;
            $response->result = $e;
            return json_encode($response);
        }
    }

    public function deleteGrade(Request $request){
        $response = new ServiceResponse();
        try{

            $user = $this->sessionManager->getLoggedInUser();
            if($user == null){
                $response->status = false;
                $response->result = ErrorConstants::USER_NOT_LOGGED_IN;
                return json_encode($response);
            } elseif ($user->user_type != AppConstants::userType['Admin']) {
                $response->status = false;
                $response->result = ErrorConstants::NO_PRIVILEGE;
                return json_encode($response);
            }

            $input = $request->only('grade_id');
            $deleteGradeValidation = Validator::make($input, Grade::$deleteGradeRule);
            if(!$deleteGradeValidation->passes()){
                $response->status = false;
                $response->result = ErrorConstants::REQUIRED_FIELDS_EMPTY;
                return json_encode($response);
            }

            if($this->adminManager->deleteGrade($input)){
                $response->status = true;
                $response->result = SuccessConstants::GRADE_DELETED_SUCCESSFULLY;
                return json_encode($response);
            } else {
                $response->status = false;
                $response->result = ErrorConstants::GRADE_DELETION_FAILED;
                return json_encode($response);
            }

        } catch(Exception $e){
            $response->status = false;
            $response->result = $e;
            return json_encode($response);
        }   
    }

    public function createSubject(Request $request) {
        $response = new ServiceResponse();
        try {
            
            $user = $this->sessionManager->getLoggedInUser();
            if($user == null){
                $response->status = false;
                $response->result = ErrorConstants::USER_NOT_LOGGED_IN;
                return json_encode($response);
            } elseif ($user->user_type != AppConstants::userType['Admin'] && $user->user_type != AppConstants::userType['Teacher']) {
                $response->status = false;
                $response->result = ErrorConstants::NO_PRIVILEGE;
                return json_encode($response);
            }

            $input = $request->only('grade', 'name');

            $createSubjectValidation = Validator::make($input, Subject::$createSubjectRule);
            if(!$createSubjectValidation->passes()){
                $response->status = false;
                $response->result = ErrorConstants::REQUIRED_FIELDS_EMPTY;
                return json_encode($response);
            }

            if($this->adminManager->createSubject($input)){
                $response->status = true;
                $response->result = SuccessConstants::SUBJECT_CREATED_SUCCESSFULLY;
                return json_encode($response);
            }
            
            $response->status = false;
            $response->result = ErrorConstants::SUBJECT_CREATION_FAILED;
            return json_encode($response); 
            

        } catch(Exception $e){
            $response->status = false;
            $response->result = $e;
            return json_encode($response);
        }
    }

    public function editSubject(Request $request){
        $response = new ServiceResponse();
        try{

            $user = $this->sessionManager->getLoggedInUser();
            if($user == null){
                $response->status = false;
                $response->result = ErrorConstants::USER_NOT_LOGGED_IN;
                return json_encode($response);
            } elseif ($user->user_type != AppConstants::userType['Admin'] && $user->user_type != AppConstants::userType['Teacher']) {
                $response->status = false;
                $response->result = ErrorConstants::NO_PRIVILEGE;
                return json_encode($response);
            }

            $input = $request->only('subject_id', 'grade', 'name');
            $editSubjectValidation = Validator::make($input, Subject::$editSubjectRule);
            if(!$editSubjectValidation->passes()){
                $response->status = false;
                $response->result = ErrorConstants::REQUIRED_FIELDS_EMPTY;
                return json_encode($response);
            }

            if($this->adminManager->editSubject($input)){
                $response->status = true;
                $response->result = SuccessConstants::SUBJECT_EDITED_SUCCESSFULLY;
                return json_encode($response);
            } else {
                $response->status = false;
                $response->result = ErrorConstants::SUBJECT_EDIT_FAILED;
                return json_encode($response);
            }

        } catch(Exception $e){
            $response->status = false;
            $response->result = $e;
            return json_encode($response);
        }
    }

    public function deleteSubject(Request $request){
        $response = new ServiceResponse();
        try{

            $user = $this->sessionManager->getLoggedInUser();
            if($user == null){
                $response->status = false;
                $response->result = ErrorConstants::USER_NOT_LOGGED_IN;
                return json_encode($response);
            } elseif ($user->user_type != AppConstants::userType['Admin'] && $user->user_type != AppConstants::userType['Teacher']) {
                $response->status = false;
                $response->result = ErrorConstants::NO_PRIVILEGE;
                return json_encode($response);
            }

            $input = $request->only('subject_id');
            $deleteSubjectValidation = Validator::make($input, Subject::$deleteSubjectRule);
            if(!$deleteSubjectValidation->passes()){
                $response->status = false;
                $response->result = ErrorConstants::REQUIRED_FIELDS_EMPTY;
                return json_encode($response);
            }

            if($this->adminManager->deleteSubject($input)){
                $response->status = true;
                $response->result = SuccessConstants::SUBJECT_DELETED_SUCCESSFULLY;
                return json_encode($response);
            } else {
                $response->status = false;
                $response->result = ErrorConstants::SUBJECT_DELETION_FAILED;
                return json_encode($response);
            }

        } catch(Exception $e){
            $response->status = false;
            $response->result = $e;
            return json_encode($response);
        }   
    }

    public function getUsersList(Request $request){
        $response = new ServiceResponse();
        try{

            $user = $this->sessionManager->getLoggedInUser();
            if($user == null){
                $response->status = false;
                $response->result = ErrorConstants::USER_NOT_LOGGED_IN;
                return json_encode($response);
            } elseif ($user->user_type != AppConstants::userType['Admin'] && $user->user_type != AppConstants::userType['Teacher']) {
                $response->status = false;
                $response->result = ErrorConstants::NO_PRIVILEGE;
                return json_encode($response);
            }

            $input = $request->only('user_type', 'grade_id', 'start', 'size');
            $usersListValidation = Validator::make($input, User::$usersListRule);
            if(!$usersListValidation->passes()){
                $response->status = false;
                $response->result = ErrorConstants::REQUIRED_FIELDS_EMPTY;
                return json_encode($response);
            }

            if(empty($input['start'])){
                $input['start'] = AppConstants::USERS_START_VALUE;
            }
            if(empty($input['size'])){
                $input['size'] = AppConstants::USERS_SIZE_VALUE;
            }

            $response->result = $this->adminManager->getUsersList($input);
            $response->status = true;
            return json_encode($response);

        } catch(Exception $e){
            $response->status = false;
            $response->result = $e;
            return json_encode($response);
        }
    }

    public function getGradesList(Request $request){
        $response = new ServiceResponse();
        try{

            $user = $this->sessionManager->getLoggedInUser();
            if($user == null){
                $response->status = false;
                $response->result = ErrorConstants::USER_NOT_LOGGED_IN;
                return json_encode($response);
            } elseif ($user->user_type != AppConstants::userType['Admin'] && $user->user_type != AppConstants::userType['Teacher']) {
                $response->status = false;
                $response->result = ErrorConstants::NO_PRIVILEGE;
                return json_encode($response);
            }

            $input = $request->only('grade','start', 'size');

            if(empty($input['start'])){
                $input['start'] = AppConstants::GRADES_START_VALUE;
            }
            if(empty($input['size'])){
                $input['size'] = AppConstants::GRADES_SIZE_VALUE;
            }

            $response->result = $this->adminManager->getGradesList($input);
            $response->status = true;
            return json_encode($response);

        } catch(Exception $e){
            $response->status = false;
            $response->result = $e;
            return json_encode($response);
        }
    }

    public function getSubjectsList(Request $request){
        $response = new ServiceResponse();
        try{

            $user = $this->sessionManager->getLoggedInUser();
            if($user == null){
                $response->status = false;
                $response->result = ErrorConstants::USER_NOT_LOGGED_IN;
                return json_encode($response);
            } elseif ($user->user_type != AppConstants::userType['Admin'] && $user->user_type != AppConstants::userType['Teacher']) {
                $response->status = false;
                $response->result = ErrorConstants::NO_PRIVILEGE;
                return json_encode($response);
            }

            $input = $request->only('grade','start', 'size');

            if(empty($input['start'])){
                $input['start'] = AppConstants::SUBJECTS_START_VALUE;
            }
            if(empty($input['size'])){
                $input['size'] = AppConstants::SUBJECTS_SIZE_VALUE;
            }

            $response->result = $this->adminManager->getSubjectsList($input);
            $response->status = true;
            return json_encode($response);

        } catch(Exception $e){
            $response->status = false;
            $response->result = $e;
            return json_encode($response);
        }
    }

    public function getUserById(Request $request){
        $response = new ServiceResponse();
        try{

            $user = $this->sessionManager->getLoggedInUser();
            if($user == null){
                $response->status = false;
                $response->result = ErrorConstants::USER_NOT_LOGGED_IN;
                return json_encode($response);
            }

            $input = $request->only('user_id');

            $getUserValidation = Validator::make($input, User::$getUserRule);
            if(!$getUserValidation->passes()){
                $response->status = false;
                $response->result = ErrorConstants::REQUIRED_FIELDS_EMPTY;
                return json_encode($response);
            }
           
            $result = $this->adminManager->getUserById($input);
            if($result == null){
                $response->status = false;
                $response->result = ErrorConstants::USER_NOT_FOUND;
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

    public function getGradeById(Request $request){
        $response = new ServiceResponse();
        try{

            $user = $this->sessionManager->getLoggedInUser();
            if($user == null){
                $response->status = false;
                $response->result = ErrorConstants::USER_NOT_LOGGED_IN;
                return json_encode($response);
            }

            $input = $request->only('grade_id');

            $getGradeValidation = Validator::make($input, Grade::$getGradeRule);
            if(!$getGradeValidation->passes()){
                $response->status = false;
                $response->result = ErrorConstants::REQUIRED_FIELDS_EMPTY;
                return json_encode($response);
            }
           
            $result = $this->adminManager->getGradeById($input);
            if($result == null){
                $response->status = false;
                $response->result = ErrorConstants::GRADE_NOT_FOUND;
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

    public function getSubjectById(Request $request){
        $response = new ServiceResponse();
        try{

            $user = $this->sessionManager->getLoggedInUser();
            if($user == null){
                $response->status = false;
                $response->result = ErrorConstants::USER_NOT_LOGGED_IN;
                return json_encode($response);
            }

            $input = $request->only('subject_id');

            $getSubjectValidation = Validator::make($input, Subject::$getSubjectRule);
            if(!$getSubjectValidation->passes()){
                $response->status = false;
                $response->result = ErrorConstants::REQUIRED_FIELDS_EMPTY;
                return json_encode($response);
            }
           
            $result = $this->adminManager->getSubjectById($input);
            if($result == null){
                $response->status = false;
                $response->result = ErrorConstants::SUBJECT_NOT_FOUND;
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

    public function getMaterialById(Request $request){
        $response = new ServiceResponse();
        try{

            $user = $this->sessionManager->getLoggedInUser();
            if($user == null){
                $response->status = false;
                $response->result = ErrorConstants::USER_NOT_LOGGED_IN;
                return json_encode($response);
            }

            $input = $request->only('material_id');

            $getMaterialValidation = Validator::make($input, Material::$getMaterialRule);
            if(!$getMaterialValidation->passes()){
                $response->status = false;
                $response->result = ErrorConstants::REQUIRED_FIELDS_EMPTY;
                return json_encode($response);
            }
           
            $result = $this->adminManager->getMaterialById($input);
            if($result == null){
                $response->status = false;
                $response->result = ErrorConstants::MATERIAL_NOT_FOUND;
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




}
