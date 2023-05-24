import { Component, ViewChild } from "@angular/core";
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexXAxis,
  ApexPlotOptions
} from "ng-apexcharts";

export type BarChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
};

@Component({
  selector: 'app-referrers',
  templateUrl: './referrers.component.html',
  styleUrls: ['./referrers.component.scss']
})
export class ReferrersComponent {
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: Partial<BarChartOptions>;

  constructor() {
    this.chartOptions = {
      series: [
        {
          name: "basic",
          data: this.getData(),
        }
      ],
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
      },
      xaxis: {
        categories: this.getCategories()
      }
    };
  }

  getData() {
    return [300, 120, 90, 50];
  }

  getCategories() {
    return [
          "Google",
          "none",
          "Facebook",
          "Twitter"
        ]
      }
}
