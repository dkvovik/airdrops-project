import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MatSliderModule, MatTabsModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomePageComponent } from './home-page/home-page.component';
import { AppRoutingModule } from './app.routing';
import { RouterModule } from '@angular/router';
import { FilterComponent } from './filter/filter.component';
import { AirdropService } from './services/airdrop.service';
import { HttpClientModule } from '@angular/common/http';
import { FindAirdropComponent } from './find-airdrop/find-airdrop.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomePageComponent,
    FilterComponent,
    FindAirdropComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    MatTabsModule,
    BrowserAnimationsModule,
    MatSliderModule
  ],
  providers: [AirdropService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
