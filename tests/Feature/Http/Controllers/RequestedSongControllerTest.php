<?php

namespace Http\Controllers;

use App\Models\Company;
use App\Models\RequestedSong;
use App\Models\Song;
use App\Models\Upvote;
use App\Models\User;
use Tests\TestCase;

/**
 * @group Http
 * @group Http.Controllers
 * @group Http.Controllers.RequestedSongController
 */
class RequestedSongControllerTest extends TestCase
{
  public function test_company_requested_song_index(): void
  {
    $company = Company::factory()->create();

    RequestedSong::factory()
      ->for($company)
      ->for(Song::factory()->create())
      ->for(User::factory()->create())
      ->has(
        Upvote::factory()
          ->for(User::factory())
          ->count(3)
      )
      ->create();

    $this
      ->get(route('company.songs', ['company' => $company]))
      ->assertStatus(200)
      ->assertJsonFragment(['upvotes_count' => 3])
      ->assertJsonFragment(['is_upvoted_by' => false]);
  }

  public function test_company_requested_song_upvoted_by(): void
  {
    $authenticatedUser = User::factory()->create();
    $company = Company::factory()->create();

    RequestedSong::factory()
      ->for($company)
      ->for(Song::factory()->create())
      ->for(User::factory()->create())
      ->has(Upvote::factory()->for($authenticatedUser))
      ->create();

    $this
      ->actingAs($authenticatedUser)
      ->get(route('company.songs', ['company' => $company]))
      ->assertStatus(200)
      ->assertJsonFragment(['is_upvoted_by' => true]);
  }
}
