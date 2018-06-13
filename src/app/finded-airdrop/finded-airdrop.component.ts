import { Component, Input, OnInit, TemplateRef } from '@angular/core';
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
  currentAirdrop: Airdrop;

  @Input() title: string;
  @Input() airdrops: Airdrop[];

  constructor(private modalService: BsModalService,
              private globals: Globals) { }

  ngOnInit() {
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  isVoted(id) {
    if (this.globals.voitedRatingDown.indexOf(id) !== -1 || this.globals.voitedRatingUp.indexOf(id) !== -1) {
      return true;
    }
  }
}
