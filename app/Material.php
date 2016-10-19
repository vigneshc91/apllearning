<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Material extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [];
    
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
}
