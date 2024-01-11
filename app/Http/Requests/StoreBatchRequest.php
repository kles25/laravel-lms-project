<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreBatchRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'batch_name' => 'required|string',
            'course_id' => 'required|exists:courses,id',
            'teacher_user_id' => 'required|exists:users,id',
            'students' => 'required|array', // Assuming students are submitted as an array
            'students.*' => 'exists:users,id', // Assuming each student ID exists in the users table
        ];
    }
}
