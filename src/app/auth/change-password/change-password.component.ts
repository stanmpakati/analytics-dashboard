import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '@ui-core-services/auth.service';
import { CustomValidatorService } from '@ui-core-services/custom-validator.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  hidePassword = true;
  submitted = false;
  token: string;
  isLoading = false;
  error: { error: boolean, message: string };
  password!: FormControl;
  confirmPassword!: FormControl;
  changePasswordForm!: FormGroup;

  constructor(private authService: AuthService, private route: ActivatedRoute, private customValidator: CustomValidatorService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.token = params['token'];
    })

    this.password = new FormControl('', {
      validators: Validators.compose([
        Validators.required,
        this.customValidator.patternValidator(),
      ]),
      updateOn: 'blur',
    });
    this.confirmPassword = new FormControl('', {
      validators: Validators.required,
      updateOn: 'blur',
    });

    this.changePasswordForm = new FormGroup({
      password: this.password,
      confirmPassword: this.confirmPassword,
    },
      this.customValidator.MatchPassword
    );
  }


  onSubmitPassword() {
    this.submitted = true;
    this.changePasswordForm.markAllAsTouched();
    if (this.changePasswordForm.invalid) {
      this.submitted = false;
      return;
    }
    this.isLoading = true;

    // this.authService.changePasswordToken(this.password.value, this.token).subscribe({
    //   next: res => {
    //     console.log({ res })
    //     this.isLoading = false;
    //   },
    //   error: err => {
    //     this.error = {
    //       error: true,
    //       message: err.message
    //     }
    //   }
    // });

  }

}
