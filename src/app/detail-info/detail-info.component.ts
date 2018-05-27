import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { Globals } from '../shared/globals';
import { Airdrop } from '../shared/models/airdrop';

@Component({
  selector: 'app-detail-info',
  templateUrl: './detail-info.component.html',
  styleUrls: ['./detail-info.component.scss']
})
export class DetailInfoComponent implements OnInit {

  @Input() modalRef: BsModalRef;
  @Input() airdrop: Airdrop;

  constructor(private globals: Globals) {
  }

  ngOnInit() {
    if (this.globals.visitedAirdrop.indexOf(this.airdrop.tokenName) === -1) {
      this.globals.visitedAirdrop.push(this.airdrop.tokenName);
    }
    localStorage.setItem('visitedAirdrop', JSON.stringify(this.globals.visitedAirdrop));
  }
}
