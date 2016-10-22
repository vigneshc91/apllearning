<?php

namespace App\Helper;

class AppConstants {
    
    const userType = array(
        'SuperAdmin' => 1,
        'Admin' => 2,
        'Teacher' => 3,
        'Student' => 4
    );

    const userStatus = array(
        'Pending' => 0,
        'Approved' => 1
    );

    const SUPER_ADMIN_USER_NAME = "admin123";
    const SUPER_ADMIN_PASSWORD = "admin123";

    const USERS_START_VALUE = 0;
    const USERS_SIZE_VALUE = 10;

    const GRADES_START_VALUE = 0;
    const GRADES_SIZE_VALUE = 10;

    const SUBJECTS_START_VALUE = 0;
    const SUBJECTS_SIZE_VALUE = 10;

    const MATERIALS_START_VALUE = 0;
    const MATERIALS_SIZE_VALUE = 10;
}