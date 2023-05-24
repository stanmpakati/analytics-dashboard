import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgApexchartsModule } from 'ng-apexcharts';
import { DeviceTypeComponent } from './device-type/device-type.component';
import { ReferrersComponent } from './referrers/referrers.component';
import { PageViewsComponent } from './page-views/page-views.component';
import { OsComponent } from './os/os.component';
import { BarGraphComponent } from './shared/components/bar-graph/bar-graph.component';

@NgModule({
  declarations: [
    AppComponent,
    DeviceTypeComponent,
    ReferrersComponent,
    PageViewsComponent,
    OsComponent,
    BarGraphComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgApexchartsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
