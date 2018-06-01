import { Component, Input, OnInit, TemplateRef } from '@angular/core';
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

  filteredAirdrops: Airdrop[];
  sourceAirdrops: Airdrop[];

  minTokenValue = 0;
  selectedMinTokenValue;
  maxTokenValue = 1;
  selectedMaxTokenValue;
  stepTokenValue = 1;
  twoWayRangeTokenValue = [0, 1];

  minRating = 0;
  selectedMinRating;
  maxRating = 1;
  selectedMaxRating;
  stepRating = 1;
  twoWayRangeRating = [0, 1];

  initFilterValues = false;

  requirements = [];
  selectedRequirements;

  modalRef: BsModalRef;

  currentAirdrop: Airdrop;

  isInit = false;
  showData = false;

  constructor(private airdropService: AirdropService,
              private modalService: BsModalService,
              private globals: Globals) { }

  ngOnInit() {
    this.getAirdrops();
  }

  initFilterValue(minToken, maxToken, minRating, maxRating) {
    if (minToken) {
      this.minTokenValue = minToken;
    }
    if (maxToken) {
      this.maxTokenValue = maxToken;
    }

    if (minRating) {
      this.minRating = minRating;
    }
    if (maxRating) {
      this.maxRating = maxRating;
    }

    this.getSelectedFilterValue();
    this.twoWayRangeTokenValue = [this.selectedMinTokenValue, this.selectedMaxTokenValue];
    this.twoWayRangeRating = [this.selectedMinRating, this.selectedMaxRating];

    this.initFilterValues = true;
  }

  getAirdrops() {
    this.airdropService.getAirdrops().subscribe(
      (response: any) => {
        this.sourceAirdrops = response.data.airdrops;
        this.airdropService.isVisitedAirdrop(this.sourceAirdrops);
        this.initFilterValue(response.data.tokenValueMin, response.data.tokenValueMax, response.data.ratingMin, response.data.ratingMax);
        this.isInit = true;
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
      checkboxes[i]['checked'] = false;
    }
  }

  getFilteredAirdrops() {
    this.showData = true;
    this.filteredAirdrops = this.filterAirdrops(this.requirements, this.twoWayRangeTokenValue, this.twoWayRangeRating);
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

  refreshAirdrops() {
    this.initFilterValues = false;
    this.sourceAirdrops = [];
    this.getAirdrops();
  }

  getSelectedFilterValue() {
    this.selectedMinTokenValue = localStorage.getItem('selectedMinTokenValue') || this.minTokenValue;
    this.selectedMaxTokenValue = localStorage.getItem('selectedMaxTokenValue') || this.maxTokenValue;
    this.selectedMinRating = localStorage.getItem('selectedMinRating') || this.minRating;
    this.selectedMaxRating = localStorage.getItem('selectedMaxRating') || this.maxRating;
    this.selectedRequirements = JSON.parse(localStorage.getItem('selectedRequirements')) || [];

    if (this.selectedRequirements.length !== 0) {
      const checkboxes = <NodeListOf<HTMLInputElement>> document.querySelectorAll('.button-filter-wrapper input');
      for (let k = 0; k < this.selectedRequirements.length; ++k) {
        for (let i = 0; i < checkboxes.length; ++i) {
          if (checkboxes[i]['name'] === this.selectedRequirements[k]) {
            checkboxes[i]['checked'] = true;
          }
        }
      }
      this.requirements = this.selectedRequirements;
    }
  }

}
