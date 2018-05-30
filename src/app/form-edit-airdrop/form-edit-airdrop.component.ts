import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AirdropService } from '../services/airdrop.service';
import { Airdrop } from '../shared/models/airdrop';

@Component({
  selector: 'app-form-edit-airdrop',
  templateUrl: './form-edit-airdrop.component.html',
  styleUrls: ['./form-edit-airdrop.component.scss']
})
export class FormEditAirdropComponent implements OnInit {

  addedHTG = [];
  addedProjectLinks = [];

  isActiveAddLink = false;

  startDate: string;
  endDate: string;

  bsConfig = {
    containerClass: 'theme-default',
    dateInputFormat: 'DD MMMM YYYY',
    showWeekNumbers: false
  };

  formEditAirdrop: FormGroup;
  formInvalidaAfterSubmit = false;
  image = '';
  imageReader = '';

  autocompleteRequirements = ['Email', 'Twitter', 'Telegram', 'Reddit', 'Facebook', 'Bitcointalk', 'Medium', 'Youtube',
    'Steemit', 'Github', 'KYM', 'Google-Plus'];

  @Input() modalRef: BsModalRef;
  @Input() airdrop: Airdrop;

  isOpenPopover = [];
  selectedText: string;
  currentIdHTG: any;

  constructor(private cd: ChangeDetectorRef,
              private airdropService: AirdropService) {
  }

  ngOnInit() {
    this.initFormAddAirdrop();
    console.log(this.airdrop.image);
  }

  initFormAddAirdrop() {
    this.addedHTG = this.airdrop.howToGetToken || [];
    this.addedProjectLinks = this.airdrop.projectLinks || [];
    this.startDate = this.airdrop.startDate;
    this.endDate = this.airdrop.endDate;

    this.formEditAirdrop = new FormGroup({
      image: new FormControl(this.airdrop.image, [Validators.required]),
      tokenName: new FormControl(this.airdrop.tokenName, [Validators.required]),
      projectName: new FormControl(this.airdrop.projectName, [Validators.required]),
      email: new FormControl(this.airdrop.email, [Validators.required, Validators.email]),
      whitePaperLink: new FormControl(this.airdrop.whitePaperLink),
      assetId: new FormControl(this.airdrop.assetId),
      platform: new FormControl(this.airdrop.platform),
      website: new FormControl(this.airdrop.website),
      startDate: new FormControl(this.airdrop.startDate, [Validators.required]),
      endDate: new FormControl(this.airdrop.endDate, [Validators.required]),
      economyOfToken: new FormControl(this.airdrop.economyOfToken),
      totalValue: new FormControl(this.airdrop.totalValue),
      tokensPerClaim: new FormControl(this.airdrop.tokensPerClaim),
      estimatedValue: new FormControl(this.airdrop.estimatedValue),
      description: new FormControl(this.airdrop.description),
      commentBlock: new FormControl(this.airdrop.commentBlock),
      requirements: new FormControl(this.airdrop.requirements),
      howToGetToken: new FormControl(null),
      projectLinks: new FormControl(null),
    });
  }

  onSubmitEditAirdrop() {
    if (this.formEditAirdrop.invalid) {
      this.formInvalidaAfterSubmit = true;
    } else {
      const formModel = this.prepareSave();
      this.airdropService.addAirdrop(formModel).subscribe(
        response => {
          this.modalRef.hide();
        },
        error => console.log(error)
      );
    }
  }

  onFileChange(event) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      this.formEditAirdrop.get('image').setValue(file);

      reader.onload = () => {
        this.imageReader = reader.result;
      };
      reader.readAsDataURL(file);
      this.cd.markForCheck();
    }
  }

  prepareSave() {
    this.formEditAirdrop.get('howToGetToken').setValue(this.addedHTG);
    this.formEditAirdrop.get('projectLinks').setValue(this.addedProjectLinks);
    const input = new FormData();
    for (const field in this.formEditAirdrop.controls) {
      if (field === 'requirements' || field === 'projectLinks' || field === 'howToGetToken') {
        input.append(field, JSON.stringify(this.formEditAirdrop.get(field).value));
      } else {
        input.append(field, this.formEditAirdrop.get(field).value);
      }
    }
    return input;
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


