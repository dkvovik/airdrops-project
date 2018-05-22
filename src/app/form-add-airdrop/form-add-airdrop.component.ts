import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'app-form-add-airdrop',
  templateUrl: './form-add-airdrop.component.html',
  styleUrls: ['./form-add-airdrop.component.scss']
})
export class FormAddAirdropComponent implements OnInit {

  addedRequirements = [];
  addedHTG = [];
  addedProjectLinks = [];

  isActiveAddLink = false;

  startDate = new Date();
  bsConfig = {
    containerClass: 'theme-default',
    dateInputFormat: 'DD MMMM YYYY',
    showWeekNumbers: false
  };

  @Input() modalRef: BsModalRef;

  constructor() { }

  ngOnInit() {
  }

  addRequirement(value) {
    value = value.trim();
    if (value) {
      this.addedRequirements.push(value);
    }
  }
  removeAddedRequirement(index) {
    this.addedRequirements.splice(index, 1);
  }

  addHTG(value) {
    value = value.trim();
    if (value) {
      this.addedHTG.push(value);
    }
  }
  removeAddedHTG(index) {
    this.addedHTG.splice(index, 1);
  }

  addProjectLink(value) {
    value = value.trim();
    if (value) {
      this.addedProjectLinks.push(value);
    }
    this.isActiveAddLink = false;
  }
  removeAddedProjectLink(index) {
    this.addedProjectLinks.splice(index, 1);
  }

}
