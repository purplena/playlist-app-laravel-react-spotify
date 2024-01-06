<?php

namespace App\Http\Controllers;

use App\Http\Resources\SongResource;
use App\Models\Blacklist;
use App\Models\RequestedSong;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\JsonResource;

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
    public function store(RequestedSong $requestedSong): void
    {
        $company = auth()->user()->company;
        $company->blacklistedSongs()->attach($requestedSong->song_id);
        $requestedSong->upvotes()->delete();
        RequestedSong::where('id', $requestedSong->id)->delete();
    }

    public function storeAll(): void
    {
        $company = auth()->user()->company;
        $requestedSongs = $company->requestedSongs;

        $requestedSongs
            ->each(function ($requestedSong) use ($company) {
                $company->blacklistedSongs()->attach($requestedSong->song_id);
            })
            ->each(function ($requestedSong) {
                $requestedSong->upvotes()->whereDate('created_at', today())->delete();
            });

        $company->requestedSongs()->whereDate('created_at', today())->delete();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Blacklist $blacklist): JsonResponse
    {
        $blacklist->delete();

        return response()->json();
    }

    public function destroyAll(): JsonResponse
    {
        auth()->user()->company->blacklistedSongs()->detach();

        return response()->json();
    }
}
