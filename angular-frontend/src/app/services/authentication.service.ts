import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UserdetailsService } from '../services/userdetails.service';

export interface UserDetails
{
    nom: string;
    name_alias: string;
    email: string;
    phone: number;
    address: string;
    town: string;
    fk_pays: any;
    fk_departement: any;
    zip: string;
    siren: string;
    password: string;
    exp: number;
    iat: number;
}

interface TokenResponse
{
    token: string;
}

export interface TokenPayload
{
    id: number;
    email: string;
    password: string;
}

@Injectable()
export class AuthenticationService
{
    private token: string;
    
    constructor (private http: HttpClient, private router: Router) {}

    private saveToken(token: string): void
    {
        localStorage.setItem('usertoken', token);
        this.token = token;
    }

    public getToken(): string
    {
        if(!this.token)
        {
            this.token = localStorage.getItem('usertoken');
        }

        return this.token;
    }

    public role(id){
        return this.http.get('http://localhost:8000/index.php/api/get', {
            headers: {Authorization: 'bearer' +  this.getToken()},
            params: {id}
        });
    }

    public getUserDetails(): UserDetails
    {
        const token = this.getToken();
        let payload;
        if(token)
        {
            payload = token.split('.')[1];
            payload = window.atob(payload);
            return JSON.parse(payload);
        }
        else
        {
            return null;
        }
    }

    public isLoggedIn(): boolean
    {
        const user = this.getUserDetails();

        if(user)
        {
            return user.exp > Date.now() / 1000;
        }
        else
        {
            return false;
        }
    }

    public register(user, id): Observable<any>
    {
        user.id = id;
        console.log(user)
        return this.http.post('http://localhost:8000/index.php/api/enregistrarClient', user, {
            
            headers: {Authorization: 'bearer' +  this.getToken()}
        })
        // return this.http.post('http://localhost:8000/api/enregistrarClient', user)
    }
    public update(user, id): Observable<any>
    {
        
        user.id = id;

        console.log(user)
        return this.http.post('http://localhost:8000/index.php/api/updateClient', user, {
            
            headers: {Authorization: 'bearer' +  this.getToken()}
        })
        // return this.http.post('http://localhost:8000/api/enregistrarClient', user)
    }

    

    public login(user: TokenPayload): Observable<any>
    {
        console.log("this is login part")
        const base = this.http.post('http://localhost:8000/index.php/api/login', 
        {email: user.email, password: user.password});
        
        const request = base.pipe(
            map((data: TokenResponse) => {
                if(data.token)
                {
                    this.saveToken(data.token)
                }

                return data;
            })
        )

        //http://localhost:8000/api/login
        //https://girohosting.com/index.php/api/login

        return request;
    }

    public profile(): Observable<any>
    {
        return this.http.get('http://localhost:8000/index.php/api/me', {
            headers: {Authorization: 'bearer' +  this.getToken()}
        });

        // return this.http.get('http://localhost:8000/api/me', {
        //     headers: {Authorization: 'bearer' +  this.getToken()}
        // });
    }
    public logout(): void
    {
        this.token = '';
        window.localStorage.removeItem('usertoken');
        this.router.navigateByUrl('/');
    }
}