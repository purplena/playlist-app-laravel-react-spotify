<?php

namespace Tests\Feature\Http\Controllers;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class CompanyControllerTest extends TestCase
{
  /**
   * A basic feature test example.
   */
  public function test_company_index(): void
  {
    $this->get('/companies')
      ->assertStatus(200)
      ->assertJsonStructure(['data']);
  }
}
