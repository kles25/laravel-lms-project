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
    ];


    protected static function boot()
    {
        parent::boot();

        static::creating(function ($user) {
            $user->user_code = hexdec(substr(md5(Str::random(8)), 0, 8)); // Generate a random alphanumeric code
            // You can adjust the length of the code by changing the parameter in Str::random()
        });
    }

   
   
}
