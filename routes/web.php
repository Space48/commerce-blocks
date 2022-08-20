<?php

use App\Http\Controllers\AppController;
use App\Http\Controllers\Bigcommerce\InstallController;
use App\Http\Controllers\Bigcommerce\LoadController;
use App\Http\Controllers\Bigcommerce\ProxyController;
use App\Http\Controllers\BigcommerceStore\BigcommerceStoreCollectionController;
use App\Http\Controllers\BigcommerceStore\BigcommerceStoreViewController;
use App\Http\Controllers\Blocks\BlocksCollectionController;
use App\Http\Controllers\User\UserController;
use Illuminate\Support\Facades\Route;

Route::get('/bc/install', InstallController::class)->name('bc.install');
Route::get('/bc/load', LoadController::class)->name('bc.load');

Route::get('/stores/{store}', AppController::class)->name('store.home');
Route::get('/stores/{store}/installed', AppController::class)->name('store.installed');
Route::get('/stores/{store}/welcome', AppController::class)->name('store.welcome');
Route::get('/account/loggedout', AppController::class)->name('account.loggedout');

Route::get('/blocks', function () {
    return view('frontend');
});

$missing = function (\Illuminate\Http\Request $request) {
    return response()->json(['error' => 'Page not found'], 404);
};
Route::middleware('auth')->group(function () use ($missing) {

    Route::get('/api/stores', BigcommerceStoreCollectionController::class);
    Route::get('/api/users/me', UserController::class);

    Route::middleware('can:view-store,store')->scopeBindings()->group(function () use ($missing) {
        Route::get('/api/stores/{store}', BigcommerceStoreViewController::class)->missing($missing);
        Route::get('/api/stores/{store}/blocks', BlocksCollectionController::class)->missing($missing);

        Route::any('/bc-api/stores/{store}/{endpoint}', ProxyController::class)->where('endpoint', 'v2\/.*|v3\/.*');
    });
});

Route::get('/{url?}', AppController::class)
    ->where('url', '^(?!nova.*$).*')
    ->name('home');
