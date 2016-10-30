<?php

namespace App\Manager;

use App\Helper\AppConstants;
use App\User;
use App\Grade;
use App\Subject;
use App\Material;

class AdminManager {

    public function editStudent($input) {
        try{

            $userId = $input['user_id'];
            $gradeId = $input['grade_id'];

            $user = User::find($userId);
            
            if($user == null || $user->user_type != AppConstants::userType['Student']) {
                return false;
            } else {
                $user->grade_id = $gradeId;
                $user->save();
                return true;
            }


        } catch(Exception $e){
            throw $e;
        }
    }
    
    public function createGrade($input) {
        try {

            $grade = $input['grade'];
            $section = $input['section'];

            Grade::create([
                'grade' => $grade,
                'section' => $section
            ]);

            return true;

        } catch(Exception $e){
            throw $e;
        }
    }

    public function editGrade($input) {
        try{

            $gradeId = $input['grade_id'];
            
            $grade = Grade::find($gradeId);
            
            if($grade == null) {
                return false;
            } else {
                if(isset($input['grade']) && strlen($input['grade']) > 0 ){
                    $grade->grade = $input['grade'];
                }

                if(isset($input['section']) && strlen($input['section']) > 0 ){
                    $grade->section = $input['section'];
                }

                $grade->save();
                return true;
            }

        } catch(Exception $e){
            throw $e;
        }
    }

    public function deleteGrade($input){
        try {

            $gradeId = $input['grade_id'];

            $grade = Grade::find($gradeId);
            if($grade == null) {
                return false;
            } else {
                $grade->delete();
                return true;
            }

        } catch(Exception $e) {
            throw $e;
        }
    }

    public function createSubject($input) {
        try {

            $grade = $input['grade'];
            $name = $input['name'];

            Subject::create([
                'grade' => $grade,
                'name' => $name
            ]);

            return true;

        } catch(Exception $e){
            throw $e;
        }
    }

    public function editSubject($input) {
        try{

            $subjectId = $input['subject_id'];
            
            $subject = Subject::find($subjectId);
            
            if($subject == null) {
                return false;
            } else {
                if(isset($input['grade']) && strlen($input['grade']) > 0 ){
                    $subject->grade = $input['grade'];
                }

                if(isset($input['name']) && strlen($input['name']) > 0 ){
                    $subject->name = $input['name'];
                }

                $subject->save();
                return true;
            }


        } catch(Exception $e){
            throw $e;
        }
    }

    public function deleteSubject($input){
        try {

            $subjectId = $input['subject_id'];

            $subject = Subject::find($subjectId);
            if($subject == null) {
                return false;
            } else {
                $subject->delete();
                return true;
            }

        } catch(Exception $e) {
            throw $e;
        }
    }

    public function getUsersList($input){
        try {

            $userType = $input['user_type'];
            $start = $input['start'];
            $size = $input['size'];

            $query = array();
            array_push($query, ['user_type', $userType]);

            if($userType == AppConstants::userType['Student'] && !empty($input['grade_id'])){
                $gradeId = $input['grade_id'];
                array_push($query, ['grade_id', $gradeId]);
            }

            $result = User::where($query)
                        ->leftJoin('grade', 'grade.id', '=', 'users.grade_id')
                        ->select('users.id', 'users.user_name', 'users.user_type', 'users.grade_id', 'users.created_at', 'users.updated_at', 'grade.grade', 'grade.section')
                        ->skip($start)->take($size)->get();

            
            return $result;

        } catch(Exception $e){
            throw $e;
        }
    }

    public function getGradesList($input){
        try {

            $start = $input['start'];
            $size = $input['size'];

            if(!empty($input['grade'])){
                $grade = $input['grade'];
                $result = Grade::where('grade', $grade)->skip($start)->take($size)->get();
            } else {
                $result = Grade::skip($start)->take($size)->get();
            }
            
            return $result;

        } catch(Exception $e){
            throw $e;
        }
    }

    public function getSubjectsList($input){
        try {

            $start = $input['start'];
            $size = $input['size'];

            if(!empty($input['grade'])){
                $grade = $input['grade'];
                $result = Subject::where('grade', $grade)->skip($start)->take($size)->get();
            } else {
                $result = Subject::skip($start)->take($size)->get();
            }
            
            return $result;

        } catch(Exception $e){
            throw $e;
        }
    }

    public function getUserById($input){
        try{

            $userId = $input['user_id'];

            $user = User::find($userId);

            if($user->grade_id != null){
                $grade = $this->getGradeById(['grade_id' => $user->grade_id]);
                $user->grade = $grade->grade;
                $user->section = $grade->section;
            }

            return $user;

        } catch(Exception $e){
            throw $e;
        }
    }

    public function getGradeById($input){
        try{

            $gradeId = $input['grade_id'];

            $grade = Grade::find($gradeId);

            return $grade;

        } catch(Exception $e){
            throw $e;
        }
    }

    public function getSubjectById($input){
        try{

            $subjectId = $input['subject_id'];

            $subject = Subject::find($subjectId);

            return $subject;

        } catch(Exception $e){
            throw $e;
        }
    }

    public function getMaterialById($input){
        try{

            $materialId = $input['material_id'];

            $material = Material::find($materialId);

            return $material;

        } catch(Exception $e){
            throw $e;
        }
    }

    public function searchUser($input){
        try{

            $query = $input['user_name'];
            $start = $input['start'];
            $size = $input['size'];

            $condition = array();
            
            array_push($condition, ['user_name', 'LIKE', '%'.$query.'%']);
            
            if(!empty($input['user_type'])){
                array_push($condition, ['user_type', $input['user_type']]);
            }

            $user = User::where($condition)->skip($start)->take($size)->get();

            return $user;
            
        } catch(Exception $e){
            throw $e;
        }
    }
}