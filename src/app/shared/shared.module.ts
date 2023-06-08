import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";

import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BarGraphComponent } from './components/bar-graph/bar-graph.component';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';
import { StackedBarComponent } from './components/stacked-bar/stacked-bar.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { LineChartComponent } from './components/line-chart/line-chart.component';

@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    SidebarComponent,
    
    LineChartComponent,    
    BarGraphComponent,
    PieChartComponent,
    StackedBarComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,
    MatTableModule,
    MatSortModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    NgApexchartsModule,
  ],
  exports: [
    NavbarComponent,
    FooterComponent,
    SidebarComponent,

    LineChartComponent,    
    BarGraphComponent,
    PieChartComponent,
    StackedBarComponent
  ]
})
export class SharedModule { }
