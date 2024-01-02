<?php

namespace App\Http\Controllers;

use App\Http\Resources\SongResource;
use App\Models\RequestedSong;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

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
    public function store(RequestedSong $requestedSong): JsonResponse
    {
        $company = auth()->user()->company;
        if ($company->blacklistedSongs->contains($requestedSong->song_id)) {
            return response()->json([
                'message' => 'Cette chanson est déjà dans votre blacklist',
            ], Response::HTTP_BAD_REQUEST);
        }
        $company->blacklistedSongs()->attach($requestedSong->song_id);
        $requestedSong->upvotes()->delete();
        RequestedSong::where('id', $requestedSong->id)->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Cette chanson a été ajoutée dans votre blacklist',
        ]);
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
