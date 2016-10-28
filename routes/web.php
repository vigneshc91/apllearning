<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| This file is where you may define all of the routes that are handled
| by your application. Just tell Laravel the URIs it should respond
| to using a Closure or controller method. Build something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

//post request

Route::post('user/login', 'UserController@login');

Route::post('user/logout', 'UserController@logout');

Route::post('user/changePassword', 'UserController@changePassword');

Route::post('user/getLoggedInUser', 'UserController@getLoggedInUser');

Route::post('superAdmin/createUser', 'SuperAdminController@createUser');

Route::post('superAdmin/resetPassword', 'SuperAdminController@resetPassword');

Route::post('superAdmin/deleteUser', 'SuperAdminController@deleteUser');

Route::post('admin/editStudent', 'AdminController@editStudent');

Route::post('admin/getUserById', 'AdminController@getUserById');

Route::post('admin/getGradeById', 'AdminController@getGradeById');

Route::post('admin/getSubjectById', 'AdminController@getSubjectById');

Route::post('admin/getMaterialById', 'AdminController@getMaterialById');

Route::post('admin/createGrade', 'AdminController@createGrade');

Route::post('admin/editGrade', 'AdminController@editGrade');

Route::post('admin/deleteGrade', 'AdminController@deleteGrade');

Route::post('admin/getGradesList', 'AdminController@getGradesList');

Route::post('admin/createSubject', 'AdminController@createSubject');

Route::post('admin/editSubject', 'AdminController@editSubject');

Route::post('admin/deleteSubject', 'AdminController@deleteSubject');

Route::post('admin/getSubjectsList', 'AdminController@getSubjectsList');

Route::post('admin/getUsersList', 'AdminController@getUsersList');

Route::post('teacher/createMaterial', 'TeacherController@createMaterial');

Route::post('teacher/editMaterial', 'TeacherController@editMaterial');

Route::post('teacher/deleteMaterial', 'TeacherController@deleteMaterial');

Route::post('teacher/getMaterialsList', 'TeacherController@getMaterialsList');

// get request

Route::get('superAdmin/dashboard', 'SuperAdminController@dashboard');

Route::get('user/changePassword', 'UserController@password');

Route::get('user/logout', 'UserController@userLogout');

Route::get('admin/dashboard', 'AdminController@dashboard');

Route::get('admin/student', 'AdminController@student');

Route::get('admin/grade', 'AdminController@grade');

Route::get('admin/subject', 'AdminController@subject');

Route::get('teacher/dashboard', 'TeacherController@dashboard');

Route::get('teacher/student', 'TeacherController@student');

Route::get('teacher/subject', 'TeacherController@subject');
