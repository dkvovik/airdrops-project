import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { AirdropService } from '../services/airdrop.service';
import { Airdrop } from '../shared/models/airdrop';

const visitedAirdrop = JSON.parse(localStorage.getItem('visitedAirdrop')) || [];

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  modalRef: BsModalRef;

  airdrops: Airdrop[] = [];
  upcominngAirdrop: Airdrop[] = [];
  activeAirdrop: Airdrop[] = [];
  pastAirdrop: Airdrop[] = [];

  date = new Date();
  today = this.date.getDate();
  yesterday = this.date.getDate() - 1;

  constructor(private modalService: BsModalService,
              private airdropService: AirdropService) {
  }

  ngOnInit() {
    this.getAirdrops();
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  openModalWithComponent(airdrop) {
    const initialState = {...airdrop};
    this.modalRef = this.modalService.show(DetailAirdropComponent, {initialState});
  }

  getAirdrops() {
    this.airdropService.getAirdrops().subscribe(
      (d: any) => {
        this.isTodayOrYesterday(d);
        this.isVisitedAirdrop(d);
        this.airdrops = d;
      },
      (error) => console.log('Error getAirdrops', error)
    );
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

  isVisitedAirdrop(airdrops) {
    airdrops.forEach((a) => {
      console.log('visitedAirdrop', visitedAirdrop);
      if (visitedAirdrop.indexOf(a.tokenName) !== -1) {
        a['isVisited'] = true;
      } else {
        a['isVisited'] = false;
      }
    });
  }
}

@Component({
  selector: 'app-detail-airdrop',
  template: `
    {{tokenName}}
  `
})
export class DetailAirdropComponent implements OnInit {

  tokenName: string;

  constructor(public bsModalRef: BsModalRef) {
  }

  ngOnInit() {
    if (visitedAirdrop.indexOf(this.tokenName) === -1) {
      visitedAirdrop.push(this.tokenName);
    }
    localStorage.setItem('visitedAirdrop', JSON.stringify(visitedAirdrop));
  }
}
