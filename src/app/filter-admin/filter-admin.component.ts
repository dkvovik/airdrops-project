import { Component, OnInit, TemplateRef } from '@angular/core';
import { AirdropService } from '../services/airdrop.service';
import { Airdrop } from '../shared/models/airdrop';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { Globals } from '../shared/globals';

@Component({
  selector: 'app-filter-admin',
  templateUrl: './filter-admin.component.html',
  styleUrls: ['./filter-admin.component.scss']
})
export class FilterAdminComponent implements OnInit {

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
    this.requirements = [];
    const checkboxes = <NodeListOf<HTMLInputElement>> document.querySelectorAll('.button-filter-wrapper input');
    for (let i = 0; i < checkboxes.length; ++i) {
      checkboxes[i].checked = false;
    }
  }

  getFilteredAirdrops(requirements, tokenValue, rating) {
    this.airdrops = this.filterAirdrops(this.requirements, tokenValue, rating);
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

  filterAirdrops(searchRequirements = [], tokenValue, rating) {
    this.getAirdrops();
    let filteredAirdrops = this.sourceAirdrops;

    const minToken = tokenValue[0];
    const maxToken = tokenValue[1];
    filteredAirdrops = filteredAirdrops.filter( (a) => a.tokenValue >= minToken && a.tokenValue <= maxToken);

    if (filteredAirdrops) {
      const minRating = rating[0];
      const maxRating = rating[1];
      filteredAirdrops = filteredAirdrops.filter( (a) => a.rating >= minRating && a.rating <= maxRating);
    }

    let filteredAirdropsAfterRequirements = [];

    if (searchRequirements.length === 0) {
      return filteredAirdrops;
    } else {
      if (filteredAirdrops) {
        filteredAirdrops.forEach( (a) => {
          let flag = true;
          for (let i = 0; i < searchRequirements.length; i++) {
            if (a.requirements.indexOf(searchRequirements[i]) === -1) {
              flag = false;
              break;
            }
          }
          if (flag) {
            filteredAirdropsAfterRequirements.push(a);
          }
        });
      }
      return filteredAirdropsAfterRequirements;
    }
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