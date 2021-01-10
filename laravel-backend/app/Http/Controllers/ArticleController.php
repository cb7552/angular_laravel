<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\ArticleCat;
use App\ArticleEsp;

class ArticleController extends Controller {

    //Funció per publicar un article nou
    public function publicarArticleNou(Request $request) 
    {
        if($request->language == "cat")
        {
            $article = new ArticleCat(); 
            $article->title_article = $request->title1; 
            $article->descripcio1 = $request->description1;
            $article->content = $request->content; 
            $article->categoria = $request->categoria;
            $article->img = $request->img;

            $article->save();

            return response()->json(['success' => 'article en catala publicat correctament'], 200); 
        }
        elseif($request->language == "esp")
        {
            $article = new ArticleEsp();
            $article->title_article = $request->title1; 
            $article->descripcio1 = $request->description1;
            $article->content = $request->content; 
            $article->categoria = $request->categoria;
            $article->img = $request->img;

            $article->save();

            return response()->json(['success' => 'article en castella publicat correctament'], 200); 
        }

        
    }

    public function editarInfoArticle(Request $request){
        if($request->language == "cat")
        {
            //Separem els ids de la request
            $articleid = $request->id;
   

            //Actualitzem les dades de la taula users
            ArticleCat::where('id', $articleid)->update(array('title_article' => $request->title1, 'descripcio1' => $request->description1, 'content' => $request->content, 'categoria' => $request->categoria, 'img' => $request->img));
            $article = ArticleCat::where('id', $articleid)->first();
            $article->touch();
            
            //Retornem que tot ok
            return response()->json(['msg' => 'Article actualitzat correctament'], 200);
        }
        elseif($request->language == "esp")
        {
            //Separem els ids de la request
            $articleid = $request->id;
   

            //Actualitzem les dades de la taula users
            ArticleEsp::where('id', $articleid)->update(array('title_article' => $request->title1, 'descripcio1' => $request->description1, 'content' => $request->content, 'categoria' => $request->categoria, 'img' => $request->img));
            $article = ArticleEsp::where('id', $articleid)->first();
            $article->touch();
            

            //Retornem que tot ok
            return response()->json(['msg' => 'Article actualitzat correctament'], 200);
        }
    }

    public function eliminardadesArticle(Request $request)
    {
        if($request->language == "cat")
        {
            //Separem els ids de la request
            $articleid = $request->id;
   

            //Eliminar l'article
            $article = ArticleCat::where('id', $articleid)->first();
            $article->delete();

            //Retornem que tot ok
            return response()->json(['msg' => 'Article borrat correctament'], 200);
        }
        elseif($request->language == "esp")
        {
            //Separem els ids de la request
            $articleid = $request->id;
   

            //Eliminar l'article
            $article = ArticleEsp::where('id', $articleid)->first();
            $article->delete();
        

            //Retornem que tot ok
            return response()->json(['msg' => 'Articulo borrado correctamente'], 200);
        }
    }

    public function obtenirArticles(Request $request)
    {
        if($request->idioma == "CAT")
        {
            return ArticleCat::all();
        }
        else if($request->idioma == "ESP")
        {
            return ArticleEsp::all();
        }
        else if($request->idioma == 'tots')
        {
            $articles[] = ArticleEsp::all();
            $articles[] = ArticleCat::all();
            return response()->json($articles);

        }
    }
    
}