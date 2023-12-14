<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\URL;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    public static $wrap = false;
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'user_code' => $this->user_code,
            'name' => $this->name,
            'email' => $this->email,
            'role' => $this->role,
            'image_url' => $this->image ? URL::to($this->image) : null,
            'created_at' => $this->created_at->format('Y-m-d H:i:s'),
        ];

        if ($this->admin) {
            $data['role'] = 'admin';
        } elseif ($this->teacher) {
            $data['role'] = 'teacher';
        } elseif ($this->student) {
            $data['role'] = 'student';
        }

        return $data;
    }
}
