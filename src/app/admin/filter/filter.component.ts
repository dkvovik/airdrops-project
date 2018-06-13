import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { AirdropService } from '../services/airdrop.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { Globals } from '../shared/globals';
import { Airdrop } from '../../shared/models/airdrop';
import { DataFilter } from '../../shared/models/dataFilter';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  airdrops: Airdrop[] = [];

  minTokenValue = 0;
  selectedMinTokenValue;
  maxTokenValue = 0;
  selectedMaxTokenValue;
  stepTokenValue = 1;
  twoWayRangeTokenValue = [0, 0];

  minRating = 0;
  selectedMinRating;
  maxRating = 0;
  selectedMaxRating;
  stepRating = 1;
  twoWayRangeRating = [0, 0];

  initFilterValues = false;

  filterData: DataFilter = {
    selectedMinTokenValue: 0,
    selectedMaxTokenValue: 0,
    selectedMinRating: 0,
    selectedMaxRating: 0,
    selectedRequirements: []
  };

  requirements = [];
  selectedRequirements;

  modalRef: BsModalRef;

  currentAirdrop: Airdrop;

  isInit = false;
  showData = false;

  @Input() statusFoundAirdrops = '';

  constructor(private airdropService: AirdropService,
              private modalService: BsModalService,
              private globals: Globals) { }

  ngOnInit() {
    this.init();
  }

  init() {
    this.airdropService.getFilterValueMinMax().subscribe(
      (response: any) => {
        console.log('getFilterValueMinMax', response);
        this.initFilterValue(response.data.tokenValueMin, response.data.tokenValueMax, response.data.ratingMin, response.data.ratingMax);
        this.isInit = true;
        this.getFilteredAirdrops();
      },
      (error) => console.log('Error initFoundAirdrops', error)
    );
  }

  initFilterValue(minToken, maxToken, minRating, maxRating) {
    if (minToken) {
      this.minTokenValue = minToken;
    } else if (minToken === 0) {
      this.minTokenValue = 0;
    }
    if (maxToken) {
      this.maxTokenValue = maxToken;
    } else if (minToken === 0) {
      this.maxTokenValue = 0;
    }
    if (minRating) {
      this.minRating = minRating;
    } else if (minRating === 0) {
      this.minRating = 0;
    }
    if (maxRating) {
      this.maxRating = maxRating;
    } else if (maxRating === 0) {
      this.maxRating = 0;
    }

    this.getSelectedFilterValue(this.statusFoundAirdrops);
    this.twoWayRangeTokenValue = [this.selectedMinTokenValue, this.selectedMaxTokenValue];
    this.twoWayRangeRating = [this.selectedMinRating, this.selectedMaxRating];

    this.initFilterValues = true;
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
    localStorage.setItem('selectedMinTokenValueAdmin', '');
    localStorage.setItem('selectedMaxTokenValueAdmin', '');
    localStorage.setItem('selectedMinRatingAdmin', '');
    localStorage.setItem('selectedMaxRatingAdmin', '');
    localStorage.setItem('selectedRequirementsAdmin', JSON.stringify([]));
  }

  getFilteredAirdrops() {
    this.prepareSave(this.statusFoundAirdrops);
    this.airdropService.getAirdrops(this.filterData, this.statusFoundAirdrops).subscribe(
      (response: any) => {
        console.log('response getFilteredAirdrops', response);
        if (!this.showData) {
          this.showData = true;
        }
        this.airdrops = response.data.airdrops;
        this.airdrops.sort(function(x, y) {
          return (x.verified === y.verified) ? 0 : x.verified ? 1 : -1;
        });

        this.airdropService.isVisitedAirdrop(this.airdrops);
      },
      (error) => {
        console.log('Error getFilteredAirdrops', error);
        if (!this.showData) {
          this.showData = true;
        }
        if (error.error.error.code === 3001) {
          this.airdrops = [];
        }
      }
    );
  }

  prepareSave(status = '') {
    this.filterData.selectedMinTokenValue = this.twoWayRangeTokenValue[0];
    this.filterData.selectedMaxTokenValue = this.twoWayRangeTokenValue[1];
    this.filterData.selectedMinRating = this.twoWayRangeRating[0];
    this.filterData.selectedMaxRating = this.twoWayRangeRating[1];
    this.filterData.selectedRequirements = this.requirements;

    const selectedMinTokenValueLS = 'selectedMinTokenValueAdmin' + status;
    const selectedMaxTokenValueLS = 'selectedMaxTokenValueAdmin' + status;
    const selectedMinRatingLS = 'selectedMinRatingAdmin' + status;
    const selectedMaxRatingLS = 'selectedMaxRatingAdmin' + status;
    const selectedRequirementsLS = 'selectedRequirementsAdmin' + status;

    localStorage.setItem(selectedMinTokenValueLS, this.filterData.selectedMinTokenValue.toString());
    localStorage.setItem(selectedMaxTokenValueLS, this.filterData.selectedMaxTokenValue.toString());
    localStorage.setItem(selectedMinRatingLS, this.filterData.selectedMinRating.toString());
    localStorage.setItem(selectedMaxRatingLS, this.filterData.selectedMaxRating.toString());
    localStorage.setItem(selectedRequirementsLS, JSON.stringify(this.filterData.selectedRequirements));

    const formData = new FormData();
    for (const field in this.filterData) {
      if (field === 'selectedRequirements') {
        formData.append(field, JSON.stringify(this.filterData.selectedRequirements));
      } else {
        formData.append(field, this.filterData[field]);
      }
    }
    return formData;
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

  getSelectedFilterValue(status = '') {
    const selectedMinTokenValueLS = 'selectedMinTokenValueAdmin' + status;
    this.selectedMinTokenValue = localStorage.getItem(selectedMinTokenValueLS) || this.minTokenValue;
    this.selectedMinTokenValue = +this.selectedMinTokenValue;
    if (this.selectedMinTokenValue < this.minTokenValue) {
      this.selectedMinTokenValue = this.minTokenValue;
    }

    const selectedMaxTokenValueLS = 'selectedMaxTokenValueAdmin' + status;
    this.selectedMaxTokenValue = localStorage.getItem(selectedMaxTokenValueLS) || this.maxTokenValue;
    this.selectedMaxTokenValue = +this.selectedMaxTokenValue;
    if (this.selectedMaxTokenValue > this.maxTokenValue) {
      this.selectedMaxTokenValue = this.maxTokenValue;
    }

    const selectedMinRatingLS = 'selectedMinRatingAdmin' + status;
    this.selectedMinRating = localStorage.getItem(selectedMinRatingLS) || this.minRating;
    this.selectedMinRating = +this.selectedMinRating;
    if (this.selectedMinRating < this.minRating) {
      this.selectedMinRating = this.minRating;
    }

    const selectedMaxRatingLS = 'selectedMaxRatingAdmin' + status;
    this.selectedMaxRating = localStorage.getItem(selectedMaxRatingLS) || this.maxRating;
    this.selectedMaxRating = +this.selectedMaxRating;
    if (this.selectedMaxRating > this.maxRating) {
      this.selectedMaxRating = this.maxTokenValue;
    }

    const selectedRequirementsLS = 'selectedRequirementsAdmin' + status;
    this.selectedRequirements = JSON.parse(localStorage.getItem(selectedRequirementsLS)) || [];

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

  refreshAirdrops() {
    this.initFilterValues = false;
    this.airdrops = [];
    this.init();
  }
}
