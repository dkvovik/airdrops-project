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

  addedRequirements = [];
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

  @Input() modalRef: BsModalRef;

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
    });
  }

  onSubmitAddAirdrop() {
    console.log('this.formAddAirdrop', this.formAddAirdrop);

    if (this.formAddAirdrop.invalid) {
      this.formInvalidaAfterSubmit = true;
    } else {
      const data: Airdrop = {...this.formAddAirdrop.value};
      data.requirements = this.addedRequirements;
      data.howToGetToken = this.addedHTG;
      data.projectLinks = this.addedProjectLinks;
      data.socialNetworks = this.addedSocialNetworks;
      console.log('data', data);

      this.airdropService.addAirdrop(data).subscribe(
        responce => console.log(responce),
        error => console.log(error)
      );

    }


  }

  onFileChange(event) {
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

  addRequirement(value) {
    value = value.trim();
    if (value) {
      this.addedRequirements.push(value);
    }
  }
  removeAddedRequirement(index) {
    this.addedRequirements.splice(index, 1);
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
    }
    this.isActiveAddLink = false;
  }
  removeAddedProjectLink(index) {
    this.addedProjectLinks.splice(index, 1);
  }

}
