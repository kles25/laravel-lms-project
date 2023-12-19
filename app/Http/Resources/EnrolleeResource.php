<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EnrolleeResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray($request): array
    {
        return [
            'id' => $this->id,
            'full_name' => $this->full_name,
            'date_of_birth' => $this->date_of_birth,
            'gender' => $this->gender,
            'address' => $this->address,
            'phone_number' => $this->phone_number,
            'email' => $this->email,
            'nationality' => $this->nationality,
            'guardian_name' => $this->guardian_name,
            'guardian_relationship' => $this->guardian_relationship,
            'guardian_phone' => $this->guardian_phone,
            'previous_school' => $this->previous_school,
            'grade_completed' => $this->grade_completed,
            'enrolled_at' => $this->created_at->format('Y-m-d H:i:s'),
            'updated_at' => $this->updated_at->format('Y-m-d H:i:s'),
        ];
    }
}
