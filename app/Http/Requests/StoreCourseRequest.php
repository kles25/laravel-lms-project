<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreCourseRequest extends FormRequest
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
            'courseName' => 'required|string',
            'units' => 'required|array', // Assuming units should be an array
            'units.*.unitTitle' => 'required|string',
            'units.*.unitDetails' => 'required|string',
            'units.*.topics' => 'required|array',
            'units.*.topics.*' => 'string', // Assuming topics should be an array of strings
        ];
    }
}
