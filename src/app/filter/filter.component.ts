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

  minTokenValue = 0;
  maxTokenValue = 0;
  stepTokenValue = 1;
  twoWayRangeTokenValue: number[];


  minRating = 0;
  maxRating = 0;
  stepRating = 1;
  twoWayRangeRating: number[];

  requirements = [];

  modalRef: BsModalRef;

  currentAirdrop: Airdrop;


  constructor(private airdropService: AirdropService,
              private modalService: BsModalService,
              private globals: Globals) { }

  ngOnInit() {
    this.initFilterValue();
  }

  initFilterValue() {
    this.minTokenValue = this.airdropService.getMinTokenValue();
    this.maxTokenValue = this.airdropService.getMaxTokenValue();
    this.twoWayRangeTokenValue = [this.minTokenValue, this.maxTokenValue];

    this.minRating = this.airdropService.getMinRating();
    this.maxRating = this.airdropService.getMaxRating();
    this.twoWayRangeRating = [this.minRating, this.maxRating];
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
  }

  getAirdrops(requirements, tokenValue, rating) {
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

}
