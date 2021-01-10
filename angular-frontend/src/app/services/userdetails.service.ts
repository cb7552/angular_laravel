import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { param } from 'jquery';
@Injectable({
  providedIn: 'root'
})
export class UserdetailsService {
  [x: string]: any;

  constructor(private httpClient: HttpClient, public auth: AuthenticationService) { }

  obtenirDadesUsuari(email) {
    return this.httpClient.get('https://localhost:8000/index.php/api/userDetails', {
      headers: { Authorization: 'bearer ' + this.auth.getToken() },
      params: { email }
    });

    // return this.httpClient.get('http://localhost:8000/api/userDetails', {
    //   headers: {Authorization: 'bearer' +  this.auth.getToken()},
    //   params: {email}
    // });
    // https://girohosting.com/index.php/api/userDetails
    //http://localhost:8000/api/userDetails
  }

  downloadfile() {
    return this.httpClient.get('http://localhost:8000/index.php/api/download',
      {
        headers: { Authorization: 'bearer' + this.auth.getToken() },
      });
  }

  getlogo(id) {
    return this.httpClient.get('http://localhost:8000/index.php/api/getlogo',
      {
        headers: { Authorization: 'bearer' + this.auth.getToken() },
        params: {id},
      });
  }

  client() {
    return this.httpClient.get('http://localhost:8000/index.php/api/getclient',
      {
        headers: { Authorization: 'bearer' + this.auth.getToken() },
      });
  }

  getmycustomer(id) {
    console.log("service getcustomer function")
    return this.httpClient.get('http://localhost:8000/index.php/api/getmycustomer',
      {
        headers: { Authorization: 'bearer' + this.auth.getToken() },
        params: { id },
      });
  }

  worker() {
    return this.httpClient.get('http://localhost:8000/index.php/api/getworker',
      {
        headers: { Authorization: 'bearer' + this.auth.getToken() },
      });
  }

  getprofile(id) {
    return this.httpClient.get('http://localhost:8000/index.php/api/getprofile',
      {
        headers: { Authorization: 'bearer' + this.auth.getToken() },
        params: { id },
      });
  }

  getrole(id) {
    return this.httpClient.get('http://localhost:8000/index.php/api/getrole',
      {
        headers: { Authorization: 'bearer' + this.auth.getToken() },
        params: { id },
      });
  }

  updateProfile(client) {
    return this.httpClient.post('http://localhost:8000/index.php/api/updateProfile', client,
      {
        headers: { Authorization: 'bearer' + this.auth.getToken() },
        // params: {client}}
        //https://girohosting.com/index.php/api/updateProfile
        //http://localhost:8000/api/updateProfile
      });
  }



  logoUpload(formData) {
    return this.httpClient.post('http://localhost:8000/index.php/api/logoUpload', formData,
      {
        headers: { Authorization: 'bearer' + this.auth.getToken() }
      });
  }

  // logoUpload(formData) {
  //   const headers = new HttpHeaders();
  //   headers.append('Content-Type', 'multipart/form-data');
  //   // headers.append('Accept', 'application/json');
  //   return this.httpClient.post('http://localhost:8000/api/logoupload', formData
  //     {
  //       // headers: headers,
  //       headers: { Authorization: 'bearer' + this.auth.getToken() },
  //       // params: {formData}
  //     }
  //     );
  // }

  contractUpdate(formData) {
    return this.httpClient.post('http://localhost:8000/index.php/api/contractUpload', formData,
      {
        headers: { Authorization: 'bearer' + this.auth.getToken() },
        // params: {client}}
        //https://girohosting.com/index.php/api/updateProfile
        //http://localhost:8000/api/updateProfile
      });
  }

  getbudget(id) {
    return this.httpClient.get('http://localhost:8000/index.php/api/getbudget', {
      headers: { Authorization: 'bearer' + this.auth.getToken() },
      params: { id }
    });
    // https://girohosting.com/index.php/api/obtenirPressupostos
    //http://localhost:8000/api/obtenirPressupostos
  }



  getinvoice(id) {
    return this.httpClient.get('http://localhost:8000/index.php/api/obtenirFacturas', {
      headers: { Authorization: 'bearer' + this.auth.getToken() },
      params: { id }
    });
    // https://girohosting.com/index.php/api/obtenirPressupostos
    //http://localhost:8000/api/obtenirPressupostos
  }
  getcontract(id) {
    return this.httpClient.get('http://localhost:8000/index.php/api/obtenirContratos', {
      headers: { Authorization: 'bearer' + this.auth.getToken() },
      params: { id }
    });
    // https://girohosting.com/index.php/api/obtenirPressupostos
    //http://localhost:8000/api/obtenirPressupostos
  }
  // obtenirContratosUsuari(id)
  // {
  //   return this.httpClient.get('http://localhost:8000/index.php/api/obtenirContratos', {
  //       headers: {Authorization: 'bearer' +  this.auth.getToken()},
  //       params: {id}
  //     });
  //   // https://girohosting.com/index.php/api/obtenirPressupostos
  //   //http://localhost:8000/api/obtenirPressupostos
  // }

  budgetUpload(formData) {
    console.log(formData, "formData formData")
    return this.httpClient.post('http://localhost:8000/index.php/api/obtenirContratos', {
      headers: {
        Authorization: 'bearer ' + this.auth.getToken()
      },
      params: { formData }
    });
  }

  delete(id) {
    // console.log(id)
    return this.httpClient.get('http://localhost:8000/index.php/api/delete', {
      headers: { Authorization: 'bearer' + this.auth.getToken() },
      params: { id }
    });
  }
}