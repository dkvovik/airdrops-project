import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() {
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

}
