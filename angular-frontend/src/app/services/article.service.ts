import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticleService 
{

  constructor(private httpClient: HttpClient) { }

  //Fem un post a la api per introduir un article a la BD
  //També fem un get per tal d'obtenir els articles
  publicarArticle(data)
  {
    return this.httpClient.post('https://girohosting.com/index.php/api/publicarArticle', data);
    // return this.httpClient.post('http://localhost:8000/api/publicarArticle', data);
  }

  editarArticle(data){
    return this.httpClient.post('https://girohosting.com/index.php/api/publicarArticle', data);
    // return this.httpClient.post('http://localhost:8000/api/editarArticle', data);
  }

  eliminarArticle(id, language){
    return this.httpClient.delete('https://girohosting.com/index.php/api/eliminarArticle', {
      params: {id, language}
    });
    // return this.httpClient.delete('http://localhost:8000/api/eliminarArticle', {
    //   params: {id, language}
    // });

  }
  obtenirArticles(idioma: string)
  {
    return this.httpClient.get('https://girohosting.com/index.php/api/obtenirArticles', {
      params: {idioma}
    });
    // return this.httpClient.get('http://localhost:8000/api/obtenirArticles', {
    //   params: {idioma}
    // });
  }
}