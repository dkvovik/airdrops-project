import { ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AirdropService } from '../services/airdrop.service';
import { Globals } from '../shared/globals';
import { Airdrop } from '../shared/models/airdrop';

@Component({
  selector: 'app-form-add-airdrop',
  templateUrl: './form-add-airdrop.component.html',
  styleUrls: ['./form-add-airdrop.component.scss']
})
export class FormAddAirdropComponent implements OnInit, OnDestroy {

  addedHTG = [];
  addedProjectLinks = [];
  requirementsView = [];

  isActiveAddLink = false;

  startDate = new Date();
  endDate: string;
  bsConfig = {
    containerClass: 'theme-default',
    dateInputFormat: 'DD MMMM YYYY',
    showWeekNumbers: false
  };

  formAddAirdrop: FormGroup;
  formInvalidaAfterSubmit = false;
  image = '';
  imageReader = '';

  claimButtonLink = '';

  autocompleteRequirements = ['Email', 'Twitter : Follow', 'Twitter : Retweet', 'Twitter : Tweet', 'Telegram : Join group', 'Telegram : Join channel', 'Reddit', 'Facebook : Follow', 'Facebook : Single share', 'Bitcointalk : Posting', 'Medium : Follow', 'Youtube', 'Steemit', 'Github', 'KYC', 'Google-Plus'];

  initValue: Airdrop = {};
  lastValueForm = {};

  successSubmit = false;
  responseErrorAirdropExist = '';

  @Input() modalRef: BsModalRef;

  @Output() addAirdrop: EventEmitter<any> = new EventEmitter();

  isOpenPopover = [];
  selectedText: string;
  currentIdHTG: any;

  constructor(private cd: ChangeDetectorRef,
              private airdropService: AirdropService,
              private globals: Globals) {
  }

  ngOnInit() {
    this.initValueAddForm();
    this.initFormAddAirdrop();
  }

  ngOnDestroy() {
    if (this.successSubmit) {
      localStorage.setItem('lastValueAddForm', JSON.stringify({}));
    } else {
      this.saveLastValue();
    }
  }

  initFormAddAirdrop() {
    this.formAddAirdrop = new FormGroup({
      image: new FormControl(null, [Validators.required]),
      tokenName: new FormControl(this.initValue.tokenName || '', [Validators.required]),
      projectName: new FormControl(this.initValue.projectName || '', [Validators.required]),
      firstName: new FormControl(this.initValue.firstName || '', [Validators.required]),
      lastName: new FormControl(this.initValue.lastName || '', [Validators.required]),
      email: new FormControl(this.initValue.email || '', [Validators.required, Validators.email]),
      assetId: new FormControl(this.initValue.assetId || ''),
      platform: new FormControl(this.initValue.platform || ''),
      website: new FormControl(this.initValue.website || ''),
      startDate: new FormControl(this.startDate, [Validators.required]),
      endDate: new FormControl(this.endDate || ''),
      totalValue: new FormControl(this.initValue.totalValue || ''),
      tokensPerClaim: new FormControl(this.initValue.tokensPerClaim || ''),
      estimatedValue: new FormControl(this.initValue.estimatedValue || ''),
      description: new FormControl(this.initValue.description || ''),
      commentBlock: new FormControl(this.initValue.commentBlock || ''),
      requirements: new FormControl(this.initValue.requirements || []),
      howToGetToken: new FormControl(null),
      projectLinks: new FormControl(null),
      claimButton: new FormControl(this.claimButtonLink)
    });
  }

  onSubmitAddAirdrop() {
    if (this.formAddAirdrop.invalid) {
      this.formInvalidaAfterSubmit = true;
    } else {
      const formModel = this.prepareSave();
      this.airdropService.addAirdrop(formModel).subscribe(
        response => {
          this.successSubmit = true;
          this.addAirdrop.emit();
          this.modalRef.hide();
        },
        error => {
          console.log(error);
          if (error.error.error.code === 3003) {
            this.formInvalidaAfterSubmit = false;
            this.responseErrorAirdropExist =  error.error.error.message;
          }
          this.formAddAirdrop.get('requirements').setValue(this.requirementsView);
        }
      );
    }
  }

  prepareSaveRequirements() {
    const selectedRequirements = this.formAddAirdrop.get('requirements').value;
    const finalRequirements = [];

    selectedRequirements.forEach( r => {
      const newRequirement = {};
      if (r.indexOf(' : ') === -1) {
        newRequirement['name'] = r;
        finalRequirements.push(newRequirement);
      } else {
        const newR = r.split(' : ');
        let index = 0;
        if (finalRequirements.length === 0 ) {
          newRequirement['name'] = newR[0];
          const fieldName = this.globals.camelize(newR[1]);
          newRequirement[fieldName] = true;
          finalRequirements.push(newRequirement);
        } else {
          finalRequirements.forEach( (fr) => {
            if (fr.name === newR[0]) {
              const field = this.globals.camelize(newR[1]);
              fr[field] = true;
              return;
            } else if (index === finalRequirements.length - 1) {
              newRequirement['name'] = newR[0];
              const field = this.globals.camelize(newR[1]);
              newRequirement[field] = true;
              finalRequirements.push(newRequirement);
            }
            ++index;
          });
        }
      }
    });
    return finalRequirements;
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
    this.requirementsView = this.formAddAirdrop.get('requirements').value;
    this.formAddAirdrop.get('requirements').setValue(this.prepareSaveRequirements());
    let input = new FormData();
    for (const field in this.formAddAirdrop.controls) {
      if (field === 'requirements' || field === 'projectLinks' || field === 'howToGetToken') {
        input.append(field, JSON.stringify(this.formAddAirdrop.get(field).value));
      } else if (field === 'claimButton' && this.addedHTG[0]) {
        const urlRegex = /(https?:\/\/[^\s]+)[\"]/g;
        const link = this.addedHTG[0].match(urlRegex);
        if (link) {
          this.claimButtonLink = link[0].slice(0, -1);
          const claimButton = {};
          claimButton['display'] = true;
          claimButton['text'] = 'Claim Airdrop';
          claimButton['link'] = this.claimButtonLink;
          input.append('claimButton', JSON.stringify(claimButton));
        } else {
          input.append('claimButton', JSON.stringify(this.claimButtonLink));
        }
      } else {
        input.append(field, this.formAddAirdrop.get(field).value);
      }
    }
    return input;
  }

  addHTG(input) {
    const value = input.value.trim();
    if (value) {
      this.addedHTG.push(value);
      input.value = '';
    }
  }
  removeAddedHTG(index) {
    this.addedHTG.splice(index, 1);
  }

  addProjectLink(input) {
    const value = input.value.trim();
    if (value) {
      this.addedProjectLinks.push(value);
      input.value = '';
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

  saveLastValue() {
    for (const field in this.formAddAirdrop.controls) {
      if (field === 'projectLinks' || field === 'howToGetToken' || field === 'image' || field === 'claimButton') {
        continue;
      }
      this.lastValueForm[field] = this.formAddAirdrop.get(field).value;
    }
    this.lastValueForm['projectLinks'] = this.addedProjectLinks;
    this.lastValueForm['howToGetToken'] = this.addedHTG;
    localStorage.setItem('lastValueAddForm', JSON.stringify(this.lastValueForm));
  }

  initValueAddForm() {
    if (JSON.parse(localStorage.getItem('lastValueAddForm'))) {
      this.initValue = JSON.parse(localStorage.getItem('lastValueAddForm'));
      if (this.initValue.howToGetToken) {
        this.addedHTG = this.initValue.howToGetToken;
      }
      if (this.initValue.projectLinks) {
        this.addedProjectLinks = this.initValue.projectLinks;
      }
      if (this.initValue.endDate) {
        this.endDate = this.initValue.endDate;
      }
      this.lastValueForm = this.initValue;
    }
  }
}


