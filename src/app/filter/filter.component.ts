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

  minTokenValue = 0;
  maxTokenValue = 100;
  stepTokenValue = 1;
  twoWayRangeTokenValue = [10, 30];

  minRating = 0;
  maxRating = 100;
  stepRating = 1;
  twoWayRangeRating = [0, 100];


  constructor(private airdropService: AirdropService) { }

  ngOnInit() {
    this.getAirdrops();
    setTimeout(() => {
      console.log('this.airdrops', this.airdrops);
    }, 5000);
  }


  changed() {
    this.twoWayRangeTokenValue = [...this.twoWayRangeTokenValue];
  }

  changedRating() {
    this.twoWayRangeRating = [...this.twoWayRangeRating];
  }

  clearFormFilter() {
    /******/
  }


  getAirdrops() {
    this.airdropService.getAirdrops().subscribe(
      (d: any) => this.airdrops = d,
      (error)  => {
        console.log('Error ' , error);
      });
  }

}
