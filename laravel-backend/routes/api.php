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
// header("Access-Control-Allow-Origin", "*");
// header('Access-Control-Allow-Credentials: true');
// header('Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE');

// Route::post('logoUpload', 'PropalController@logoUpload');
Route::post('logoUpload', 'PropalController@logoUpload');
Route::get('getlogo', 'PropalController@getlogo');
Route::get('download', 'ClientController@download');
Route::post('contractUpload', 'PropalController@contractUpload');
Route::get('delete', 'PropalController@delete');


Route::middleware(['api'])->group(function ($router) 
{
    Route::post('login', 'AuthController@login')->name('login');
    // Route::post('logout', 'AuthController@logout');
    Route::post('refresh', 'AuthController@refresh');
    Route::get('me', 'AuthController@me');

    Route::get('getclient','PropalController@getclient');
    Route::get('getmycustomer','ClientController@getmycustomer');
    Route::get('getworker','PropalController@getworker');
    Route::get('getprofile', 'ClientController@getprofile');

    Route::get('userDetails', 'ClientController@getUser');
    Route::get('getrole', 'ClientController@getrole');
    Route::post('updateProfile', 'ClientController@updateUserProfile');

    Route::get('getbudget', 'PropalController@getPropals');
    Route::get('obtenirContratos', 'PropalController@getContrat');
    Route::get('obtenirFacturas', 'PropalController@getFact');
    
    
});


// Route::post('enregistrarClient', 'ClientController@test');
Route::post('enregistrarClient', 'ClientController@enregistrarClient');
Route::post('updateClient', 'ClientController@updateClient');
Route::post('enviarCorreuContacte', 'ContactController@mailToGirohosting');
Route::post('enviarCorreuTrucar', 'ContactController@clientWantCall');
Route::post('publicarArticle', 'ArticleController@publicarArticleNou');
Route::post('editarArticle', 'ArticleController@editarInfoArticle');
Route::delete('eliminarArticle', 'ArticleController@eliminardadesArticle');

Route::get('obtenirPaisos', 'CountryController@getCountries');
Route::get('obtenirProvincies', 'DepartementController@getDepartement');
Route::get('obtenirArticles', 'ArticleController@obtenirArticles');