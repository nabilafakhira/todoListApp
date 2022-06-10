<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\TodoListController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});



Route::get('/tasks',[TaskController::class, 'getTaskList'])->name('task.list');
Route::get('/task/{id}',[TaskController::class, 'getTaskDetail']);
Route::post('/store/task',[TaskController::class, 'storeTask']);
Route::post('/update/task',[TaskController::class, 'updateTask']);
Route::delete('/delete/task/{task}',[TaskController::class, 'deleteTask']);
Route::post('task/{task}',[TaskController::class, 'markAsCompleted']);
Route::get('/todos/{id}',[TodoListController::class, 'getTodoList'])->name('todo.list');
Route::get('/todo/{id}',[TodoListController::class, 'getTodoDetail']);
Route::post('/store/todo',[TodoListController::class, 'storeTodo']);
Route::post('/update/todo',[TodoListController::class, 'updateTodo']);
Route::delete('/delete/todo/{todo}',[TodoListController::class, 'deleteTodo']);
Route::post('todo/{todo}',[TodoListController::class, 'markAsCompleted']);
Route::get('coba',[TaskController::class, 'test']);