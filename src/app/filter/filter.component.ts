import { Component, OnInit } from '@angular/core';
import { AirdropService } from '../services/airdrop.service';
import { Airdrop } from '../shared/models/airdrop';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  airdrops: Airdrop[] = [];
  constructor(private airdropService: AirdropService) { }

  ngOnInit() {
    this.getAirdrops();
    setTimeout(() => {
      console.log('this.airdrops', this.airdrops);
    }, 5000);
  }

  getAirdrops() {
    this.airdropService.getAirdrops().subscribe(
      (d: any) => this.airdrops = d,
      (error)  => {
        console.log('Error ' , error);
      });
  }

}
