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
import { FindedAirdropComponent } from './finded-airdrop/finded-airdrop.component';
import { BsDatepickerModule, ModalModule, PopoverModule } from 'ngx-bootstrap';
import { FormAddAirdropComponent } from './form-add-airdrop/form-add-airdrop.component';
import { Globals } from './shared/globals';
import { ClipboardModule } from 'ngx-clipboard';
import { TagInputModule } from 'ngx-chips';
import { DetailInfoComponent } from './detail-info/detail-info.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { FilterAdminComponent } from './filter-admin/filter-admin.component';
import { FormEditAirdropComponent } from './form-edit-airdrop/form-edit-airdrop.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomePageComponent,
    FilterComponent,
    FindedAirdropComponent,
    FormAddAirdropComponent,
    DetailInfoComponent,
    AdminPageComponent,
    FilterAdminComponent,
    FormEditAirdropComponent
  ],
  entryComponents: [
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
    ReactiveFormsModule,
    PopoverModule.forRoot(),
    ClipboardModule,
    TagInputModule
  ],
  providers: [Globals, AirdropService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
