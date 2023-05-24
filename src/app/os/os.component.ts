import { Component, ViewChild } from "@angular/core";
import { PieChartOptions } from "@ui-core-model/chart-options";
import {
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexXAxis,
  ApexPlotOptions,
  ApexNonAxisChartSeries
} from "ng-apexcharts";

@Component({
  selector: 'app-os',
  templateUrl: './os.component.html',
  styleUrls: ['./os.component.scss']
})
export class OsComponent {
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: Partial<PieChartOptions>;

  constructor() {
    this.chartOptions = {
      labels: this.getLabels(),
      series: this.getSeries(),
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
        // formatter: function (val, opts) {
        //   return val + " - " + opts.w.globals.series[opts.seriesIndex];
        // }
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
    return [60, 28, 7, 1, 7]
  }

  getLabels() {
    return ["Google", "None", "Facebook", "Twitter", "Other"]
  }
}
