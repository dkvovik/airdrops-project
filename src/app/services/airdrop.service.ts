import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ResponseServer } from '../shared/models/responce';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Airdrop } from '../shared/models/airdrop';
import { Globals } from '../shared/globals';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'multipart/form-data'})
};

@Injectable()
export class AirdropService {

  basicUrl = 'https://crypto-app-test.herokuapp.com';
  /*airdrops: Airdrop[] = [];*/

  airdrops = [
    {
      assetId: 'hjfdsafhkjqkhfjkwenkqjevuh97381fhf1ff8f12',
      commentBlock: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam corporis incidunt laudantium molestiae sapiente vitae voluptas. A corporis error ipsam nulla numquam repellendus reprehenderit velit.',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam corporis incidunt laudantium molestiae sapiente vitae voluptas.',
      economyOfToken: 'economyOfq23m ffToken',
      email: 'mail@mail.ru',
      endDate: ' 5-June-18 11:40:02 UTC',
      estimatedValue: 'estimatedValuefwe',
      howToGetToken: ['fbhealwlwe', 'cveijnrwnr', 'eijnrwji'],
      image: 'https://static.wixstatic.com/media/321ebf_62e7ace2699c408fb8fec58fde72717c~mv2.png',
      platform: 'ETF',
      projectLinks: ['https://twitter.com/webstandards_ru', 'https://www.facebook.com/webstandardsru', 'https://plus.google.com/+Web-standardsRu/posts'],
      projectName: 'projectName',
      rating: 78,
      requirements: ['Twitter', 'Github', 'Email'],
      startDate: 'Friday, 25-May-18 11:40:02 UTC',
      status: 'Active',
      tokenName: 'Bitecoin',
      tokenValue: 142,
      tokensPerClaim: 342,
      totalValue: '430120413',
      website: 'https://www.yandex.ru',
      whitePaperLink: 'whitePaperLink'
    },
    {
      assetId: '7788safhkjqkhfjkwenkqjevuh9rew1fhf1ff8999',
      commentBlock: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam corporis incidunt laudantium molestiae sapiente vitae voluptas. A corporis error ipsam nulla numquam repellendus reprehenderit velit.',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam corporis incidunt laudantium molestiae sapiente vitae voluptas. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam corporis incidunt laudantium molestiae sapiente vitae voluptas.',
      economyOfToken: 'efwjk2 ffToken',
      email: 'test@mail.ru',
      endDate: ' 3-May-18 11:40:02 UTC',
      estimatedValue: 'estimatedValuefwe',
      howToGetToken: ['fbhealwlwe', 'cveijnrwnr', 'eijnrwji', 'eijnrwji'],
      image: 'http://www.economicsgazette.com/wp-content/uploads/DGB.jpg',
      platform: 'HP',
      projectLinks: ['https://www.facebook.com/webstandardsru', 'https://plus.google.com/+Web-standardsRu/posts', 'https://twitter.com/webstandards_ru'],
      projectName: 'ProJECT',
      rating: 22,
      requirements: ['Telegram', 'Email'],
      startDate: 'Friday, 1-May-18 11:40:02 UTC',
      status: 'Past',
      tokenName: 'TELCoin',
      tokenValue: 99,
      tokensPerClaim: 342,
      totalValue: '773217',
      website: 'https://www.yandex.ru',
      whitePaperLink: 'whitePaperLink'
    },
    {
      assetId: '1448safhkjqkhfjkwenkqjevuh9rew1fhf1ff8000',
      commentBlock: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam corporis incidunt laudantium molestiae sapiente vitae voluptas.',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam corporis incidunt laudantium molestiae sapiente vitae voluptas.',
      economyOfToken: 'ffToken',
      email: 'test@mail.ru',
      endDate: '23-June-18 11:40:02 UTC',
      estimatedValue: 'estimatedValue',
      howToGetToken: ['fbhealwlwe', 'cveijnrwnr', 'eijnrwji', 'eijnrwji'],
      image: 'http://www.economicsgazette.com/wp-content/uploads/DGB.jpg',
      platform: 'HP',
      projectLinks: ['https://plus.google.com/+Web-standardsRu/posts', 'https://twitter.com/webstandards_ru'],
      projectName: 'ProJECT',
      rating: 10,
      requirements: ['Telegram', 'Email'],
      startDate: '3-June-18 11:40:02 UTC',
      status: 'Upcoming',
      tokenName: 'TELCoin',
      tokenValue: 12,
      tokensPerClaim: 342,
      totalValue: '773217',
      website: 'https://www.yandex.ru',
      whitePaperLink: 'whitePaperLink'
    }
  ];

  constructor(private http: HttpClient,
              private globals: Globals) { }

  getAirdrops(): any {
    return this.http.get(`${this.basicUrl}/airdrops`)
      .map( (response: any) => {
        console.log('response', response);
        if (response.success === false) {
          throw Observable.throw(response);
        }
        return this.airdrops = response.data;
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

  fileUpload(data): any {
    return this.http.post(`${this.basicUrl}/file/add`, data, httpOptions)
      .map( (response: any) => {
        if (!response.success) {
          throw Observable.throw(response);
        }
        return response.data;
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
