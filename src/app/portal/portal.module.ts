import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { PortalRoutingModule } from './portal-routing.module';
import { PortalComponent } from './portal.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { DeviceTypeComponent } from '../device-type/device-type.component';
import { OsComponent } from '../os/os.component';
import { PageViewsComponent } from '../page-views/page-views.component';
import { ReferrersComponent } from '../referrers/referrers.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormCoreModule } from '../shared/mat-form-core.module';
import { MatNativeDateModule } from '@angular/material/core';
import { BrowsersComponent } from './browsers/browsers.component';
import { NewVisitorsComponent } from './new-visitors/new-visitors.component';


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
  ],
  imports: [
    CommonModule,
    SharedModule,
    PortalRoutingModule,
    NgApexchartsModule,
    ReactiveFormsModule,

    MatFormCoreModule,
    MatButtonToggleModule,
    MatDatepickerModule,
    MatNativeDateModule
  ]
})
export class PortalModule { }
