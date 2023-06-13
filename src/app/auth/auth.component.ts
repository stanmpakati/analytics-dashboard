import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '@ui-core-services/auth.service';
import { AuthDetails } from '@ui-core-model/user';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  submitted = false;
  loginForm!: FormGroup;
  private authStatusSub!: Subscription;
  returnUrl!: string;
  hidePassword = true;
  email!: FormControl;
  password!: FormControl;
  error: { error: boolean, message: string };

  constructor(private route: ActivatedRoute, public authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.email = new FormControl('', {
      validators: [Validators.required],
      updateOn: 'blur',
    });

    this.password = new FormControl('', {
      validators: [Validators.required],
      updateOn: 'change',
    });

    this.loginForm = new FormGroup({
      email: this.email,
      password: this.password,
    });

    // Get return route else set it as default
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '';
  }

  onLogin() {
    this.submitted = true;
    this.loginForm.markAllAsTouched();
    if (this.loginForm.invalid) {
      this.submitted = false;
      return;
    }

    const auth: AuthDetails = {
      username: this.email.value,
      password: this.password.value,
    };

    // this.password.reset()
    this.email.setErrors(null);
    this.password.setErrors(null);

    this.authService.loginUser(auth, this.returnUrl)
      .subscribe({
        next: data => {
          if (data) {
            this.submitted = false;
          } else {
            this.submitted = true;
          }
        },
        error: err => {
          this.submitted = false;
          this.error = {
            error: true,
            // message: err.message
            message: "Username or Password is incorrect"
          }
        }
      });
  }

  initForm() {
    this
  }
}
