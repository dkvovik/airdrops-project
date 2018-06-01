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
        this.airdrops = d.data.airdrops;
        this.airdropService.isVisitedAirdrop(this.airdrops);
        this.airdropService.isTodayOrYesterday(this.airdrops);
        this.sortByStatus(this.airdrops);
      },
      (error) => console.log('Error getAirdrops HomePageComponent', error)
    );
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

}
