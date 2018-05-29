import { Component, OnInit, TemplateRef } from '@angular/core';
import { AirdropService } from '../services/airdrop.service';
import { Airdrop } from '../shared/models/airdrop';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { Globals } from '../shared/globals';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  airdrops: Airdrop[];
  sourceAirdrops: Airdrop[];

  minTokenValue = 0;
  maxTokenValue = 0;
  stepTokenValue = 1;
  twoWayRangeTokenValue = [0, 0];


  minRating = 0;
  maxRating = 0;
  stepRating = 1;
  twoWayRangeRating = [0, 0];

  requirements = [];

  modalRef: BsModalRef;

  currentAirdrop: Airdrop;


  constructor(private airdropService: AirdropService,
              private modalService: BsModalService,
              private globals: Globals) { }

  ngOnInit() {
    this.getAirdrops();
  }

  initFilterValue() {
    this.minTokenValue = this.getMinTokenValue();
    this.maxTokenValue = this.getMaxTokenValue();
    this.twoWayRangeTokenValue = [this.minTokenValue, this.maxTokenValue];

    this.minRating = this.getMinRating();
    this.maxRating = this.getMaxRating();
    this.twoWayRangeRating = [this.minRating, this.maxRating];
  }

  getAirdrops() {
    this.airdropService.getAirdrops().subscribe(
      (d: any) => {
        this.sourceAirdrops = d;
        this.initFilterValue();
      },
      (error) => console.log('Error getAirdrops', error)
    );
  }

  changed() {
    this.twoWayRangeTokenValue = [...this.twoWayRangeTokenValue];
  }

  changedRating() {
    this.twoWayRangeRating = [...this.twoWayRangeRating];
  }

  clearFormFilter() {
    this.twoWayRangeTokenValue = [this.minTokenValue, this.maxTokenValue];
    this.twoWayRangeRating = [this.minRating, this.maxRating];

    let checkboxes = document.querySelectorAll('.button-filter-wrapper input');
  }

  getFilteredAirdrops(requirements, tokenValue, rating) {
    this.airdrops = this.airdropService.getFilteredAirdrops(this.requirements, tokenValue, rating);
  }

  toggleRequirements(value) {
    if (this.requirements.indexOf(value) === -1) {
      this.requirements.push(value);
    } else {
      this.requirements.splice(this.requirements.indexOf(value), 1);
    }
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  getMinTokenValue() {
    const airdropWithMinTokenValue = this.sourceAirdrops.reduce(
      (prev, cur) => {
        if (!cur.tokenValue) {
          cur.tokenValue = 0;
        }
        return cur.tokenValue < prev.tokenValue ? cur : prev; }, {tokenValue: Infinity}
      );
    return airdropWithMinTokenValue.tokenValue;
  }

  getMaxTokenValue() {
    const airdropWithMaxTokenValue = this.sourceAirdrops.reduce(
      (prev, cur) => {
        if (!cur.tokenValue) {
          cur.tokenValue = 0;
        }
        return cur.tokenValue > prev.tokenValue ? cur : prev; }, {tokenValue: -Infinity}
      );
    return airdropWithMaxTokenValue.tokenValue;
  }

  getMinRating() {
    const airdropWithMinRating = this.sourceAirdrops.reduce(
      (prev, cur) => {
        if (!cur.rating) {
          cur.rating = 0;
        }
        return cur.rating < prev.rating ? cur : prev; }, {rating: Infinity}
      );
    return airdropWithMinRating.rating;
  }

  getMaxRating() {
    const airdropWithMaxRating = this.sourceAirdrops.reduce(
      (prev, cur) => {
        if (!cur.rating) {
          cur.rating = 0;
        }
        return  cur.rating > prev.rating ? cur : prev; }, {rating: -Infinity});
    return airdropWithMaxRating.rating;
  }

}
