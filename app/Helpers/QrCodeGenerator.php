<?php

namespace App\Helpers;

use tbQuar\Facades\Quar;

class QrCodeGenerator
{
    public static function generate(string $companySlug): string
    {
        $url = route('front', ['any' => $companySlug]);

        return Quar::format('svg')->size(300)->generate($url);
    }
}
