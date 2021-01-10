import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DepartementService 
{

  constructor(private httpClient: HttpClient) { }

  //Obtenim les provincies de la API del backend
  obtenirProvincies()
  {
    return this.httpClient.get('http://localhost:8000/index.php/api/obtenirProvincies');
    // https://girohosting.com/index.php/api/obtenirProvincies
    //http://localhost:8000/api/obtenirProvincies
  }
}