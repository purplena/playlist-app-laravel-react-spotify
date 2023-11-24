<?php

namespace Database\Seeders;

use App\Models\Company;
use App\Models\User;
use Illuminate\Database\Seeder;

class CompanySeeder extends Seeder
{
  /**
   * Run the database seeds.
   */
  public function run(): void
  {
    /* CASE 1 : Old but gold */
    // for ($i = 0; $i < 2; $i++) {
    //   $company = Company::factory()->create();

    //   User::factory([
    //     'company_id' => $company->id
    //   ])->owner()->create();
    // }

    /* CASE 2: Simple magic */

    Company::factory()
      ->has(User::factory()->owner())
      ->count(10)
      ->create();

    // Company::factory()->count(2)->create();
    // User::factory()->owner()->create();
  }
}
