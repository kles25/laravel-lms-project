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
        return 'user_code';
    }


    /**
     * The primary key for the model.
     *
     * @var string
     */
    protected $primaryKey = 'user_code';
    
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'image',
        'user_code',
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
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
        'user_code' => 'string',
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
            $maxRoleCount = self::where('role', $user->role)->max('user_code');
            $roleCount = $maxRoleCount ? intval(substr($maxRoleCount, -4)) + 1 : 1;

            $sequentialNumber = str_pad($roleCount, 3, '0', STR_PAD_LEFT);

            $user->user_code = $roleCode . '00' . $sequentialNumber;

            // Increment role code based on the count of existing users with the same role
            $user->role_code = sprintf('%02d', $roleCount);
        });
    }
    
   
}
