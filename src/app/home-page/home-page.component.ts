import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { AirdropService } from '../services/airdrop.service';
import { Airdrop } from '../shared/models/airdrop';
import { Globals } from '../shared/globals';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  modalRef: BsModalRef;

  airdrops: Airdrop[] = [];
  upcomingAirdrop: Airdrop[] = [];
  activeAirdrop: Airdrop[] = [];
  pastAirdrop: Airdrop[] = [];

  limitAirdrops = '10';

  constructor(private modalService: BsModalService,
              private airdropService: AirdropService,
              private globals: Globals) {
  }

  ngOnInit() {
    this.getAirdrops();
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  getAirdrops() {
    this.getAirdropsUpcoming();
    this.getAirdropsActive();
    this.getAirdropsPast();
  }

  getAirdropsUpcoming() {
    this.airdropService.getAirdropsUpcoming({}, this.limitAirdrops).subscribe(
      res => {
        this.upcomingAirdrop = res.data.airdrops;
        this.airdropService.isVisitedAirdrop(this.upcomingAirdrop);
      },
      error => console.log('error getAirdropsUpcoming', error)
    );
  }

  getAirdropsActive() {
    this.airdropService.getAirdropsActive({}, this.limitAirdrops).subscribe(
      res => {
        this.activeAirdrop = res.data.airdrops;
        this.airdropService.isVisitedAirdrop(this.activeAirdrop);
      },
      error => console.log('error getAirdropsActive', error)
    );
  }

  getAirdropsPast() {
    this.airdropService.getAirdropsPast({}, this.limitAirdrops).subscribe(
      res => {
        this.pastAirdrop = res.data.airdrops;
        this.airdropService.isVisitedAirdrop(this.pastAirdrop);
      },
      error => console.log('error getAirdropsPast', error)
    );
  }
}
