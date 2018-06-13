import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ResponseServer } from '../../shared/models/responce';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable()
export class AuthService {

  authUrl = 'http://wilix.org:3000/user';
  isLogged = false;
  user = {};

  constructor(private http: HttpClient) { }

  signIn(email, password): Observable<ResponseServer> {
    const data = { email: email, password: password };
    return this.http.post<ResponseServer>(`${this.authUrl}/sign-in`, data)
      .map( response => {
          if (!response.success) {
            throw Observable.throw(response);
          }
          localStorage.setItem('token', response.data.token);
          this.user = response.data.user;
          this.isLogged = true;
          return response;
        }
      );
  }

  signUp(email, password): Observable<ResponseServer> {
    const data = { email: email, password: password };
    return this.http.post<ResponseServer>(`${this.authUrl}/sign-up`, data)
      .map( response => {
          console.log(response);
          if (!response.success) {
            throw Observable.throw(response);
          }
          return response;
        }
      );
  }

  logOut() {
    const token = localStorage.getItem('token');
    return this.http.get(`${this.authUrl}/sign-out`, httpOptions)
      .map( () =>  {
        localStorage.removeItem('token');
        this.isLogged = false;
      });
  }


  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    if (token) {
      return true;
    } else {
      return false;
    }
  }

  getToken(): string {
    return localStorage.getItem('token');
  }

  getUserInfoFromServer(): Observable<ResponseServer> {
    return this.http.get<ResponseServer>(`${this.authUrl}`, httpOptions)
      .map( response => {
          if (!response.success) {
            throw Observable.throw(response);
          }
          return this.user = response.data;
        }
      );
  }

  getUserInfo() {
    return this.user;
  }

}
