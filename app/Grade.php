<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Grade extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'grade';

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

    // Grade create validation rule
    public static $createGradeRule = array(
        'grade' => 'required',
        'section' => 'required'
    );

    // Grade edit validation rule
    public static $editGradeRule = array(
        'grade_id' => 'required'
    );
    
    // Grade delete validation rule
    public static $deleteGradeRule = array(
        'grade_id' => 'required'
    );

    // Get grade validation rule
    public static $getGradeRule = array(
        'grade_id' => 'required'
    );
}
