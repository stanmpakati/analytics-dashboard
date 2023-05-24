import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { PieChartOptions } from '@ui-core-model/chart-options';
import { ChartComponent } from 'ng-apexcharts';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit {
@ViewChild("chart") chart!: ChartComponent;
@Input() name: string;
@Input() categories: string[];
@Input() data: number[];
  public chartOptions: Partial<PieChartOptions>;

  ngOnInit() {
    this.chartOptions = {
      series: this.data,
      labels: this.categories,
      chart: {
        width: 380,
        type: "pie"
      },
      dataLabels: {
        enabled: true
      },
      fill: {
        type: "gradient"
      },
      legend: {
        formatter: function (val, opts) {
          return val + " - " + opts.w.globals.series[opts.seriesIndex];
        }
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
  }
}
