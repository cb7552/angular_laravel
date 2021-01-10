import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CallService 
{

  constructor(private httpClient: HttpClient) { }

  //Fem un post a la api
  enviarCorreuTrucar(data)
  {
    return this.httpClient.post('https://girohosting.com/index.php/api/enviarCorreuTrucar', data);
    // return this.httpClient.post('/index.php/api/enviarCorreuTrucar', data);
  }
}