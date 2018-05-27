import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { Globals } from '../shared/globals';
import { DomSanitizer } from '@angular/platform-browser';
import { Airdrop } from '../shared/models/airdrop';

@Component({
  selector: 'app-detail-info',
  templateUrl: './detail-info.component.html',
  styleUrls: ['./detail-info.component.scss']
})
export class DetailInfoComponent implements OnInit {

  @Input() modalRef: BsModalRef;
  @Input() airdrop: Airdrop;

  constructor(private globals: Globals,
              private sanitize: DomSanitizer) {
  }

  ngOnInit() {
    if (this.globals.visitedAirdrop.indexOf(this.airdrop.tokenName) === -1) {
      this.globals.visitedAirdrop.push(this.airdrop.tokenName);
    }
    localStorage.setItem('visitedAirdrop', JSON.stringify(this.globals.visitedAirdrop));
  }

  requirementFunc(value) {
    if (value === 'Twitter') {
      return value + ' (Follow, Retweet, Tweet)';
    } else {
      return value;
    }
  }

  parseIconProjectLink(link) {
    let iconLink = '';

    link = link.split(/([a-zA-Z0-9-_]+\.\w+)[\/]/)[1];

    switch (link) {
      case 'twitter.com':
        iconLink =  `<svg viewBox="0 0 20.162 16.507" class="icon large active">
                    <g id="twitter" transform="translate(0 -0.94)">
                      <path id="XMLID_827_" class="cls-1" d="M19.7,30a7.643,7.643,0,0,1-.975.355,4.311,4.311,0,0,0,.878-1.543.325.325,0,0,0-.476-.379,7.674,7.674,0,0,1-2.268.9A4.33,4.33,0,0,0,9.5,32.425a4.415,4.415,0,0,0,.035.559,11.081,11.081,0,0,1-7.606-4.035.325.325,0,0,0-.533.042,4.334,4.334,0,0,0,.444,4.982,3.668,3.668,0,0,1-.579-.259.325.325,0,0,0-.483.277c0,.019,0,.038,0,.058A4.344,4.344,0,0,0,2.9,37.771c-.11-.011-.22-.027-.329-.048a.325.325,0,0,0-.371.419,4.327,4.327,0,0,0,3.171,2.9,7.657,7.657,0,0,1-4.093,1.168,7.835,7.835,0,0,1-.917-.054.325.325,0,0,0-.214.6A11.672,11.672,0,0,0,6.459,44.6a11.229,11.229,0,0,0,8.7-3.821,12.112,12.112,0,0,0,3.015-7.894c0-.119,0-.239-.005-.358a8.414,8.414,0,0,0,1.936-2.051A.325.325,0,0,0,19.7,30Z" transform="translate(0.002 -27.157)"/>
                    </g>
                  </svg>`;
        break;
      case 'facebook.com':
        iconLink = `<svg class="icon large active" viewBox="0 0 16.408 16.408">
          <g id="facebook-logo" class="cls-1">
            <path id="Facebook__x28_alt_x29_" class="cls-2" d="M16.408,2.735A2.834,2.834,0,0,0,13.673,0H2.735A2.834,2.834,0,0,0,0,2.735V13.673a2.834,2.834,0,0,0,2.735,2.735H8.2v-6.2H6.2V7.475H8.2V6.409a3.365,3.365,0,0,1,3.077-3.492h2.211V5.652H11.281c-.242,0-.524.294-.524.734V7.475h2.735v2.735H10.756v6.2h2.917a2.834,2.834,0,0,0,2.735-2.735Z" transform="translate(0 0)"/>
          </g>
        </svg>`;
        break;
      case 'google.com':
        iconLink = `<svg id="google-plus" class="icon large active" viewBox="0 0 24.294 15.544">
          <path id="Path_966" data-name="Path 966" class="cls-1" d="M8.524,91.895h3.8a4.825,4.825,0,1,1-1.31-5.174.523.523,0,0,0,.711,0l1.394-1.312a.521.521,0,0,0,0-.758,7.743,7.743,0,0,0-5.189-2.128,7.772,7.772,0,1,0,7.6,8.208c.006-.051.01-1.784.01-1.784H8.524A.521.521,0,0,0,8,89.466v1.908A.521.521,0,0,0,8.524,91.895Z" transform="translate(0 -82.519)"/>
          <path id="Path_967" data-name="Path 967" class="cls-1" d="M328.663,165.529v-1.865a.456.456,0,0,0-.456-.456h-1.569a.456.456,0,0,0-.457.456v1.865h-1.865a.456.456,0,0,0-.456.456v1.569a.456.456,0,0,0,.456.456h1.865v1.865a.456.456,0,0,0,.457.456h1.569a.456.456,0,0,0,.456-.456v-1.865h1.865a.456.456,0,0,0,.456-.456v-1.569a.456.456,0,0,0-.456-.456Z" transform="translate(-306.691 -158.93)"/>
        </svg>`;
        break;
    }

    return this.sanitize.bypassSecurityTrustHtml(iconLink);
  }

}
