<?php

use App\Http\Controllers\GoogleController;
use App\Http\Controllers\SpotifyController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/spotify/redirect', [SpotifyController::class, 'redirect']);
Route::get('/spotify/callback', [SpotifyController::class, 'callback'])
    ->name('spotify.callback');
Route::get('/auth/google/redirect', [GoogleController::class, 'redirect']);
Route::get('/auth/google/callback', [GoogleController::class, 'callback'])->name('google.callback');
Route::get('/{any}', fn () => view('home'))->where('any', '.*')
    ->name('front');
