<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\EnrolleeController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\StudentsController;
use App\Http\Controllers\Api\CourseController;
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

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/signout', [AuthController::class, 'signout']);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::apiResource('/users', UserController::class);
    Route::apiResource('/enrollees', EnrolleeController::class);
    Route::apiResource('/students', StudentsController::class);
    Route::apiResource('/courses', CourseController::class);
});

Route::post ('/signup', [AuthController::class, 'signup']);
Route::post ('/signin', [AuthController::class, 'signin']);
Route::post ('/enrollees', [EnrolleeController::class, 'store']);
