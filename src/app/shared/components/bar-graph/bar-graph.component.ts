import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { BarChartOptions } from '@ui-core-model/chart-options';
import { ChartComponent } from 'ng-apexcharts';

@Component({
  selector: 'app-bar-graph',
  templateUrl: './bar-graph.component.html',
  styleUrls: ['./bar-graph.component.scss']
})
export class BarGraphComponent implements OnInit {
  @ViewChild("chart") chart!: ChartComponent;
  @Input() name: string;
  @Input() categories: string[];
  @Input() data: number[];
  public chartOptions: Partial<BarChartOptions>;
  
  ngOnInit(): void {
    this.chartOptions = {
      series: [
        {
          name: this.name,
          data: this.data,
        }
      ],
      xaxis: {
        categories: this.categories
      },
      chart: {
        type: "bar",
        height: 350,
        width: "90%",
      },
      plotOptions: {
        bar: {
          horizontal: true
        }
      },
      dataLabels: {
        enabled: false
      }
    };
  }
}
