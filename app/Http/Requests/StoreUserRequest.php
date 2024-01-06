<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class StoreUserRequest extends FormRequest
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
        $rules = [
            'image' => 'nullable|string',
            'role' => 'required|in:admin,teacher,student',
        ];

        // Check if 'role' is 'student' to skip validation for 'user_name' and 'password'
        if ($this->has('role') && $this->input('role') !== 'student') {
            $rules['user_name'] = 'required|string|unique:users,user_name';
            $rules['password'] = [
                'required',
                Password::min(8)
                    ->letters()
                    ->numbers()
            ];
        }

        return $rules;
    }
}
