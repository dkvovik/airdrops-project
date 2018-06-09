import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { Globals } from '../shared/globals';
import { Airdrop } from '../shared/models/airdrop';
import { AirdropService } from '../services/airdrop.service';
import { Requirement } from '../shared/models/requirement';

@Component({
  selector: 'app-detail-info',
  templateUrl: './detail-info.component.html',
  styleUrls: ['./detail-info.component.scss']
})
export class DetailInfoComponent implements OnInit {

  @Input() modalRef: BsModalRef;
  @Input() airdrop: Airdrop;

  @Output() votedRating: EventEmitter<any> = new EventEmitter();

  currentRequirement: Requirement;

  estimatedValue = null;

  constructor(private globals: Globals,
              private airdropService: AirdropService) {
  }

  ngOnInit() {
    if (this.globals.visitedAirdrop.indexOf(this.airdrop.tokenName) === -1) {
      this.globals.visitedAirdrop.push(this.airdrop.tokenName);
    }
    localStorage.setItem('visitedAirdrop', JSON.stringify(this.globals.visitedAirdrop));
    this.getEstimateValue();
  }

  ratingUp() {
    if (this.globals.voitedRatingUp.indexOf(this.airdrop._id) !== -1) {
      return false;
    }
    this.airdropService.ratingUp(this.airdrop._id).subscribe(
      result => {
        this.airdrop.rating += 1;
        this.globals.voitedRatingUp.push(this.airdrop._id);
        localStorage.setItem('voitedRatingUp', JSON.stringify(this.globals.voitedRatingUp));
        this.votedRating.emit();
      },
      error => console.log('ratingUp error', error)
    );
  }

  ratingDown() {
    if (this.globals.voitedRatingDown.indexOf(this.airdrop._id) !== -1) {
      return false;
    }
    this.airdropService.ratingDown(this.airdrop._id).subscribe(
      result => {
        this.airdrop.rating -= 1;
        this.globals.voitedRatingDown.push(this.airdrop._id);
        localStorage.setItem('voitedRatingDown', JSON.stringify(this.globals.voitedRatingDown));
        this.votedRating.emit();
      },
      error => console.log('ratingDown error', error)
    );
  }

  isVoted() {
    if (this.globals.voitedRatingDown.indexOf(this.airdrop._id) !== -1 || this.globals.voitedRatingUp.indexOf(this.airdrop._id) !== -1) {
      return true;
    }
  }

  getEstimateValue() {
    this.airdropService.getEstimateValue(this.airdrop.assetId).subscribe(
      responseList => {
        this.estimatedValue = responseList[0]['24h_vwap'] * responseList[1]['24h_vwap'];
      },
      error => {
        this.estimatedValue = null;
      }
    );
  }
}
