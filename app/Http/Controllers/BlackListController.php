<?php

namespace App\Http\Controllers;

use App\Http\Resources\SongResource;
use App\Models\Blacklist;
use App\Models\Company;
use Illuminate\Http\Request;

class BlackListController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index()
  {
    $company = auth()->user()->company;
    $blacklistedSongs = $company->blacklistedSongs()->get();

    return SongResource::collection($blacklistedSongs);
  }

  /**
   * Store a newly created resource in storage.
   */
  public function store(Request $request)
  {
    //
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(Request $request)
  {
    $company = auth()->user()->company;
    $company->blacklistedSongs()->detach($request->blacklistedSongId);

    return response()->json(['message' => 'Cette chanson a été supprimée!', 'status' => 'deleted']);
  }
}
