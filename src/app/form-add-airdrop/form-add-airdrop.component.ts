import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'app-form-add-airdrop',
  templateUrl: './form-add-airdrop.component.html',
  styleUrls: ['./form-add-airdrop.component.scss']
})
export class FormAddAirdropComponent implements OnInit {

  addedRequirements = [];

  @Input() modalRef: BsModalRef;

  constructor() { }

  ngOnInit() {
  }

  addRequirement(value) {
    if (value) {
      this.addedRequirements.push(value);
    }
  }

  removeAddedRequirement(index) {
    this.addedRequirements.splice(index, 1);
  }

}
