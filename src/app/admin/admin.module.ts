import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatTabsModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AdminRoutingModule } from './admin.routing';
import { AdminComponent } from './admin.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { FilterComponent } from './filter/filter.component';
import { AirdropService } from './services/airdrop.service';
import { BsDatepickerModule, ModalModule, PopoverModule } from 'ngx-bootstrap';
import { FormAddAirdropComponent } from './form-add-airdrop/form-add-airdrop.component';
import { Globals } from './shared/globals';
import { ClipboardModule } from 'ngx-clipboard';
import { TagInputModule } from 'ngx-chips';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { FormEditAirdropComponent } from './form-edit-airdrop/form-edit-airdrop.component';
import { NouisliderModule } from 'ng2-nouislider';
import { AuthModule } from './auth/auth.module';
import { TokenInterceptor } from './auth/token.interceptor';
import { LoggedGuard } from './guard/logged.service';
import { AuthGuard } from './guard/auth-guard.service';
import { AuthService } from './services/auth.service';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    AdminComponent,
    HeaderComponent,
    FooterComponent,
    FilterComponent,
    FormAddAirdropComponent,
    AdminPageComponent,
    FormEditAirdropComponent
  ],
  entryComponents: [
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    AdminRoutingModule,
    MatTabsModule,
    // BrowserAnimationsModule,
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
    ReactiveFormsModule,
    PopoverModule.forRoot(),
    ClipboardModule,
    TagInputModule,
    NouisliderModule,
    AuthModule
  ],
  providers: [Globals, AirdropService, AuthService, AuthGuard, LoggedGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ]
})
export class AdminModule {
}
