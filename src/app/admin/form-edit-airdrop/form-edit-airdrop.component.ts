import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AirdropService } from '../services/airdrop.service';
import { Globals } from '../shared/globals';
import { Airdrop } from '../../shared/models/airdrop';

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

  autocompleteRequirements = ['Email', 'Twitter : Follow', 'Twitter : Retweet', 'Twitter : Tweet', 'Telegram : Join group', 'Telegram : Join channel', 'Reddit', 'Facebook : Follow', 'Facebook : Single share', 'Bitcointalk : Posting', 'Medium : Follow', 'Youtube', 'Steemit', 'Github', 'KYC', 'Google-Plus'];

  requirementsView = [];

  @Input() modalRef: BsModalRef;
  @Input() airdrop: Airdrop;

  @Output() editAirdrop: EventEmitter<any> = new EventEmitter();

  isOpenPopover = [];
  isOpenPopoverTextarea = false;
  selectedText: string;
  currentIdHTG: any;

  responseErrorAirdropExist = '';
  errorAssetId = '';
  errorPlatform = false;
  errorHTG = false;

  estimatedValue = 0;

  constructor(private cd: ChangeDetectorRef,
              private airdropService: AirdropService,
              private globals: Globals) {
  }

  ngOnInit() {
    this.initFormAddAirdrop();
  }

  initFormAddAirdrop() {
    this.addedHTG = this.airdrop.howToGetToken || [];
    this.addedProjectLinks = this.airdrop.projectLinks || [];
    this.requirementsView = this.requirementsConvertToView(this.airdrop.requirements) || [];
    this.startDate = this.airdrop.startDate;
    this.endDate = this.airdrop.endDate;

    /*this.formEditAirdrop = new FormGroup({
      image: new FormControl(''),
      tokenName: new FormControl(this.airdrop.tokenName, [Validators.required]),
      projectName: new FormControl(this.airdrop.projectName, [Validators.required]),
      assetId: new FormControl(this.airdrop.assetId),
      platform: new FormControl(this.airdrop.platform),
      website: new FormControl(this.airdrop.website),
      startDate: new FormControl(this.airdrop.startDate, [Validators.required]),
      endDate: new FormControl(this.airdrop.endDate),
      totalValue: new FormControl(this.airdrop.totalValue),
      tokensPerClaim: new FormControl(this.airdrop.tokensPerClaim),
      estimatedValue: new FormControl(this.airdrop.estimatedValue),
      description: new FormControl(this.airdrop.description),
      commentBlock: new FormControl(this.airdrop.commentBlock),
      requirements: new FormControl(this.requirementsView),
      rating: new FormControl(this.airdrop.rating),
      tokenValue: new FormControl(this.airdrop.tokenValue),
      verified: new FormControl(this.airdrop.verified),
      howToGetToken: new FormControl(null),
      projectLinks: new FormControl(null),
      id: new FormControl(this.airdrop._id),
      claimButton: new FormControl(this.airdrop.claimButton),
      claimButtonDisplay: new FormControl(this.airdrop.claimButton.display),
      claimButtonText: new FormControl(this.airdrop.claimButton.text),
      claimButtonLink: new FormControl(this.airdrop.claimButton.link)
    });*/
    this.formEditAirdrop = new FormGroup({
      image: new FormControl(''),
      tokenName: new FormControl(this.airdrop.tokenName, [Validators.required]),
      projectName: new FormControl(this.airdrop.projectName, [Validators.required]),
      assetId: new FormControl(this.airdrop.assetId),
      platform: new FormControl(this.airdrop.platform),
      website: new FormControl(this.airdrop.website, [Validators.required]),
      startDate: new FormControl(this.airdrop.startDate, [Validators.required]),
      endDate: new FormControl(this.airdrop.endDate),
      totalValue: new FormControl(this.airdrop.totalValue, [Validators.required]),
      tokensPerClaim: new FormControl(this.airdrop.tokensPerClaim, [Validators.required]),
      estimatedValue: new FormControl(this.estimatedValue),
      description: new FormControl(this.airdrop.description, [Validators.required]),
      commentBlock: new FormControl(this.airdrop.commentBlock, [Validators.required]),
      requirements: new FormControl(this.requirementsView, [Validators.required]),
      rating: new FormControl(this.airdrop.rating),
      tokenValue: new FormControl(this.airdrop.tokenValue),
      verified: new FormControl(this.airdrop.verified),
      howToGetToken: new FormControl(null),
      projectLinks: new FormControl(null),
      id: new FormControl(this.airdrop._id),
      claimButton: new FormControl(this.airdrop.claimButton),
      claimButtonDisplay: new FormControl(this.airdrop.claimButton.display),
      claimButtonText: new FormControl(this.airdrop.claimButton.text),
      claimButtonLink: new FormControl(this.airdrop.claimButton.link)
    });
    if (this.formEditAirdrop.get('assetId').value) {
      this.getEstimateValue();
    }
  }

  onSubmitEditAirdrop() {
    if (this.formEditAirdrop.get('platform').value === null) {
      this.errorPlatform = true;
    } else {
      this.errorPlatform = false;
    }

    if (this.addedHTG.length === 0) {
      this.errorHTG = true;
    } else {
      this.errorHTG = false;
    }

    if (this.formEditAirdrop.invalid) {
      this.formInvalidaAfterSubmit = true;
    } else {
      const formModel = this.prepareSave();
      this.airdropService.updateAirdrop(formModel).subscribe(
        response => {
          this.editAirdrop.emit();
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
    this.formEditAirdrop.get('requirements').setValue(this.prepareSaveRequirements());
    this.formEditAirdrop.get('claimButton').setValue(this.prepareSaveClaimButton());
    const input = new FormData();
    for (const field in this.formEditAirdrop.controls) {
      if (field === 'requirements' || field === 'projectLinks' || field === 'howToGetToken' || field === 'claimButton') {
        input.append(field, JSON.stringify(this.formEditAirdrop.get(field).value));
      } else if (field === 'claimButtonDisplay' || field === 'claimButtonText' || field === 'claimButtonLink') {
        continue;
      } else {
        input.append(field, this.formEditAirdrop.get(field).value);
      }
    }
    return input;
  }

  deleteAirdrop(id) {
    this.airdropService.removeAirdrop(id).subscribe(
      response => {
        console.log('response deleteAirdrop', response);
        this.editAirdrop.emit();
        this.modalRef.hide();
      },
      error => console.log('error deleteAirdrop', error)
    );
  }

  addHTG(value) {
    value = value.trim();
    if (value) {
      this.addedHTG.push(value);
      if (this.errorHTG) {
        this.errorHTG = false;
      }
    }
  }
  removeAddedHTG(index) {
    this.addedHTG.splice(index, 1);
    if (this.addedHTG.length === 0) {
      this.errorHTG = true;
    }
  }
  editAddedHTG(index, text) {
    this.addedHTG[index] = text;
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

  selectedTextAdditionalComments() {
    this.selectedText = window.getSelection().toString();
    if (this.selectedText) {
      this.isOpenPopoverTextarea = true;
    } else {
      this.isOpenPopoverTextarea = false;
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

  stringToUrlInTextarea(url) {
    url = url.trim();
    if (!url) {
      this.isOpenPopoverTextarea = false;
      return false;
    }
    const commentBlock = this.formEditAirdrop.get('commentBlock').value;
    const startIndex = commentBlock.indexOf(this.selectedText);

    const beforeString = commentBlock.substring(0, startIndex);
    const afterString = commentBlock.substring(beforeString.length + this.selectedText.length);
    const stringToUrl = `${beforeString}<a href="${url}" target="_blank">${this.selectedText}</a>${afterString}`;

    this.formEditAirdrop.get('commentBlock').setValue(stringToUrl);
    this.isOpenPopoverTextarea = false;
  }

  prepareSaveRequirements() {
    const selectedRequirements = this.formEditAirdrop.get('requirements').value;
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

  requirementsConvertToView(requirements) {
    const arrRequirements = [];
    requirements.forEach( r => {
      let flagName = false;
      if (r.follow) {
        arrRequirements.push(`${r.name} : Follow`);
        flagName = true;
      }
      if (r.retweet) {
        arrRequirements.push(`${r.name} : Retweet`);
        flagName = true;
      }
      if (r.tweet) {
        arrRequirements.push(`${r.name} : Tweet`);
        flagName = true;
      }
      if (r.joinGroup) {
        arrRequirements.push(`${r.name} : Join group`);
        flagName = true;
      }
      if (r.joinChannel) {
        arrRequirements.push(`${r.name} : Join Channel`);
        flagName = true;
      }
      if (r.singleShare) {
        arrRequirements.push(`${r.name} : Single share`);
        flagName = true;
      }
      if (r.posting) {
        arrRequirements.push(`${r.name} : Posting`);
        flagName = true;
      }
      if (!flagName) {
        arrRequirements.push(`${r.name}`);
      }
    });
    return arrRequirements;
  }

  prepareSaveClaimButton() {
    const claimButton = {};
    claimButton['display'] = this.formEditAirdrop.get('claimButtonDisplay').value;
    claimButton['text'] = this.formEditAirdrop.get('claimButtonText').value;
    claimButton['link'] = this.formEditAirdrop.get('claimButtonLink').value;
    return claimButton;
  }

  getEstimateValue() {
    if (this.formEditAirdrop.get('assetId')['errors']) {
      return false;
    }
    this.airdropService.getEstimateValue(this.formEditAirdrop.get('assetId').value).subscribe(
      responseList => {
        console.log('responseList[0]', responseList[0]);
        console.log('responseList[1]', responseList[1]);
        this.errorAssetId = '';
        this.estimatedValue = responseList[0]['24h_vwap'] * responseList[1]['24h_vwap'];
      },
      error => {
        console.log('error', error);
        this.estimatedValue = 0;
        this.errorAssetId = error.error.message;
      }
    );
  }

  changePlatform(value) {
    if (value === null) {
      this.errorPlatform = true;
    } else {
      this.errorPlatform = false;
    }
    if (value !== 'Waves') {
      this.formEditAirdrop.get('estimatedValue').setValue(null);
      this.formEditAirdrop.get('assetId').setValue('');
    }
  }

  setEstimateValue() {
    if (!this.estimatedValue || !this.formEditAirdrop.get('tokensPerClaim').value) {
      return 0;
    }
    return this.estimatedValue * this.formEditAirdrop.get('tokensPerClaim').value;
  }
}


