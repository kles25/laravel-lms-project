<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\UserResource;

class BatchResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'batch_name' => $this->batch_name,
            'course_id' => $this->course_id,
            'teacher_user_id' => $this->teacher_user_id,
            'students' => UserResource::collection($this->whenLoaded('students')),
        ];
    }
}
