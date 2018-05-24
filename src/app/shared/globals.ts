import { Injectable } from '@angular/core';

@Injectable()
export class Globals {
  visitedAirdrop = JSON.parse(localStorage.getItem('visitedAirdrop')) || [];
}
