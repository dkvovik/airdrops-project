import { Component, Input, OnInit } from '@angular/core';
import { Airdrop } from '../shared/models/airdrop';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { Globals } from '../shared/globals';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-finded-airdrops',
  templateUrl: './finded-airdrop.component.html',
  styleUrls: ['./finded-airdrop.component.scss']
})
export class FindedAirdropComponent implements OnInit {

  modalRef: BsModalRef;

  @Input() title: string;
  @Input() airdrops: Airdrop[];

  constructor(private modalService: BsModalService,
              private sanitizer: DomSanitizer) { }

  ngOnInit() {
  }

  openModalWithComponent(airdrop) {
    const initialState = {...airdrop};
    this.modalRef = this.modalService.show(DetailAirdropComponent, {initialState});
  }

  parseIconProjectLink(link) {
    let iconLink = '';

    link = link.split(/([a-zA-Z0-9-_]+\.\w+)[\/]/)[1];

    switch (link) {
      case 'twitter.com':
        iconLink =  `<svg viewBox="0 0 20.162 16.507" class="icon soc-net">
                  <g id="twitter" transform="translate(0 -0.94)">
                    <path id="XMLID_827_" class="cls-1" d="M19.7,30a7.643,7.643,0,0,1-.975.355,4.311,4.311,0,0,0,.878-1.543.325.325,0,0,0-.476-.379,7.674,7.674,0,0,1-2.268.9A4.33,4.33,0,0,0,9.5,32.425a4.415,4.415,0,0,0,.035.559,11.081,11.081,0,0,1-7.606-4.035.325.325,0,0,0-.533.042,4.334,4.334,0,0,0,.444,4.982,3.668,3.668,0,0,1-.579-.259.325.325,0,0,0-.483.277c0,.019,0,.038,0,.058A4.344,4.344,0,0,0,2.9,37.771c-.11-.011-.22-.027-.329-.048a.325.325,0,0,0-.371.419,4.327,4.327,0,0,0,3.171,2.9,7.657,7.657,0,0,1-4.093,1.168,7.835,7.835,0,0,1-.917-.054.325.325,0,0,0-.214.6A11.672,11.672,0,0,0,6.459,44.6a11.229,11.229,0,0,0,8.7-3.821,12.112,12.112,0,0,0,3.015-7.894c0-.119,0-.239-.005-.358a8.414,8.414,0,0,0,1.936-2.051A.325.325,0,0,0,19.7,30Z" transform="translate(0.002 -27.157)"/>
                  </g>
                </svg>`;
        break;
      case 'facebook.com':
        iconLink = `<svg class="icon soc-net" viewBox="0 0 16.408 16.408">
          <g id="facebook-logo" class="cls-1">
            <path id="Facebook__x28_alt_x29_" class="cls-2" d="M16.408,2.735A2.834,2.834,0,0,0,13.673,0H2.735A2.834,2.834,0,0,0,0,2.735V13.673a2.834,2.834,0,0,0,2.735,2.735H8.2v-6.2H6.2V7.475H8.2V6.409a3.365,3.365,0,0,1,3.077-3.492h2.211V5.652H11.281c-.242,0-.524.294-.524.734V7.475h2.735v2.735H10.756v6.2h2.917a2.834,2.834,0,0,0,2.735-2.735Z" transform="translate(0 0)"/>
          </g>
        </svg>`;
        break;
      case 'google.com':
        iconLink = `<svg id="google-plus" class="icon soc-net" viewBox="0 0 24.294 15.544">
          <path id="Path_966" data-name="Path 966" class="cls-1" d="M8.524,91.895h3.8a4.825,4.825,0,1,1-1.31-5.174.523.523,0,0,0,.711,0l1.394-1.312a.521.521,0,0,0,0-.758,7.743,7.743,0,0,0-5.189-2.128,7.772,7.772,0,1,0,7.6,8.208c.006-.051.01-1.784.01-1.784H8.524A.521.521,0,0,0,8,89.466v1.908A.521.521,0,0,0,8.524,91.895Z" transform="translate(0 -82.519)"/>
          <path id="Path_967" data-name="Path 967" class="cls-1" d="M328.663,165.529v-1.865a.456.456,0,0,0-.456-.456h-1.569a.456.456,0,0,0-.457.456v1.865h-1.865a.456.456,0,0,0-.456.456v1.569a.456.456,0,0,0,.456.456h1.865v1.865a.456.456,0,0,0,.457.456h1.569a.456.456,0,0,0,.456-.456v-1.865h1.865a.456.456,0,0,0,.456-.456v-1.569a.456.456,0,0,0-.456-.456Z" transform="translate(-306.691 -158.93)"/>
        </svg>`;
        break;

    }

    return this.sanitizer.bypassSecurityTrustHtml(iconLink);
  }

}




@Component({
  selector: 'app-detail-airdrop',
  template: `
    <div class="modal-header modal-header-detail">
      <div class="detail-airdrop">
        <div class="detail-airdrop__img">
          <img src="{{image}}" class="token-logo">
        </div>
        <div class="detail-airdrop__info">
          <div class="info-title">
            {{tokenName}} <span>
                 <svg class="icon icon_eyes" viewBox="0 0 13.75 9.375">
                  <g id="baseline-remove_red_eye-24px" transform="translate(-0.625 -2.813)">
                    <path id="Path_991" data-name="Path 991" class="cls-1" d="M7.875,4.5A7.392,7.392,0,0,0,1,9.188a7.385,7.385,0,0,0,13.75,0A7.392,7.392,0,0,0,7.875,4.5Zm0,7.813A3.125,3.125,0,1,1,11,9.188,3.126,3.126,0,0,1,7.875,12.313Zm0-5A1.875,1.875,0,1,0,9.75,9.188,1.872,1.872,0,0,0,7.875,7.313Z" transform="translate(-0.375 -1.688)"/>
                  </g>
                </svg>
                </span>
          </div>
          <p class="project-name">
            {{projectName}}
          </p>
        </div>
      </div>
      <button type="button" class="close pull-right" aria-label="Close" (click)="modalRef.hide()">
        <svg class="icon close" viewBox="0 0 17.536 17.536">
          <g id="Plus" transform="translate(-805.387 112.314)">
            <g id="Group_73" data-name="Group 73" transform="translate(816.7 -112.314) rotate(45)">
              <path id="Path_88" data-name="Path 88" class="cls-1"
                    d="M815.9-108.2v6.4h-6.4a.792.792,0,0,0-.8.8h0a.792.792,0,0,0,.8.8h6.4v6.4a.792.792,0,0,0,.8.8h0a.792.792,0,0,0,.8-.8v-14.4a.792.792,0,0,0-.8-.8h0A.792.792,0,0,0,815.9-108.2Z"
                    transform="translate(-808.7 109)"/>
              <path id="Path_89" data-name="Path 89" class="cls-1"
                    d="M844.98-84.9H840.5a.792.792,0,0,1-.8-.8h0a.792.792,0,0,1,.8-.8h4.48a.792.792,0,0,1,.8.8h0A.813.813,0,0,1,844.98-84.9Z"
                    transform="translate(-829.78 93.7)"/>
            </g>
          </g>
        </svg>
      </button>
    </div>
    <div class="modal-subheader-detail">
      <div class="subheader-detail-item">
        <div class="subheader-detail-asset"><span class="badge_grey">Asset ID</span>{{assetId}}</div>
        <span class="badge_grey">Platform</span>{{platform}}
      </div>
      <div class="subheader-detail-item">
        <div class="requirements-wrapper" >
          <span class="badge_grey">Requirements</span>
          <span [ngSwitch]="requirement | lowercase" *ngFor="let requirement of requirements"
                [popover]="requirementFunc(requirement)" triggers="mouseenter:mouseleave" class="requirement-item">
            <svg *ngSwitchCase="'email'" class="icon active disabled" viewBox="0 0 20.147 14.576">
              <g id="message-envelope" class="cls-1" transform="translate(0 -1)">
                <g id="Group_129" data-name="Group 129" transform="translate(0 1)">
                  <path id="Path_202" data-name="Path 202" class="cls-2" d="M0,60.58v.728l10.074,7.787,10.074-7.787V60.58Z" transform="translate(0 -60.58)"/>
                  <path id="Path_203" data-name="Path 203" class="cls-2" d="M10.074,103.221,4.14,98.59,0,95.39v12.341H20.147V95.39l-4.14,3.2Z" transform="translate(0 -93.155)"/>
                </g>
              </g>
            </svg>
            <svg *ngSwitchCase="'twitter'" class="icon active disabled" viewBox="0 0 20.162 16.507">
              <g id="twitter" transform="translate(0 -0.94)">
                <path id="XMLID_827_" class="cls-1" d="M19.7,30a7.643,7.643,0,0,1-.975.355,4.311,4.311,0,0,0,.878-1.543.325.325,0,0,0-.476-.379,7.674,7.674,0,0,1-2.268.9A4.33,4.33,0,0,0,9.5,32.425a4.415,4.415,0,0,0,.035.559,11.081,11.081,0,0,1-7.606-4.035.325.325,0,0,0-.533.042,4.334,4.334,0,0,0,.444,4.982,3.668,3.668,0,0,1-.579-.259.325.325,0,0,0-.483.277c0,.019,0,.038,0,.058A4.344,4.344,0,0,0,2.9,37.771c-.11-.011-.22-.027-.329-.048a.325.325,0,0,0-.371.419,4.327,4.327,0,0,0,3.171,2.9,7.657,7.657,0,0,1-4.093,1.168,7.835,7.835,0,0,1-.917-.054.325.325,0,0,0-.214.6A11.672,11.672,0,0,0,6.459,44.6a11.229,11.229,0,0,0,8.7-3.821,12.112,12.112,0,0,0,3.015-7.894c0-.119,0-.239-.005-.358a8.414,8.414,0,0,0,1.936-2.051A.325.325,0,0,0,19.7,30Z" transform="translate(0.002 -27.157)"/>
              </g>
            </svg>
            <svg *ngSwitchCase="'telegram'" class="icon active disabled" id="telegram" viewBox="0 0 18.845 16.408">
              <path id="XMLID_497_" class="cls-1" d="M.333,27.268l4.342,1.621,1.681,5.405a.511.511,0,0,0,.812.244l2.421-1.973a.722.722,0,0,1,.88-.025l4.366,3.17a.512.512,0,0,0,.8-.309l3.2-15.384a.512.512,0,0,0-.685-.582L.328,26.311A.512.512,0,0,0,.333,27.268Zm5.752.758L14.572,22.8a.148.148,0,0,1,.178.234l-7,6.51a1.452,1.452,0,0,0-.45.869l-.239,1.768a.219.219,0,0,1-.428.031l-.918-3.224A.854.854,0,0,1,6.085,28.026Z" transform="translate(0 -19.401)"/>
            </svg>
            <!-- reddit -->
            <svg *ngSwitchCase="'facebook'" class="icon active disabled" viewBox="0 0 16.408 16.408">
              <g id="facebook-logo" class="cls-1">
                <path id="Facebook__x28_alt_x29_" class="cls-2" d="M16.408,2.735A2.834,2.834,0,0,0,13.673,0H2.735A2.834,2.834,0,0,0,0,2.735V13.673a2.834,2.834,0,0,0,2.735,2.735H8.2v-6.2H6.2V7.475H8.2V6.409a3.365,3.365,0,0,1,3.077-3.492h2.211V5.652H11.281c-.242,0-.524.294-.524.734V7.475h2.735v2.735H10.756v6.2h2.917a2.834,2.834,0,0,0,2.735-2.735Z" transform="translate(0 0)"/>
              </g>
            </svg>
            <svg *ngSwitchCase="'github'" class="icon active disabled" viewBox="0 0 18.019 17.6">
              <path id="Path_342" data-name="Path 342" class="cls-1" d="M16.812,4.489a8.953,8.953,0,0,0-3.277-3.277A8.775,8.775,0,0,0,9.009,0,8.821,8.821,0,0,0,4.484,1.207,8.953,8.953,0,0,0,1.207,4.484,8.821,8.821,0,0,0,0,9.009a8.757,8.757,0,0,0,1.721,5.3,8.826,8.826,0,0,0,4.438,3.257.517.517,0,0,0,.467-.082.452.452,0,0,0,.154-.349c0-.026,0-.236-.005-.632s-.005-.745-.005-1.043L6.5,15.5a3.387,3.387,0,0,1-.652.041,5.117,5.117,0,0,1-.817-.082,1.864,1.864,0,0,1-.786-.349,1.482,1.482,0,0,1-.514-.719l-.118-.272a2.742,2.742,0,0,0-.37-.6,1.419,1.419,0,0,0-.509-.447l-.082-.057a.99.99,0,0,1-.154-.139.752.752,0,0,1-.108-.164c-.026-.057-.005-.1.057-.134a.746.746,0,0,1,.339-.051l.236.036a1.679,1.679,0,0,1,.58.283,1.862,1.862,0,0,1,.57.611,2.08,2.08,0,0,0,.652.735,1.362,1.362,0,0,0,.77.252,3.56,3.56,0,0,0,.668-.057,2.459,2.459,0,0,0,.529-.175,1.905,1.905,0,0,1,.575-1.207,8.062,8.062,0,0,1-1.2-.211,4.8,4.8,0,0,1-1.1-.457,3.155,3.155,0,0,1-.945-.786A3.738,3.738,0,0,1,3.5,10.324a5.891,5.891,0,0,1-.241-1.762,3.44,3.44,0,0,1,.925-2.419A3.163,3.163,0,0,1,4.263,3.75a1.636,1.636,0,0,1,1.007.159,7.258,7.258,0,0,1,.981.452c.205.123.375.231.5.318A8.264,8.264,0,0,1,9,4.376a8.468,8.468,0,0,1,2.255.3l.447-.283a6.217,6.217,0,0,1,1.079-.519,1.541,1.541,0,0,1,.95-.128,3.1,3.1,0,0,1,.092,2.394,3.422,3.422,0,0,1,.925,2.419,5.975,5.975,0,0,1-.241,1.767,3.641,3.641,0,0,1-.622,1.233,3.309,3.309,0,0,1-.95.781,4.712,4.712,0,0,1-1.1.457,8.062,8.062,0,0,1-1.2.211,2.1,2.1,0,0,1,.611,1.664v2.476a.466.466,0,0,0,.149.349.506.506,0,0,0,.462.082A8.831,8.831,0,0,0,16.3,14.326a8.757,8.757,0,0,0,1.721-5.3,8.809,8.809,0,0,0-1.207-4.541Zm0,0"/>
            </svg>

          </span>
        </div>

      </div>
    </div>
    <div class="modal-body">
      <div class="modal-body__header">
        <div class="rating-button-wrapper">
          <div class="rating">
            <svg class="icon icon-rating disabled" viewBox="0 0 18 18">
              <g id="Group_408" data-name="Group 408" transform="translate(-409 -163)">
                <ellipse id="Ellipse_12" data-name="Ellipse 12" class="cls-1" cx="9" cy="9" rx="9" ry="9" transform="translate(409 163)"/>
                <g id="fire" transform="translate(414.349 167.236)">
                  <g id="Group_137" data-name="Group 137" transform="translate(0 0)">
                    <path id="Path_204" data-name="Path 204" class="fire" fill="#fff" d="M49.314,2.847a2.448,2.448,0,0,0-.555-.474l-.018-.01a.374.374,0,0,0-.374.024c-.119.08-.282.189-.149,1.968,0,0,0,.009,0,.013a.559.559,0,0,1,0,.191l0,.016a.849.849,0,0,1-.712.641.814.814,0,0,1-.855-.369.988.988,0,0,1-.046-.894c.029-.058.057-.118.085-.178a3.716,3.716,0,0,1,.2-.393A2.86,2.86,0,0,0,46.628.156a.371.371,0,0,0-.573-.041c-.294.311-.58.637-.857.953-.333.379-.677.772-1.035,1.137a5.356,5.356,0,0,0-1.493,2.587,3.694,3.694,0,0,0,.3,2.241A4,4,0,0,0,46.307,9.26c.058,0,.116,0,.175,0A3.872,3.872,0,0,0,49.8,7.342,3.715,3.715,0,0,0,49.314,2.847Z" transform="translate(-42.613 0.001)"/>
                  </g>
                </g>
              </g>
            </svg>
            {{rating}}
          </div>
          <div class="rating-button">
            <button class="rating-plus btn-link">&uarr;</button>
            <button class="rating-minus btn-link">&darr;</button>
          </div>
        </div>
        <div class="date-wrapper">
          <div class="date-start"><span class="badge_grey">Start</span> {{startDate | date:'d MMMM y'}}</div>
          <div class="date-end"><span class="badge_grey">End</span> {{endDate | date:'d MMMM y'}}</div>
        </div>
        <div class="token-wrapper">
          <div class="token-value"><span class="badge_grey">Total value</span> {{totalValue}}</div>
          <div class="token-per"><span class="badge_grey">Tokens per Claim</span> {{tokensPerClaim}}</div>
        </div>
        <div class="estimated-wrapper">
          <div class="estimated-title">Estimated value</div>
          <div class="estimated-value">{{estimatedValue}}</div>
        </div>
      </div>
      <div class="modal-body__middle">
        <div class="about-wrapper">
          <div class="about-title">About Airdrop</div>
          <div class="about-content">{{description}}</div>
        </div>
        <div class="htg-wrapper">
          <div class="htg-title">Step-by-Step Guide</div>
          <div class="htg-content" *ngFor="let htg of howToGetToken; let idx = index;">
            <div class="htg-index htg-index_white">
              {{idx + 1}}
            </div>
            <div class="htg-text">{{htg}}</div>
          </div>
        </div>
      </div>
      <div class="modal-body__footer">
        <div class="project-links-wrapper">
          <div class="project-links-header">
            <div class="title">PROJECT LINKS</div>
            <div class="project-links">
              <div class="info-social-icon">
                <a href="{{link}}" *ngFor="let link of projectLinks"
                   [innerHtml]="parseIconProjectLink(link)">
                </a>
              </div>
            </div>
          </div>
          <div class="project-links-footer">{{commentBlock}}</div>
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn">Claim Airdrop</button>
    </div>
  `,
  styles: [`
    .requirement-item {
      position: relative;
      margin-right: 14px;
    }
    svg.icon-req {
      fill: #1F5AF6;
    }
    svg.icon-rating {
      height: 18px;
      margin-top: 2px;
    }
    .modal-header-detail {
      background-color: #FCFCFC;
      height: auto;
      padding-top: 36px;
      padding-left: 56px;
      padding-right: 56px;
    }
    .modal-header button.close {
      align-self: flex-start;
    }
    .detail-airdrop {
      display: flex;
      align-items: center;
    }
    img.token-logo {
      width: 68px;
      height: 68px;
      margin-right: 23px;
    }
    .info-title {
      color: #4E5C6E;
      font-weight: 500;
      font-size: 1.294rem;
    }
    .detail-airdrop .project-name {
      color: #AEAEAE;
      font-size: 0.9412rem;
      font-weight: 700;
      margin-bottom: 0;
    }

    .modal-subheader-detail {
      background-color: #FCFCFC;
      padding: 0px 56px 23px 56px;
      border-bottom: 1px solid #E2E2E2;
    }

    .subheader-detail-item:first-child {
      margin-bottom: 10px;
      display: flex;
    }

    .subheader-detail-asset {
      margin-right: 20px;
    }

    .modal-body__header,
    .modal-body__middle,
    .modal-body__footer {
      padding-left: 56px;
      padding-right: 56px;
    }

    .modal-body__header {
      border-bottom: 1px solid #E2E2E2;
      padding-top: 28px;
      padding-bottom: 30px;
      display: flex;
      justify-content: space-between;
      font-size: 15px;
    }

    .rating-button-wrapper {
      display: flex;
    }
    .rating-button-wrapper .rating {
      border-left: 1px solid #fff;
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
      padding-left: 15px;
      padding-right: 15px;
      border-right: 1px solid #fff;
    }
    .rating-button-wrapper .rating-button {
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
    }
    .rating-button-wrapper .rating,
    .rating-button-wrapper .rating-button {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      background-color: #EDEDED;
    }
    .rating-button .rating-plus,
    .rating-button .rating-minus {
      cursor: pointer;
      border: none;
      color: #BCC0C6;
      flex-grow: 1;
    }
    .rating-button .rating-plus:hover,
    .rating-button .rating-minus:hover {
      color: #4E5C6E;
      text-decoration: none;
    }
    .rating-button .rating-plus {
      border-bottom: 1px solid #fff;
    }

    .date-wrapper .date-start,
    .token-wrapper .token-value {
      margin-bottom: 13px;
    }

    .estimated-wrapper {
      display: flex;
      flex-direction: column;
    }
    .estimated-wrapper .estimated-title,
    .estimated-wrapper .estimated-value {
      flex-basis: 50%;
      background-color: #ECECEC;
    }
    .estimated-wrapper .estimated-title {
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
      border-bottom: 1px solid #fff;
      padding: 3px 12px;
      color: #4E5C6E;
      font-size: 0.7059rem;
    }
    .estimated-wrapper .estimated-value {
      border-bottom-left-radius: 5px;
      border-bottom-right-radius: 5px;
      padding: 3px 12px;
    }

    .modal-body__middle {
      padding-top: 23px;
      padding-bottom: 28px;
      display: flex;
    }

    .modal-body__middle .about-wrapper {
      flex-basis: 55%;
      padding-right: 40px;
    }

    .modal-body__middle {
      font-size: 0.8824rem;
    }
    .modal-body__middle .about-title,
    .modal-body__middle .htg-title {
      color: #4E5C6E;
      margin-bottom: 12px;
    }

    .modal-body__middle .htg-content {
      display: flex;
      align-items: center;
      margin-bottom: 20px;
    }

    .htg-index {
      width: 42px;
      height: 42px;
      background-color: #E2E2E2;
      color: #4E5C6E;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 15px;
    }
    .htg-index_white {
      background-color: #fff;
      border: 1px solid #E2E2E2;
    }

    .project-links-wrapper {
      background-color: #EAEAEA;
    }
    .project-links-header {
      border-bottom: 1px solid #E2E2E2;
      padding-top: 23px;
      padding-bottom: 18px;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .project-links-footer,
    .project-links-footer {
      padding-left: 15px;
      padding-bottom: 15px;
    }
    .project-links-header .title {
      color: #4E5C6E;
      font-size: 0.8824rem;
      margin-bottom: 15px;
    }

    .modal-footer {
      border-top: none;
      justify-content: center;
      padding: 40px;
      padding-bottom: 40px;
    }

    .badge_grey {
      background-color: #ECECEC;
      border-radius: 5px;
      margin-bottom: 7px;
      text-align: center;
      color: #4E5C6E;
      padding: 3px 12px;
      margin-right: 20px;
      font-size: 0.7059rem;
    }
    
  `]
})
export class DetailAirdropComponent implements OnInit {

  tokenName: string;


  constructor(public modalRef: BsModalRef,
              private globals: Globals,
              private sanitize: DomSanitizer) {
  }

  ngOnInit() {
    if (this.globals.visitedAirdrop.indexOf(this.tokenName) === -1) {
      this.globals.visitedAirdrop.push(this.tokenName);
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
