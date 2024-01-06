<?php

use App\Http\Controllers\BlackListController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\RequestedSongController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user/me', [LoginController::class, 'me']);
    Route::post('/{company}/songs/{requestedSong}/upvote', [RequestedSongController::class, 'upvote']);
    Route::post('/{company}/songs/{spotifyId}/store', [RequestedSongController::class, 'store']);

    Route::group([], function () {
        Route::get('/manager/blacklist', [BlackListController::class, 'index']);
        Route::post('/manager/blacklist/destroy/{blacklistedSongId}', [BlackListController::class, 'destroy']);
        Route::post('/manager/blacklist/destroy', [BlackListController::class, 'destroyAll']);
        Route::post('/manager/songs/store/{requestedSong}', [BlackListController::class, 'store']);
        Route::post('/manager/songs/store', [BlackListController::class, 'storeAll']);
        Route::post('/manager/songs/destroy/{requestedSong}', [RequestedSongController::class, 'destroy']);
        Route::post('/manager/songs/destroy', [RequestedSongController::class, 'destroyAll']);
    });
});

// Route::get('/companies', [CompanyController::class, 'index']);
// Route::get('/companies/{company}', [CompanyController::class, 'show']);

Route::get('/{company}/songs', [RequestedSongController::class, 'index'])
    ->name('company.songs');
Route::get('/{company}/songs/search', [RequestedSongController::class, 'search']);
Route::post('/user/login', [LoginController::class, 'authenticate']);
Route::post('/user/register', [RegisterController::class, 'store']);
Route::post('/user/logout', [LoginController::class, 'logout']);
Route::post('/manager/register', [RegisterController::class, 'storeCompany']);
