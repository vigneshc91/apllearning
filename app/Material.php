<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Material extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'material';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [];
    
    /**
     * The attributes that aren't mass assignable.
     *
     * @var array
     */
    protected $guarded = ['id'];

    /**
     * Get the user.
     */
    public function user()
    {
        return $this->hasOne('App\User');
    }

    /**
     * Get the grade of the user.
     */
    public function grade()
    {
        return $this->hasOne('App\Grade');
    }

    /**
     * Get the subject of the user.
     */
    public function subject()
    {
        return $this->hasOne('App\Subject');
    }

    // Material create validation rule
    public static $createMaterialRule = array(
        'grade_id' => 'required',
        'subject_id' => 'required',
        'title' => 'required',
        'url' => 'required'
    );

    // Material edit validation rule
    public static $editMaterialRule = array(
        'material_id' => 'required'
    );

    // Material delete validation rule
    public static $deleteMaterialRule = array(
        'material_id' => 'required'
    );

    // Get material validation rule
    public static $getMaterialRule = array(
        'material_id' => 'required'
    );
}
