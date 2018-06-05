import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-finded-airdrop-page',
  templateUrl: './finded-airdrop-page.component.html',
  styleUrls: ['./finded-airdrop-page.component.scss']
})
export class FindedAirdropPageComponent implements OnInit {

  status: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.status = this.route.snapshot.routeConfig.path;
  }

}
