import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ResponseServer } from '../shared/models/responce';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Airdrop } from '../shared/models/airdrop';
import { Globals } from '../shared/globals';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class AirdropService {

  basicUrl = 'http://wilix.org:3000';
  /*basicUrl = 'http://10.1.1.12:3000';*/

  airdrops: Airdrop[] = [];

  date = new Date();
  today = this.date.getDate();
  yesterday = this.date.getDate() - 1;

  constructor(private http: HttpClient,
              private globals: Globals) { }

  addAirdrop(data): Observable<ResponseServer> {
    return this.http.post(`${this.basicUrl}/airdrop/add`, data)
      .map( (response: any) => {
        if (!response.success) {
          throw Observable.throw(response);
        }
        this.airdrops.push(response.data);
        return response.data;
      });
  }

  updateAirdrop(data): Observable<ResponseServer> {
    return this.http.post(`${this.basicUrl}/airdrop/update`, data)
      .map( (response: any) => {
        if (!response.success) {
          throw Observable.throw(response);
        }
        return response.data;
      });

  }

  getAirdrops(data = {}, status = ''): Observable<ResponseServer> {
    if (!status) {
      return this.http.post(`${this.basicUrl}/airdrops-verified`, data, httpOptions)
        .map( (response: any) => {
          if (response.success === false) {
            throw Observable.throw(response);
          }
          return response;
        });
    } else {
      return this.http.post(`${this.basicUrl}/airdrops/${status}`, data, httpOptions)
        .map( (response: any) => {
          if (response.success === false) {
            throw Observable.throw(response);
          }
          return response;
      });
    }
  }

  getFilterValueMinMax(status = ''): any {
    return this.http.get(`${this.basicUrl}/airdrop/values?status=${status}`)
      .map( (response: any) => {
        if (response.success === false) {
          throw Observable.throw(response);
        }
        return response;
      });
  }

  ratingUp(id): any {
    return this.http.get(`${this.basicUrl}/airdrop/ratingUp?id=${id}`)
      .map( (response: any) => {
        if (response.success === false) {
          throw Observable.throw(response);
        }
        return response;
      });
  }

  ratingDown(id): any {
    return this.http.get(`${this.basicUrl}/airdrop/ratingDown?id=${id}`)
      .map( (response: any) => {
        if (response.success === false) {
          throw Observable.throw(response);
        }
        return response;
      });
  }

  isVisitedAirdrop(airdrops) {
    airdrops.forEach((a) => {
      if (this.globals.visitedAirdrop.indexOf(a.tokenName) !== -1) {
        a['isVisited'] = true;
      } else {
        a['isVisited'] = false;
      }
    });
  }

  isTodayOrYesterday(airdrops) {
    airdrops.forEach((a) => {
      const startDate = new Date(a.startDate).getDate();
      if (startDate === this.today) {
        a['today'] = true;
        a['yesterday'] = false;
      } else if (startDate === this.yesterday) {
        a['yesterday'] = true;
        a['today'] = false;
      } else {
        a['today'] = false;
        a['yesterday'] = false;
      }
    });
  }

  getAirdropsUpcoming(data = {}, limit = '') {
    return this.http.post(`${this.basicUrl}/airdrops/upcoming?limit=${limit}`, data)
      .map( (response: any) => {
        if (response.success === false) {
          throw Observable.throw(response);
        }
        return response;
      });
  }

  getAirdropsActive(data = {}, limit = '') {
    return this.http.post(`${this.basicUrl}/airdrops/active?limit=${limit}`, data)
      .map( (response: any) => {
        if (response.success === false) {
          throw Observable.throw(response);
        }
        return response;
      });
  }

  getAirdropsPast(data = {}, limit = '') {
    return this.http.post(`${this.basicUrl}/airdrops/past?limit=${limit}`, data)
      .map( (response: any) => {
        if (response.success === false) {
          throw Observable.throw(response);
        }
        return response;
      });
  }

  getEstimateValue(term): any {
    const assedIdToWaves =  this.http.get(`https://marketdata.wavesplatform.com/api/ticker/${term}/WAVES`)
      .map( (response: any) => {
        if (response.status === 'error') {
          throw Observable.throw(response);
        }
        return response;
      });

    const wavesToUSD =  this.http.get(`https://marketdata.wavesplatform.com/api/ticker/WAVES/USD`)
      .map( (response: any) => {
        if (response.status === 'error') {
          throw Observable.throw(response);
        }
        return response;
      });

    return Observable.forkJoin([assedIdToWaves, wavesToUSD]);
  }

}
