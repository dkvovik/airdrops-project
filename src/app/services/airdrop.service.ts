import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ResponseServer } from '../shared/models/responce';
import { HttpClient } from '@angular/common/http';
import { Airdrop } from '../shared/models/airdrop';
import { Globals } from '../shared/globals';

@Injectable()
export class AirdropService {

  basicUrl = 'http://wilix.org:3000';
  /*basicUrl = 'http://10.1.1.155:3000';*/
  /*basicUrl = 'http://10.1.1.12:3001';*/
  /*basicUrl = 'http://localhost:3000';*/
  airdrops: Airdrop[] = [];

  date = new Date();
  today = this.date.getDate();
  yesterday = this.date.getDate() - 1;

  constructor(private http: HttpClient,
              private globals: Globals) { }

  getAirdrops(): any {
    return this.http.get(`${this.basicUrl}/airdrops`)
      .map( (response: any) => {
        if (response.success === false) {
          throw Observable.throw(response);
        }
        this.airdrops = response.data.airdrops;
        this.isVisitedAirdrop(this.airdrops);
        this.isTodayOrYesterday(this.airdrops);
        return this.airdrops;
      });
  }

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

  getAirdropsSource() {
    this.getAirdrops();
    this.isVisitedAirdrop(this.airdrops);
    return this.airdrops;
  }

  getSourceAirdrops() {
    if (!this.airdrops) {
      this.getAirdrops();
    } else {
      return this.airdrops;
    }
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
      } else if (startDate === this.yesterday) {
        a['yesterday'] = true;
      }
    });
  }

}
