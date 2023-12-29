<?php

use App\Http\Controllers\SpotifyController;
use App\Models\Company;
use App\Services\SpotifyApi;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Route;
use SpotifyWebAPI\Session;
use SpotifyWebAPI\SpotifyWebAPI;




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
Route::get('/{any}', fn () => view('home'))->where('any', '.*')
  ->name('front');
