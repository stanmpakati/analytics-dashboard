import { Component, ViewChild } from "@angular/core";
import { ChartComponent } from "ng-apexcharts";
import { PieChartOptions } from "../core/models/chart-options";



@Component({
  selector: 'app-device-type',
  templateUrl: './device-type.component.html',
  styleUrls: ['./device-type.component.scss']
})
export class DeviceTypeComponent {
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: Partial<PieChartOptions>;

  constructor() {
    this.chartOptions = {
      series: this.getSeries(),
      labels: this.getLabels(),
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

  getSeries() {
    return [10, 55, 41, 17, 15]
  }

  getLabels() {
    return ["Mobile", "Desktop", "Tablet", "Unknown", "Others"]
  }
}
