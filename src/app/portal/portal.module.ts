import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { PortalRoutingModule } from './portal-routing.module';
import { PortalComponent } from './portal.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { DeviceTypeComponent } from './dashboard/device-type/device-type.component';
import { OsComponent } from './dashboard/os/os.component';
import { PageViewsComponent } from './dashboard/page-views/page-views.component';
import { ReferrersComponent } from '../referrers/referrers.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormCoreModule } from '../shared/mat-form-core.module';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { BrowsersComponent } from './dashboard/browsers/browsers.component';
import { NewVisitorsComponent } from './dashboard/new-visitors/new-visitors.component';
import { CreateUserComponent } from './users/create-user/create-user.component';
import { AllAdminUsersComponent } from './users/all-admin-users/all-admin-users.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MetricsBannerComponent } from './dashboard/metrics-banner/metrics-banner.component';


@NgModule({
  declarations: [
    PortalComponent,
    DashboardComponent,
    DeviceTypeComponent,
    ReferrersComponent,
    PageViewsComponent,
    OsComponent,
    BrowsersComponent,
    NewVisitorsComponent,
    CreateUserComponent,
    AllAdminUsersComponent,
    MetricsBannerComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    PortalRoutingModule,
    NgApexchartsModule,
    ReactiveFormsModule,

    MatDialogModule,
    MatSelectModule,
    MatFormCoreModule,
    MatButtonToggleModule,
    MatDatepickerModule,
    MatNativeDateModule
  ]
})
export class PortalModule { }
