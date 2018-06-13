import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class LoggedGuard {

  constructor(private authService: AuthService,
              private router: Router) { }

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/admin/dashboard']);
      return false;
    }
    return true;
  }

}
