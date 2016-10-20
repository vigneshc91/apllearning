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
}