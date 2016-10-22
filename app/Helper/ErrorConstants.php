<?php

namespace App\Helper;

class ErrorConstants {

    const REQUIRED_FIELDS_EMPTY = "Required Fields Empty";
    const LOGIN_FAILED = "Invalid Credentials, Login Failed";  
    const USER_NOT_LOGGED_IN = "User not logged in";
    const INVALID_OLD_PASSWORD = "Invalid old password";
    const NO_PRIVILEGE = "No Privilege"; 
    const PASSWORD_RESET_FAILED = "Password Reset Failed";
    
    const USER_CREATION_FAILED = "User Creation Failed";
    const USER_DELETION_FAILED = "User Deletion Failed";
    const STUDENT_EDIT_FAILED = "Student Edit Failed";
    const USER_NOT_FOUND = "User not found";

    const GRADE_CREATION_FAILED = "Grade Creation Failed";
    const GRADE_EDIT_FAILED = "Grade Edit Failed";
    const GRADE_DELETION_FAILED = "Grade Deletion Failed";
    const GRADE_NOT_FOUND = "Grade not found";

    const SUBJECT_CREATION_FAILED = "Subject Creation Failed";
    const SUBJECT_EDIT_FAILED = "Subject Edit Failed";
    const SUBJECT_DELETION_FAILED = "Subject Deletion Failed";
    const SUBJECT_NOT_FOUND = "Subject not found";

    const MATERIAL_CREATION_FAILED = "Material Creation Failed";
    const MATERIAL_EDIT_FAILED = "Material Edit Failed";
    const MATERIAL_DELETION_FAILED = "Material Deletion Failed";
    const MATERIAL_NOT_FOUND = "Material not found";
}