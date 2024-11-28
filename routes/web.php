<?php

use App\Http\Controllers\DeceasedListController;
use App\Http\Controllers\IntermentController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ServicesController;
use App\Models\Block;
use App\Models\DeceasedInformation;
use App\Models\DeceasedList;
use App\Models\Lot;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

Route::get('/map', function () {
    $blocks = Block::with("lots.deceasedInformation")->get();
    $lots = Lot::with(['block', 'deceasedInformation'])->get();

    return Inertia::render('Map/Index', [
        'apiKey' => env('GOOGLE_MAP_API_KEY'),
        "deceasedList" => $lots,
        "blocks" => $blocks
    ]);
})->middleware("guest")->name("map");

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->middleware("guest");

Route::get('/dashboard', function () {
    $deceasedInformation = DeceasedInformation::all();
    return Inertia::render('Dashboard', [
        "deceasedList" => $deceasedInformation
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');
Route::resource('/lists-of-deceased', DeceasedListController::class)->middleware(['auth', 'verified']);
Route::resource('/interment',IntermentController::class)->middleware(['auth', 'verified']);
Route::resource('/services', ServicesController::class)->middleware(['auth', 'verified']);

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
