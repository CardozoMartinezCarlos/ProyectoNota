<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::resource('/usuarios','UserController');
//Route::post('/login', [AuthController::class, "login"])->name('login');
Route::post('/login','AuthController@login')->name('login');
Route::post('/register','AuthController@register')->name('register');

Route::resource('/notas','NotaController');

Route::resource('/etiquetas','EtiquetasController');
Route::resource('/items','ItemsController');
Route::resource('/notaetiqueta','NotaEtiquetasController');

Route::post('/BuscarNota','NotaController@BuscarNota')->name('notas.BuscarNota');
Route::get('/indexNota','NotaEtiquetasController@indexNota')->name('notas.indexNota');
Route::post('/BuscarEtiqueta','NotaEtiquetasController@BuscarEtiqueta')->name('notas.BuscarEtiqueta');

Route::get('/notaIdCreador/{id}','NotaController@notaIdCreador')->name('notas.notaIdCreador');
Route::get('/notaId/{id}','NotaController@notaId')->name('notas.notaId');



