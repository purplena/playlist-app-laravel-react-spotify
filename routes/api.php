<?php

use App\Http\Controllers\BlackListController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\RequestedSongController;
use App\Http\Middleware\IsManager;
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

    Route::group(['middleware' => IsManager::class], function () {
        Route::get('/manager/blacklist', [BlackListController::class, 'index']);
        Route::delete('/manager/blacklist/destroy/{blacklist}', [BlackListController::class, 'destroy']);
        Route::delete('/manager/blacklist/destroy', [BlackListController::class, 'destroyAll']);
        Route::post('/manager/blacklist/store/{requestedSong}', [BlackListController::class, 'store']);
        Route::post('/manager/blacklist/store', [BlackListController::class, 'storeAll']);
        Route::delete('/manager/songs/destroy/{requestedSong}', [RequestedSongController::class, 'destroy']);
        Route::delete('/manager/songs/destroy', [RequestedSongController::class, 'destroyAll']);
        Route::get('/manager/qr-code', [CompanyController::class, 'downloadQrCode']);
        Route::put('/manager/update', [CompanyController::class, 'update']);
    });
});

Route::get('/{company}/songs', [RequestedSongController::class, 'index'])
    ->name('company.songs');
Route::get('/{company}/show', [CompanyController::class, 'show']);
Route::get('/{company}/songs/search', [RequestedSongController::class, 'search']);
Route::post('/user/login', [LoginController::class, 'authenticate']);
Route::post('/user/register', [RegisterController::class, 'store']);
Route::post('/user/logout', [LoginController::class, 'logout']);
Route::post('/manager/register', [RegisterController::class, 'storeCompany']);
