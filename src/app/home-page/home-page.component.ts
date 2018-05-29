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

  date = new Date();
  today = this.date.getDate();
  yesterday = this.date.getDate() - 1;

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
    this.airdropService.getAirdrops().subscribe(
      (d: any) => {
        this.airdrops = d;
        this.isTodayOrYesterday(this.airdrops);
        this.sortByStatus(this.airdrops);
      },
      (error) => console.log('Error getAirdrops', error)
    );
  }

  getAirdropsSource() {
    this.airdrops  = this.airdropService.getAirdropsSource();
    this.sortByStatus(this.airdrops);
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

  sortByStatus(airdrops) {
    airdrops.forEach((a) => {
      switch (a.status) {
        case('Upcoming'): {
          this.upcomingAirdrop.push(a);
          break;
        }
        case('Active'): {
          this.activeAirdrop.push(a);
          break;
        }
        case('Past'): {
          this.pastAirdrop.push(a);
          break;
        }
      }
    });
  }

  addAirdrop() {
    this.upcomingAirdrop = [];
    this.activeAirdrop = [];
    this.pastAirdrop = [];
    this.getAirdrops();
  }
}
