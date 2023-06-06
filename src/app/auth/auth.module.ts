import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';

import { MatIconModule } from '@angular/material/icon';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AuthCardComponent } from './auth-card/auth-card.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { MatFormCoreModule } from '../shared/mat-form-core.module';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AuthComponent,
    ForgotPasswordComponent,
    AuthCardComponent,
    ChangePasswordComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,

    // Angular material modules
    MatFormCoreModule,
    MatDialogModule,
    MatIconModule,
  ]
})
export class AuthModule { }
