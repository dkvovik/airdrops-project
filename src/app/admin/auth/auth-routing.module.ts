import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoggedGuard } from '../guard/logged.service';

const appRoutes: Routes = [
  { path: '', component: AuthComponent, canActivate: [LoggedGuard], children: [
      { path: 'login', component: LoginComponent },
      { path: 'registration', component: RegistrationComponent }
  ]}
];

@NgModule({
  imports: [
    RouterModule.forChild(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AuthRoutingModule { }
