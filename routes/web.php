<?php

use App\Http\Controllers\MovieController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('auth/login');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    Route::prefix('data-movies')->controller(MovieController::class)->group(function(){
        Route::get('/', 'index');
        Route::post('/', 'store');
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
