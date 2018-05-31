import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { Globals } from '../shared/globals';
import { Airdrop } from '../shared/models/airdrop';
import { AirdropService } from '../services/airdrop.service';

@Component({
  selector: 'app-detail-info',
  templateUrl: './detail-info.component.html',
  styleUrls: ['./detail-info.component.scss']
})
export class DetailInfoComponent implements OnInit {

  @Input() modalRef: BsModalRef;
  @Input() airdrop: Airdrop;

  constructor(private globals: Globals,
              private airdropService: AirdropService) {
  }

  ngOnInit() {
    if (this.globals.visitedAirdrop.indexOf(this.airdrop.tokenName) === -1) {
      this.globals.visitedAirdrop.push(this.airdrop.tokenName);
    }
    localStorage.setItem('visitedAirdrop', JSON.stringify(this.globals.visitedAirdrop));
  }

  ratingUp() {
    if (this.globals.voitedRatingUp.indexOf(this.airdrop._id) !== -1) {
      return false;
    }
    this.airdropService.ratingUp(this.airdrop._id).subscribe(
      result => {
        console.log('result', result);

        this.globals.voitedRatingUp.push(this.airdrop._id);
        localStorage.setItem('voitedRatingUp', JSON.stringify(this.globals.voitedRatingUp));
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
        console.log('result', result);

        this.globals.voitedRatingDown.push(this.airdrop._id);
        localStorage.setItem('voitedRatingDown', JSON.stringify(this.globals.voitedRatingDown));
      },
      error => console.log('ratingDown error', error)
    );
  }
}
