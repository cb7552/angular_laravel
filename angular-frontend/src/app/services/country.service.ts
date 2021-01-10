import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CountryService 
{

  constructor(private httpClient: HttpClient) { }

  //Obtenim el paisos de la API del backend
  obtenirPaisos()
  {
    return this.httpClient.get('http://localhost:8000/index.php/api/obtenirPaisos');
    //https://girohosting.com/index.php/api/obtenirPaisos
    //http://localhost:8000/api/obtenirPaisos
  }
}