<?php

namespace App\Http\Resources;

use App\Http\Resources\SongResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\UpvoteResource;

class RequestedSongResource extends JsonResource
{

  /**
   * Transform the resource into an array.
   *
   * @return array<string, mixed>
   */
  public function toArray(Request $request): array
  {
    return [
      'id' => $this->id,
      'song' => SongResource::make($this->whenLoaded('song')),
      // 'upvotes' => UpvoteResource::collection($this->whenLoaded('upvotes')),
      'upvotes_count' => $this->upvotes_count,
      'company_id' => $this->company_id,
      'created_at' => $this->created_at,
      'is_upvoted_by' => $this->whenLoaded('upvotes', function() use ($request) {
          return $this->hasVoted($request->user());
      })
    ];
  }
}
