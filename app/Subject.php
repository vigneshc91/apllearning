<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Subject extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'subject';
    
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

    // Subject create validation rule
    public static $createSubjectRule = array(
        'grade' => 'required',
        'name' => 'required'
    );

    // Subject edit validation rule
    public static $editSubjectRule = array(
        'subject_id' => 'required'
    );
    
    // Subject delete validation rule
    public static $deleteSubjectRule = array(
        'subject_id' => 'required'
    );

    // Get subject validation rule
    public static $getSubjectRule = array(
        'subject_id' => 'required'
    );
}
