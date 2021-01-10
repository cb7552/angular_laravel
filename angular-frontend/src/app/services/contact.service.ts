import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactService 
{

  constructor(private httpClient: HttpClient) { }

  //Fem un post a la api per introduir un client a la BD
  enviarCorreuContacte(data)
  {
    return this.httpClient.post('https://girohosting.com/index.php/api/enviarCorreuContacte', data);
  }
}