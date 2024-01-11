<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class AddUser extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'user:add {user_name} {password} {role}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Add a new user to the database';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $user_name = $this->argument('user_name');
        $password = $this->argument('password');
        $role = $this->argument('role');

         // Determine role code based on the role
        switch ($role) {
            case 'admin':
                $roleCode = '01';
                break;
            case 'teacher':
                $roleCode = '02';
                break;
            case 'student':
                $roleCode = '03';
                break;
            default:
                $roleCode = '00'; // Default value or handle other cases as needed
                break;
        }

         // Find the maximum role_code for the specific role
         $maxRoleCount = DB::table('users')->where('role', $role)->max('id');
         $roleCount = $maxRoleCount ? intval(substr($maxRoleCount, -4)) + 1 : 1;
         
         $sequentialNumber = str_pad($roleCount, 3, '0', STR_PAD_LEFT);
         
         $userCode = $roleCode . '00' . $sequentialNumber;
         
         // Increment role code based on the count of existing users with the same role
         $roleCode = sprintf('%02d', $roleCount);

        // Hash the password
        $hashedPassword = Hash::make($password);

        // Insert the user into the database with the hashed password
        DB::table('users')->insert([
            'user_name' => $user_name,
            'password' => $hashedPassword,
            'id' => $userCode,
            'role' => $role,
            'role_code' => $roleCode, // You can set this value here if needed
            'display_name' => null, // If needed, handle image URL here
            'email' => null, // If needed, handle image URL here
            'phone_number' => null, // If needed, handle image URL here
            'address' => null, // If needed, handle image URL here
            'image' => null, // If needed, handle image URL here
            'remember_token' => null, // Handle remember token here if needed
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $this->info('User added successfully!');
    }
}
