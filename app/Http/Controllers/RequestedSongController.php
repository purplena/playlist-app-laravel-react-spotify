<?php

namespace App\Http\Controllers;

use App\Http\Resources\RequestedSongResource;
use App\Models\Company;
use App\Models\RequestedSong;
use Illuminate\Http\Request;

class RequestedSongController extends Controller
{

  /**
   * Display a listing of the resource.
   */
  public function index(Company $company)
  {
    $requestedSongs = $company->requestedSongs()->with('song', 'upvotes')
      ->withCount('upvotes')
      ->whereDate('created_at', today())
      ->orderBy('upvotes_count', 'desc')
      ->get();

    return RequestedSongResource::collection($requestedSongs);
  }

  /**
   * Store a newly created resource in storage.
   */
  public function store(Request $request)
  {
    //
  }

  /**
   * Display the specified resource.
   */
  public function show(RequestedSong $requestedSong)
  {
    return RequestedSongResource::collection($requestedSong);
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(Request $request, RequestedSong $requestedSong)
  {
    //
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(RequestedSong $requestedSong)
  {
    //
  }
}
