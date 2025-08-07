// Transaction list with search, filter, pagination
Route::get('/transactions', [App\Http\Controllers\TransactionController::class, 'index']);
<?php

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



use App\Http\Controllers\AuthController;
use App\Http\Controllers\COGSController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\TransactionController;

Route::post('/login', [AuthController::class, 'login']);
Route::post('/forgot-password', [AuthController::class, 'forgotPassword']);
Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{productId}/cogs', [COGSController::class, 'index']);

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/products/{productId}', [ProductController::class, 'show']);
    Route::post('/products', [ProductController::class, 'store']);
    Route::put('/restock/{productId}', [ProductController::class, 'restock']);
    Route::put('/products/{productId}', [ProductController::class, 'update']);
    
    Route::get('/transactions', [TransactionController::class, 'index']);
});

