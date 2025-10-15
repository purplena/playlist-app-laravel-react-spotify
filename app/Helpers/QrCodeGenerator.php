<?php

namespace App\Helpers;

use SimpleSoftwareIO\QrCode\Facades\QrCode;

class QrCodeGenerator
{
    public static function generate(string $companySlug): string
    {
        $url = route('front', ['any' => $companySlug.'/home']);

        return QrCode::format('png')->size(300)->generate($url);
    }
}
