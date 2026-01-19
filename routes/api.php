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

    Route::group(['prefix' => 'manager', 'middleware' => IsManager::class], function () {
        Route::get('/blacklist', [BlackListController::class, 'index']);
        Route::delete('/blacklist/destroy/{blacklist}', [BlackListController::class, 'destroy']);
        Route::delete('/blacklist/destroy', [BlackListController::class, 'destroyAll']);
        Route::post('/blacklist/store/{requestedSong}', [BlackListController::class, 'store']);
        Route::post('/blacklist/store', [BlackListController::class, 'storeAll']);
        Route::delete('/songs/destroy/{requestedSong}', [RequestedSongController::class, 'managerDestroy']);
        Route::delete('/songs/destroyAll', [RequestedSongController::class, 'managerDestroyAll']);
        Route::get('/qr-code', [CompanyController::class, 'downloadQrCode']);
        Route::put('/update', [CompanyController::class, 'update']);
    });

    Route::post('/{company}/songs/{requestedSong}/upvote', [RequestedSongController::class, 'upvote']);
    Route::post('/{company}/songs', [RequestedSongController::class, 'store']);
    Route::delete('/{company}/songs/{spotifyId}', [RequestedSongController::class, 'destroy']);
});

Route::get('/{company}/songs', [RequestedSongController::class, 'index'])
    ->name('company.songs');
Route::get('/{company}/show', [CompanyController::class, 'show']);
Route::get('/{company}/songs/search', [RequestedSongController::class, 'search']);
Route::post('/user/login', [LoginController::class, 'authenticate']);
Route::post('/user/register', [RegisterController::class, 'store']);
Route::post('/user/logout', [LoginController::class, 'logout']);
Route::post('/manager/register', [RegisterController::class, 'storeCompany']);
