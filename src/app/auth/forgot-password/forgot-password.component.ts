import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@ui-core-services/auth.service';
// import { CoreServiceResponseBody } from '@ui-core/models/response-body';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  email!: FormControl;
  submitted = false;
  isLoading = false;
  error: { error: boolean, message: string };
  response: any = null;
  forgotPasswordForm!: FormGroup;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.email = new FormControl(null, {
      validators: [Validators.required, Validators.email],
      updateOn: 'blur',
    });

    this.forgotPasswordForm = new FormGroup({
      email: this.email
    })
  }

  onSubmitEmail() {
    this.submitted = true;
    this.forgotPasswordForm.markAllAsTouched();
    if (this.forgotPasswordForm.invalid) {
      this.submitted = false;
      return;
    }
    this.isLoading = true;

    this.authService.forgotPassword(this.email.value).subscribe({
      next: res => {
        console.log({ res })
        this.isLoading = false;

        this.email.disable();
        this.response = res;
      },
      error: err => {
        this.error = {
          error: true,
          message: err.message
        }
      }
    });

  }

}
