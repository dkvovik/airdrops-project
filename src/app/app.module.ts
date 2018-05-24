import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
import { DetailAirdropComponent, FindedAirdropComponent } from './finded-airdrop/finded-airdrop.component';
import { BsDatepickerModule, ModalModule } from 'ngx-bootstrap';
import { FormAddAirdropComponent } from './form-add-airdrop/form-add-airdrop.component';
import { Globals } from './shared/globals';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomePageComponent,
    FilterComponent,
    FindedAirdropComponent,
    FormAddAirdropComponent,
    DetailAirdropComponent
  ],
  entryComponents: [
    DetailAirdropComponent
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
    BsDatepickerModule.forRoot(),
    ReactiveFormsModule
  ],
  providers: [Globals, AirdropService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
