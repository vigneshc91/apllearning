<?php

use Illuminate\Database\Seeder;

use App\User;
use App\Helper\AppConstants;

class CreateSuperAdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $isSuperAdminExist = User::where('user_type', AppConstants::userType['SuperAdmin'])->count();
        
        if($isSuperAdminExist == 0){
            User::create([
                'user_name' => AppConstants::SUPER_ADMIN_USER_NAME,
                'password' => bcrypt(Appconstants::SUPER_ADMIN_PASSWORD),
                'user_type' => Appconstants::userType['SuperAdmin'],
                'status' => Appconstants::userStatus['Approved']
            ]);
        }
    }
}
