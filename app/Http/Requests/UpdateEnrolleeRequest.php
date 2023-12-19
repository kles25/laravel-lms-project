<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateEnrolleeRequest extends FormRequest
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
            'full_name' => 'required|string',
            'date_of_birth' => 'required|date',
            'gender' => 'required|in:male,female,other',
            'address' => 'required|string',
            'phone_number' => 'required|string',
            'email' => 'required|email',
            'nationality' => 'required|string',
            'guardian_name' => 'required|string',
            'guardian_relationship' => 'required|string',
            'guardian_phone' => 'required|string',
            'previous_school' => 'required|string',
            'grade_completed' => 'required|integer',
        ];
    }
}
