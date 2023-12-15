<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

class AddUser extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'user:add {name} {email} {password} {user_code} {role}';

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
        $name = $this->argument('name');
        $email = $this->argument('email');
        $password = $this->argument('password');
        $user_code = $this->argument('user_code');
        $role = $this->argument('role');

        // Hash the password
        $hashedPassword = Hash::make($password);

        // Insert the user into the database with the hashed password
        DB::table('users')->insert([
            'name' => $name,
            'email' => $email,
            'password' => $hashedPassword,
            'user_code' => $user_code,
            'role' => $role,
            // Other columns...
        ]);

        $this->info('User added successfully!');
    }
}
