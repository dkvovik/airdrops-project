import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Airdrop } from '../shared/models/airdrop';
import { AirdropService } from '../services/airdrop.service';

@Component({
  selector: 'app-form-add-airdrop',
  templateUrl: './form-add-airdrop.component.html',
  styleUrls: ['./form-add-airdrop.component.scss']
})
export class FormAddAirdropComponent implements OnInit {

  addedHTG = [];
  addedProjectLinks = [];
  addedSocialNetworks = [];

  isActiveAddLink = false;

  startDate = new Date();
  bsConfig = {
    containerClass: 'theme-default',
    dateInputFormat: 'DD MMMM YYYY',
    showWeekNumbers: false
  };

  formAddAirdrop: FormGroup;
  formInvalidaAfterSubmit = false;
  image = '';

  autocompleteRequirements = ['Email', 'Twitter', 'Telegram', 'Reddit', 'Facebook', 'Bitcointalk', 'Medium', 'Youtube',
    'Steemit', 'Github', 'KYM', 'Google-Plus'];

  @Input() modalRef: BsModalRef;

  isOpenPopover = [];
  selectedText: string;
  currentIdHTG: any;

  constructor(private cd: ChangeDetectorRef,
              private airdropService: AirdropService) {
  }

  ngOnInit() {
    this.initFormAddAirdrop();
  }

  initFormAddAirdrop() {
    this.formAddAirdrop = new FormGroup({
      image: new FormControl(null, [Validators.required]),
      tokenName: new FormControl(null, [Validators.required]),
      projectName: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      whitepaperLink: new FormControl(null, ),
      assetID: new FormControl(null, ),
      platform: new FormControl(null, ),
      website: new FormControl(null, ),
      startDate: new FormControl(this.startDate, [Validators.required]),
      endDate: new FormControl(null),
      economyToken: new FormControl(null, ),
      totalValue: new FormControl(null, ),
      tokensPerClaim: new FormControl(null, ),
      estimatedValue: new FormControl(null, ),
      description: new FormControl(null, ),
      comment: new FormControl(null, ),
      requirements: new FormControl([])
    });
  }

  onSubmitAddAirdrop() {
    console.log('this.formAddAirdrop', this.formAddAirdrop);

    if (this.formAddAirdrop.invalid) {
      this.formInvalidaAfterSubmit = true;
      /* test */
      const data: Airdrop = {...this.formAddAirdrop.value};
      data.howToGetToken = this.addedHTG;
      data.projectLinks = this.addedProjectLinks;
      data.socialNetworks = this.addedSocialNetworks;
      console.log('data', data);
    } else {
      const data: Airdrop = {...this.formAddAirdrop.value};
      data.howToGetToken = this.addedHTG;
      data.projectLinks = this.addedProjectLinks;
      data.socialNetworks = this.addedSocialNetworks;
      console.log('data', data);

      this.airdropService.addAirdrop(data).subscribe(
        response => console.log(response),
        error => console.log(error)
      );

    }


  }

  onFileChange(event) {

    const image = new FormData(event.target.files[0]);

    this.airdropService.fileUpload(image).subscribe(
      data => {
        console.log('data', data);
        this.image = data;
      },
      error => console.log('error', error)
    );

    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.formAddAirdrop.patchValue({
          image: reader.result
        });
        this.image = reader.result;
      };

      this.cd.markForCheck();
    }


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
      this.isOpenPopover.push('closed');
    }
    this.isActiveAddLink = false;
  }
  removeAddedProjectLink(index) {
    this.addedProjectLinks.splice(index, 1);
    this.isOpenPopover.splice(index, 1);
  }


  selectedTextFunc() {
    this.selectedText = window.getSelection().toString();
    if (this.selectedText) {
      this.isOpenPopover[this.currentIdHTG] = true;
    } else {
      this.isOpenPopover[this.currentIdHTG] = false;
    }
  }

  stringToUrl(url) {
    if (!url) {
      this.isOpenPopover[this.currentIdHTG] = false;
      return false;
    }

    const startIndex = this.addedHTG[this.currentIdHTG].indexOf(this.selectedText);

    const beforeString = this.addedHTG[this.currentIdHTG].substring(0, startIndex);
    const afterString = this.addedHTG[this.currentIdHTG].substring(beforeString.length + this.selectedText.length);
    const stringToUrl = `${beforeString}<a href="${url}">${this.selectedText}</a>${afterString}`;

    this.addedHTG[this.currentIdHTG] = stringToUrl;
    this.isOpenPopover[this.currentIdHTG] = false;
  }
}


