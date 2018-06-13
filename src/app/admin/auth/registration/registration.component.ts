import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  registrationForm: FormGroup;
  messageFromServer = '';

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.registrationForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      passwordConfirmed: new FormGroup({
        password: new FormControl('', [Validators.required]),
        passwordConfirm: new FormControl('', [Validators.required])
      }, this.passwordMatchValidator)
    });
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('passwordConfirm').value
      ? null : {'mismatch': true};
  }

  onSubmit() {
    const email = this.registrationForm.get('email').value;
    const password = this.registrationForm.get('passwordConfirmed.password').value;
    this.authService.signUp(email, password).subscribe(
      response => {
        console.log('Успешная регистрация');
        this.router.navigate(['/admin/login'], {queryParams: {'afterRegistration': true}});
      },
      error => {
        console.log('Error SignIn', error);
        this.messageFromServer = error.error.message;
      }
    );
  }

}
