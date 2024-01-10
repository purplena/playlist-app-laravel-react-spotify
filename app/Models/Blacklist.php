<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\Pivot;

class Blacklist extends Pivot
{
    protected $table = 'company_song_blacklisted';

    use HasFactory;
}
