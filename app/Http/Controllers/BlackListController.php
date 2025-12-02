<?php

namespace App\Http\Controllers;

use App\Http\Resources\SongResource;
use App\Models\Blacklist;
use App\Models\RequestedSong;
use App\Models\Upvote;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Response;

class BlackListController extends Controller
{
    public function __construct()
    {
        $this->authorizeResource(Blacklist::class, 'blacklist');
    }

    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResource
    {
        $company = auth()->user()->company;
        $blacklistedSongs = $company->blacklistedSongs()->get();

        return SongResource::collection($blacklistedSongs);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(RequestedSong $requestedSong): JsonResponse
    {
        $company = auth()->user()->company;
        $company->blacklistedSongs()->attach($requestedSong->song_id);
        $requestedSong->upvotes()->delete();
        RequestedSong::where('id', $requestedSong->id)->delete();

        return response()->json(['status' => 'ok'], Response::HTTP_OK);
    }

    public function storeAll(): JsonResponse
    {
        $company = auth()->user()->company;
        $requestedSongs = $company->requestedSongs()
            ->whereDate('created_at', today())
            ->get(['id', 'song_id']);

        $songIds = $requestedSongs->pluck('song_id');
        $requestedSongIds = $requestedSongs->pluck('id');

        $company->blacklistedSongs()->attach($songIds);

        Upvote::whereIn('requested_song_id', $requestedSongIds)
            ->whereDate('created_at', today())
            ->delete();

        $company->requestedSongs()->whereDate('created_at', today())->delete();

        return response()->json(['status' => 'ok'], Response::HTTP_OK);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Blacklist $blacklist): JsonResponse
    {
        $blacklist->delete();

        return response()->json(['status' => 'ok'], Response::HTTP_OK);
    }

    public function destroyAll(): JsonResponse
    {
        auth()->user()->company->blacklistedSongs()->detach();

        return response()->json(['status' => 'ok'], Response::HTTP_OK);
    }
}
