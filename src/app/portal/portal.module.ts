import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { PortalRoutingModule } from './portal-routing.module';
import { PortalComponent } from './portal.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { DeviceTypeComponent } from '../device-type/device-type.component';
import { OsComponent } from '../os/os.component';
import { PageViewsComponent } from '../page-views/page-views.component';
import { ReferrersComponent } from '../referrers/referrers.component';



@NgModule({
  declarations: [
    PortalComponent,
    DashboardComponent,
    DeviceTypeComponent,
    ReferrersComponent,
    PageViewsComponent,
    OsComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    PortalRoutingModule,
    NgApexchartsModule,
  ]
})
export class PortalModule { }
