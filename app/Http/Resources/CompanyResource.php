<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Arr;

class CompanyResource extends JsonResource
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
      'name' => $this->name,
      'spotify_playlist_data' => $this->when($this->spotify_playlist_data !== null, function () {
        return [
          'id' => Arr::get($this->spotify_playlist_data, 'playlist.id'),
          'name' => Arr::get($this->spotify_playlist_data, 'playlist.name'),
          'href' => Arr::get($this->spotify_playlist_data, 'playlist.href'),
          'has_refresh_token' => Arr::get($this->spotify_playlist_data, 'refresh_token') ? true : false
        ];
      }),
      'tel' => $this->tel,
      'zip' => $this->zip,
      'country' => $this->country,
      'city' => $this->city,
      'address' => $this->address,
      'qr_code' => $this->qr_code,
      'logo' => $this->logo
    ];
  }
}
