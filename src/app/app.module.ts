import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { MatTabsModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RangeSliderModule } from 'ngx-rangeslider-component';

import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomePageComponent } from './home-page/home-page.component';
import { FilterComponent } from './filter/filter.component';
import { AirdropService } from './services/airdrop.service';
import { FindAirdropComponent } from './find-airdrop/find-airdrop.component';
import { BsDatepickerModule, ModalModule } from 'ngx-bootstrap';
import { FormAddAirdropComponent } from './form-add-airdrop/form-add-airdrop.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomePageComponent,
    FilterComponent,
    FindAirdropComponent,
    FormAddAirdropComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    MatTabsModule,
    BrowserAnimationsModule,
    RangeSliderModule,
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot()
  ],
  providers: [AirdropService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
