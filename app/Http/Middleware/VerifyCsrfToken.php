<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as BaseVerifier;

class VerifyCsrfToken extends BaseVerifier
{
    /**
     * The URIs that should be excluded from CSRF verification.
     *
     * @var array
     */
    protected $except = [
        'user/login', 'user/logout', 'student/login', 'student/logout', 'user/changePassword', 'user/getLoggedInUser', 'superAdmin/createUser', 'superAdmin/resetPassword', 'superAdmin/deleteUser',
        'admin/createGrade', 'admin/editGrade', 'admin/deleteGrade', 'admin/createSubject', 'admin/editSubject', 'admin/deleteSubject',
        'admin/editStudent', 'admin/getUsersList', 'admin/getGradesList', 'admin/getSubjectsList',
        'teacher/createMaterial', 'teacher/editMaterial', 'teacher/deleteMaterial', 'teacher/getMaterialsList',
        'admin/getUserById', 'admin/getGradeById', 'admin/getSubjectById', 'admin/getMaterialById', 'admin/searchUser'
    ];
}
