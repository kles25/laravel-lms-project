<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Students extends Model
{
    use HasFactory;

    protected $fillable = [
        'full_name',
        'date_of_birth',
        'gender',
        'address',
        'phone_number',
        'email',
        'nationality',
        'guardian_name',
        'guardian_relationship',
        'guardian_phone',
        'previous_school',
        'grade_completed',
        'enrolled_at',
    ];
   
}
