<?php

use App\Http\Controllers\CompanyController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\RequestedSongController;
use Illuminate\Http\Request;
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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
  return $request->user();
});

Route::get('/companies', [CompanyController::class, 'index']);
Route::get('/companies/{company}', [CompanyController::class, 'show']);
Route::get('/{company}/songs', [RequestedSongController::class, 'index'])
  ->name('company.songs');
Route::get('/{company}/songs/search', [RequestedSongController::class, 'search']);
Route::post('/{company}/songs/{requestedSong}/upvote', [RequestedSongController::class, 'upvote']);
Route::post('/user/login', [LoginController::class, 'authenticate']);
Route::post('/user/logout', [LoginController::class, 'logout']);
Route::post('/user/me', [LoginController::class, 'me']);
Route::post('/user/register', [RegisterController::class, 'store']);
