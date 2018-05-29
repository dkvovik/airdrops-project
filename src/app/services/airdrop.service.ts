import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ResponseServer } from '../shared/models/responce';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Airdrop } from '../shared/models/airdrop';
import { Globals } from '../shared/globals';

const httpOptions = {
  // headers: new HttpHeaders({ 'Content-Type': 'multipart/form-data'})
};

@Injectable()
export class AirdropService {

  /*basicUrl = 'http://wilix.org:7878';*/
  /*basicUrl = 'http://10.1.1.155:3000';*/
  basicUrl = 'http://localhost:3000';
  airdrops: Airdrop[] = [];

  constructor(private http: HttpClient,
              private globals: Globals) { }

  getAirdrops(): any {
    return this.http.get(`${this.basicUrl}/airdrops`)
      .map( (response: any) => {
        console.log('response', response);
        if (response.success === false) {
          throw Observable.throw(response);
        }
        this.airdrops = response.data;
        this.isVisitedAirdrop(this.airdrops);
        return this.airdrops;
      });
  }

  addAirdrop(data): Observable<ResponseServer> {
    return this.http.post(`${this.basicUrl}/airdrop/add`, data)
      .map( (response: any) => {
        if (!response.success) {
          throw Observable.throw(response);
        }
        return response;
      });
  }

  getAirdropById(id): Observable<ResponseServer> {
    return this.http.get(`${this.basicUrl}/airdrop/getById?id=${id}`)
      .map( (response: any) => {
        if (!response.success) {
          throw Observable.throw(response);
        }
        return response.data;
      });
  }

  getAirdropsSource() {
    this.getAirdrops();
    this.isVisitedAirdrop(this.airdrops);
    return this.airdrops;
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

  getFilteredAirdrops(searchRequirements = null, tokenValue, rating) {
    let filteredAirdrops = this.airdrops;

    const minToken = tokenValue[0];
    const maxToken = tokenValue[1];
    filteredAirdrops = filteredAirdrops.filter( (a) => a.tokenValue >= minToken && a.tokenValue <= maxToken);

    if (filteredAirdrops) {
      const minRating = rating[0];
      const maxRating = rating[1];
      filteredAirdrops = filteredAirdrops.filter( (a) => a.rating >= minRating && a.rating <= maxRating);
    }

    let filteredAirdropsAfterRequirements = [];

    if (!searchRequirements) {
      return filteredAirdrops;
    } else {
      if (filteredAirdrops) {
        filteredAirdrops.forEach( (a) => {
          let flag = true;
          for (let i = 0; i < searchRequirements.length; i++) {
            if (a.requirements.indexOf(searchRequirements[i]) === -1) {
              flag = false;
            }
          }
          if (flag) {
            filteredAirdropsAfterRequirements.push(a);
          }
        });
      }
      return filteredAirdropsAfterRequirements;
    }
  }

  getMinTokenValue() {
    const airdropWithMinTokenValue = this.airdrops.reduce(
      (prev, cur) => cur.tokenValue < prev.tokenValue ? cur : prev , {tokenValue: Infinity});
    return airdropWithMinTokenValue.tokenValue;
  }

  getMaxTokenValue() {
    const airdropWithMaxTokenValue = this.airdrops.reduce((prev, cur) => cur.tokenValue > prev.tokenValue ? cur : prev , {tokenValue: -Infinity});
    return airdropWithMaxTokenValue.tokenValue;
  }

  getMinRating() {
    const airdropWithMinRating = this.airdrops.reduce(
      (prev, cur) => cur.rating < prev.rating ? cur : prev , {rating: Infinity});
    return airdropWithMinRating.rating;
  }

  getMaxRating() {
    const airdropWithMaxRating = this.airdrops.reduce((prev, cur) => cur.rating > prev.rating ? cur : prev , {rating: -Infinity});
    return airdropWithMaxRating.rating;
  }
}
