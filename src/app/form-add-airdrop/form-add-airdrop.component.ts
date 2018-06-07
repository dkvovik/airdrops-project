import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AirdropService } from '../services/airdrop.service';
import { Globals } from '../shared/globals';

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

  claimButtonLink = '';

  autocompleteRequirements = ['Email', 'Twitter : Follow', 'Twitter : Retweet', 'Twitter : Tweet', 'Telegram : Join group', 'Telegram : Join channel', 'Reddit', 'Facebook : Follow', 'Facebook : Single share', 'Bitcointalk : Posting', 'Medium : Follow', 'Youtube', 'Steemit', 'Github', 'KYC', 'Google-Plus'];

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
    this.initFormAddAirdrop();
  }

  initFormAddAirdrop() {
    this.formAddAirdrop = new FormGroup({
      image: new FormControl(null, [Validators.required]),
      tokenName: new FormControl('', [Validators.required]),
      projectName: new FormControl('', [Validators.required]),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      assetId: new FormControl(''),
      platform: new FormControl(''),
      website: new FormControl(''),
      startDate: new FormControl(this.startDate, [Validators.required]),
      endDate: new FormControl(null),
      economyOfToken: new FormControl(''),
      totalValue: new FormControl(''),
      tokensPerClaim: new FormControl(null),
      estimatedValue: new FormControl(''),
      description: new FormControl(''),
      commentBlock: new FormControl(''),
      requirements: new FormControl([]),
      howToGetToken: new FormControl([]),
      projectLinks: new FormControl([]),
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
          this.addAirdrop.emit();
          this.modalRef.hide();
        },
        error => console.log(error)
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
    this.formAddAirdrop.get('requirements').setValue(this.prepareSaveRequirements());
    let input = new FormData();
    for (const field in this.formAddAirdrop.controls) {
      if (field === 'requirements' || field === 'projectLinks' || field === 'howToGetToken') {
        input.append(field, JSON.stringify(this.formAddAirdrop.get(field).value));
      } else if (field === 'claimButton') {
        const urlRegex = /(https?:\/\/[^\s]+)[\"]/g;
        const link = this.addedHTG[0].match(urlRegex);
        console.log('this.addedHTG[0]', this.addedHTG[0]);
        console.log('link[0]', link[0]);
        if (link[0]) {
          this.claimButtonLink = link[0].slice(0, -1);
          const claimButton = {};
          claimButton['display'] = true;
          claimButton['text'] = 'Claim Airdrop';
          claimButton['link'] = this.claimButtonLink;
          console.log('claimButton', claimButton);
          input.append('claimButton', JSON.stringify(claimButton));
        } else {
          continue;
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
      this.isOpenPopover.push('closed');
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
}


