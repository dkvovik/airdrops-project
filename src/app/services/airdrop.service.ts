import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ResponseServer } from '../shared/models/responce';
import { HttpClient } from '@angular/common/http';
import { Airdrop } from '../shared/models/airdrop';

@Injectable()
export class AirdropService {

  basicUrl = 'https://crypto-app-test.herokuapp.com';
  airdrops: Airdrop[] = [];

  constructor(private http: HttpClient) { }

  getAirdrops(): Observable<ResponseServer> {
    return this.http.get(`${this.basicUrl}/airdrops`)
      .map( (response: any) => {
        if (response.success === false) {
          throw Observable.throw(response);
        }
        return this.airdrops = response.data;
      });
  }

  addAirdrop(data): Observable<ResponseServer> {
    return this.http.post(`${this.basicUrl}/airdrop/add`, data)
      .map( (response: any) => {
        if (response.success === false) {
          throw Observable.throw(response);
        }
        return response;
      });
  }

}
