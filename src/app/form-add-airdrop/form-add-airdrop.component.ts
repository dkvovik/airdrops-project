import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AirdropService } from '../services/airdrop.service';

@Component({
  selector: 'app-form-add-airdrop',
  templateUrl: './form-add-airdrop.component.html',
  styleUrls: ['./form-add-airdrop.component.scss']
})
export class FormAddAirdropComponent implements OnInit {

  addedHTG = [];
  addedProjectLinks = [];

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
  imageReader = '';

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
      whitePaperLink: new FormControl(null, ),
      assetId: new FormControl(null, ),
      platform: new FormControl(null, ),
      website: new FormControl(null, ),
      startDate: new FormControl(this.startDate, [Validators.required]),
      endDate: new FormControl(this.startDate, [Validators.required]),
      economyOfToken: new FormControl(null, ),
      totalValue: new FormControl(null, ),
      tokensPerClaim: new FormControl(null, ),
      estimatedValue: new FormControl(null, ),
      description: new FormControl(null, ),
      commentBlock: new FormControl(null, ),
      requirements: new FormControl([]),
      howToGetToken: new FormControl([]),
      projectLinks: new FormControl([]),
    });
  }

  onSubmitAddAirdrop() {
    if (this.formAddAirdrop.invalid) {
      this.formInvalidaAfterSubmit = true;
    } else {
      const formModel = this.prepareSave();
      this.airdropService.addAirdrop(formModel).subscribe(
        response => {
          console.log(response);
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
      this.formAddAirdrop.get('image').setValue(file);

      reader.onload = () => {
        this.imageReader = reader.result;
      };
      reader.readAsDataURL(file);
      this.cd.markForCheck();
    }
  }

  prepareSave() {
    this.formAddAirdrop.get('howToGetToken').setValue(this.addedHTG);
    this.formAddAirdrop.get('projectLinks').setValue(this.addedProjectLinks);
    let input = new FormData();
    for (const field in this.formAddAirdrop.controls) {
      input.append(field, this.formAddAirdrop.get(field).value);
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


