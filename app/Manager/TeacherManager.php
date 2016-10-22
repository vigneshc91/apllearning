<?php

namespace App\Manager;

use Illuminate\Support\Facades\DB;
use Storage;
use App\AppConstants;
use App\Material;

class TeacherManager {

    public function createMaterial($user, $input){
        try {

            $userId = $user->id;
            $gradeId = $input['grade_id'];
            $subjectId = $input['subject_id'];
            $title = $input['title'];
            $description;
            if(!empty($input['description'])){
                $description = $input['description'];
            }
            $url = $this->uploadFile($input['url']);
            if(!$url) {
                return false;
            }

            Material::create([
                'user_id' => $userId,
                'grade_id' => $gradeId,
                'subject_id' => $subjectId,
                'title' => $title,
                'url' => $url,
                'description' => $description
            ]);

            return true;

            
        } catch(Exception $e){
            throw $e;
        }
    }

    public function editMaterial($user, $input){
        try{

            $materialId = $input['material_id'];

            $material = Material::find($materialId);
            if($material == null || $material->user_id != $user->id){
                return false;
            }

            if(!empty($input['grade_id'])){
                $material->grade_id = $input['grade_id'];
            }
            if(!empty($input['subject_id'])){
                $material->subject_id = $input['subject_id'];
            }
            if(!empty($input['title'])){
                $material->title = $input['title'];
            }
            if(!empty($input['description'])){
                $material->description = $input['description'];
            }
            if(!empty($input['url'])){
                $this->deleteFile($material->url);
                $url = $this->uploadFile($input['url']);
                if(!$url){
                    return false;
                }
                $material->url = $url;
            }

            $material->save();
            return true;

        } catch(Exception $e){
            throw $e;
        }
    }

    public function deleteMaterial($user, $input){
        try{

            $materialId = $input['material_id'];

            $material = Material::find($materialId);

            if($material == null || $material->user_id != $user->id){
                return false;
            }

            $this->deleteFile($material->url);
            $material->delete();
            return true;

        } catch(Exception $e){
            throw $e;
        }
    }

    public function getMaterialsList($input){
        try{

            $start = $input['start'];
            $size = $input['size'];

            $query = array();
            if(!empty($input['user_id'])){
                array_push($query, ['user_id', $input['user_id']]);
            }
            if(!empty($input['grade_id'])){
                array_push($query, ['grade_id', $input['grade_id']]);
            }
            if(!empty($input['subject_id'])){
                array_push($query, ['subject_id', $input['subject_id']]);
            }

            $material = Material::where($query)->skip($start)->take($size)->get();

            return $material;

        } catch(Exception $e){
            throw $e;
        }
    }

    public function uploadFile($file){
        try {
            $fileName = uniqid() . "." . $file->getClientOriginalExtension();
            $upload = Storage::put($fileName, file_get_contents($file));
            if($upload){
                return $fileName;
            }

            return false;

        } catch(Exception $e){
            throw $e;
        }
    }

    public function deleteFile($file){
        try{

            Storage::delete($file);

        } catch(Exception $e){
            throw $e;
        }
    }
}