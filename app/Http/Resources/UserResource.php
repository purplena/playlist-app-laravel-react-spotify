<?php

namespace App\Http\Resources;

use App\Http\Resources\CompanyResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
  /**
   * Transform the resource collection into an array.
   *
   * @return array<int|string, mixed>
   */
  public function toArray(Request $request): array
  {
    return [
      'id' => $this->id,
      'email' => $this->email,
      'username' => $this->username,
      'role' => $this->role,
      'company' => CompanyResource::make($this->whenLoaded('company')),
    ];
  }
}
