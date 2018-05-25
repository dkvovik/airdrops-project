import { Injectable } from '@angular/core';

@Injectable()
export class Globals {
  visitedAirdrop = JSON.parse(localStorage.getItem('visitedAirdrop')) || [];

  voitedRatingPlus = JSON.parse(localStorage.getItem('voitedRatingPlus')) || [];
  voitedRatingMinus = JSON.parse(localStorage.getItem('voitedRatingMinus')) || [];
}
