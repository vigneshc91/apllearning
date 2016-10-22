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
     * The attributes that aren't mass assignable.
     *
     * @var array
     */
    protected $guarded = ['id'];

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

    // User change password validation rule
    public static $userChangePasswordRule = array(
        'old_password' => 'required',
        'new_password' => 'required'
    );

    // User create validation rule
    public static $createUserRule = array(
        'user_name' => 'required',
        'user_type' => 'required'
    );

    // Reset password validation rule
    public static $resetPasswordRule = array(
        'user_id' => 'required'
    );

    // Delete user validation rule
    public static $deleteUserRule = array(
        'user_id' => 'required'
    );

    // Get user validation rule
    public static $getUserRule = array(
        'user_id' => 'required'
    );

    // Get users list validation rule
    public static $usersListRule = array(
        'user_type' => 'required',
    );

    // Edit student validation rule
    public static $editStudentRule = array(
        'user_id' => 'required',
        'grade_id' => 'required'
    );
    
}
