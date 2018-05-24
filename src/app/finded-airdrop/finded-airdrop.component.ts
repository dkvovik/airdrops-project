import { Component, Input, OnInit } from '@angular/core';
import { Airdrop } from '../shared/models/airdrop';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { Globals } from '../shared/globals';

@Component({
  selector: 'app-finded-airdrops',
  templateUrl: './finded-airdrop.component.html',
  styleUrls: ['./finded-airdrop.component.scss']
})
export class FindedAirdropComponent implements OnInit {

  modalRef: BsModalRef;

  @Input() title: string;
  @Input() airdrops: Airdrop[];

  constructor(private modalService: BsModalService) { }

  ngOnInit() {
  }

  openModalWithComponent(airdrop) {
    const initialState = {...airdrop};
    this.modalRef = this.modalService.show(DetailAirdropComponent, {initialState});
  }

}

@Component({
  selector: 'app-detail-airdrop',
  template: `
    {{tokenName}}
  `
})
export class DetailAirdropComponent implements OnInit {

  tokenName: string;

  constructor(public bsModalRef: BsModalRef, private globals: Globals) {
  }

  ngOnInit() {
    if (this.globals.visitedAirdrop.indexOf(this.tokenName) === -1) {
      this.globals.visitedAirdrop.push(this.tokenName);
    }
    localStorage.setItem('visitedAirdrop', JSON.stringify(this.globals.visitedAirdrop));
  }
}
