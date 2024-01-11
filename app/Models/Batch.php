<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Course;
use App\Models\User;

class Batch extends Model
{
    use HasFactory;

    protected $fillable = [
        'batch_name',
        'course_id',
        'teacher_user_id',
    ];

    public function course()
    {
        return $this->belongsTo(Course::class);
    }

    public function teacher()
    {
        return $this->belongsTo(User::class, 'teacher_user_id');
    }
    
    public function students()
    {
        return $this->belongsToMany(User::class, 'batch_student', 'batch_id', 'student_user_id');
    }
}
