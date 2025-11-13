<?php

use App\Http\Controllers\Api\MobilController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function () {
    // Mobil endpoints
    Route::get('/mobils', [MobilController::class, 'index']);
    Route::get('/mobils/{id}', [MobilController::class, 'show']);
    Route::get('/mobils-merks', [MobilController::class, 'getMerks']);
});
