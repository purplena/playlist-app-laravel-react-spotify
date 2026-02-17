<?php

namespace App\Helpers;

use tbQuar\Facades\Quar;

class QrCodeGenerator
{
    public static function generate(string $companySlug): string
    {
        $url = route('front', ['any' => $companySlug]);

        return Quar::format('png')->size(300)->generate($url);
    }
}
