<?php

namespace App\Http\DTO;

class PlaylistDataDTO
{
    public static function fromObjectToArray(object $playlist): array
    {
        return [
            'id' => $playlist->id,
            'href' => $playlist->href,
            'snapshot_id' => $playlist->snapshot_id,
        ];
    }
}
