import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  modalRef: BsModalRef;

  constructor(private modalService: BsModalService) {
  }

  ngOnInit() {
  }

  tabLinks: { label: string, link: string }[] = [
    {
      label: 'Home', link: 'home',
    },
    {
      label: 'Extras', link: '#',
    },
    {
      label: 'Submit Airdrop', link: '#',
    }
  ];

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

}
