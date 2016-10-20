<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * Get the grade of the user.
     */
    public function grade()
    {
        return $this->hasOne('App\Grade');
    }

    // User login validation rule
    public static $userLoginRule = array(
        'user_name' => 'required',
        'password' => 'required'
    );

    // Admin create validation rule
    public static $createAdminRule = array(
        'user_name' => 'required',
        'password' => 'required'
    );

    // Teacher create validation rule
    public static $createTeacherRule = array(
        'user_name' => 'required',
        'password' => 'required'
    );

    // Student create validation rule
    public static $createStudentRule = array(
        'user_name' => 'required',
        'password' => 'required',
        'grade_id' => 'required'
    );
}
