<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CourseResource extends JsonResource
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
            'courseName' => $this->courseName,
            'units' => $this->units, // Assuming units are stored as JSON
            'updated_at' => $this->updated_at->format('Y-m-d H:i:s'),
        ];
    }
}
