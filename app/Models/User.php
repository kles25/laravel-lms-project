<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Support\Str;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    public function getRouteKeyName() {
        return 'id';
    }


    /**
     * The primary key for the model.
     *
     * @var string
     */
    protected $primaryKey = 'id';
    
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_name',
        'password',
        'email',
        'display_name',
        'phone_number',
        'address',
        'image',
        'id',
        'role',
        'role_code',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'password' => 'hashed',
        'id' => 'string',
        'role_code' => 'string',
    ];


    protected static function boot()
    {
        parent::boot();

        static::creating(function ($user) {
            $roleCode = '';
            switch ($user->role) {
                case 'admin':
                    $roleCode = '01';
                    break;
                case 'teacher':
                    $roleCode = '02';
                    break;
                case 'student':
                    $roleCode = '03';
                    break;
                // Add more cases for other roles if needed
            }

            // Find the maximum sequential number for the role
            $maxRoleCount = self::where('role', $user->role)->max('id');
            $roleCount = $maxRoleCount ? intval(substr($maxRoleCount, -4)) + 1 : 1;

            $sequentialNumber = str_pad($roleCount, 3, '0', STR_PAD_LEFT);

            $user->id = $roleCode . '00' . $sequentialNumber;

            // Increment role code based on the count of existing users with the same role
            $user->role_code = sprintf('%02d', $roleCount);

            // Generate user_name based on role code pattern only if the role is 'student'
            if ($user->role === 'student') {
                $userName = 'STDNT' . $roleCount;
                $user->user_name = $userName;

                $user->password = $userName;
            }
        });
    }
}
