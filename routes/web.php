<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

// Route::get('/', function () {
//     return Inertia::render('welcome', [
//         'canRegister' => Features::enabled(Features::registration()),
//     ]);
// })->name('home');

// Route::middleware(['auth', 'verified'])->group(function () {
//     Route::get('dashboard', function () {
//         return Inertia::render('dashboard');
//     })->name('dashboard');
// });

Route::get('/', function () {
    return Inertia::render('home/index');
})->name('homepage');

Route::get('/collection', function () {
    return Inertia::render('collection/index');
})->name('collectionpage');

Route::get('/about', function () {
    return Inertia::render('about/index');
})->name('aboutpage');

Route::get('/contact', function () {
    return Inertia::render('contact/index');
})->name('contactpage');

// Route::get('/home', function () {
//     return Inertia::render('homepage', [
//         'canRegister' => Features::enabled(Features::registration()),
//     ]);
// })->name('home');

require __DIR__ . '/settings.php';
