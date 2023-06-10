import { Component, Input, OnInit, ViewChild } from "@angular/core";
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexXAxis,
  ApexPlotOptions,
  ApexStroke,
  ApexTitleSubtitle,
  ApexYAxis,
  ApexTooltip,
  ApexFill,
  ApexLegend
} from "ng-apexcharts";

export type StackedBarChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
  tooltip: ApexTooltip;
  fill: ApexFill;
  legend: ApexLegend;
};

@Component({
  selector: 'app-stacked-bar',
  templateUrl: './stacked-bar.component.html',
  styleUrls: ['./stacked-bar.component.scss']
})
export class StackedBarComponent implements OnInit {
  public chartOptions: Partial<StackedBarChartOptions>;
  @ViewChild("chart") chart: ChartComponent;
  @Input() bottomData: number[]
  @Input() bottomTitle: string
  @Input() topData: number[]
  @Input() topTitle: string
  @Input() name: string
  @Input() categories: string[]

  ngOnInit(): void {
    this.chartOptions = {
      series: [
        {
          name: this.bottomTitle,
          data: this.bottomData
        },
        {
          name: this.bottomTitle,
          data: this.topData
        },
      ],
      chart: {
        type: "bar",
        height: 350,
        stacked: true
      },
      plotOptions: {
        bar: {
          horizontal: false
        }
      },
      stroke: {
        width: 1,
        colors: ["#fff"]
      },
      title: {
        text: this.name
      },
      xaxis: {
        categories: this.categories,
        // labels: {
        //   formatter: function(val) {
        //     return val + "K";
        //   }
        // }
      },
      yaxis: {
        title: {
          text: undefined
        }
      },
      tooltip: {
        y: {
          formatter: function(val) {
            return val + "K";
          }
        }
      },
      fill: {
        opacity: 1
      },
      legend: {
        position: "top",
        horizontalAlign: "left",
        offsetX: 40
      }
    };
  
  }

}
