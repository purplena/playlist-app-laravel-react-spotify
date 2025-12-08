<?php

namespace App\Rules;

use App\Models\Company;
use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class NotBlacklisted implements ValidationRule
{
    private Company $company;

    public function __construct(Company $company)
    {
        $this->company = $company;
    }

    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if ($this->company->blacklistedSongs()->pluck('spotify_id')->contains($value)) {
            $fail(trans('validation.not_blacklisted'));
        }
    }
}
