<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('batches', function (Blueprint $table) {
            $table->id();
            $table->string('batch_name');
            $table->foreignId('course_id')->constrained('courses');
            $table->unsignedBigInteger('teacher_user_id')->index(); // Assuming id is an unsigned bigint
            $table->timestamps();
            
            // Foreign key constraint referencing id in the users table
            $table->foreign('teacher_user_id')->references('id')->on('users');
        });

        Schema::create('batch_student', function (Blueprint $table) {
            $table->foreignId('batch_id')->constrained('batches');
            $table->unsignedBigInteger('student_user_id')->index(); // Assuming id is an unsigned bigint
            
            // Foreign key constraint referencing id in the users table
            $table->foreign('student_user_id')->references('id')->on('users');
            
            $table->primary(['batch_id', 'student_user_id']);
        });
    }

    public function down()
    {
        Schema::dropIfExists('batch_student');
        Schema::dropIfExists('batches');
    }
};