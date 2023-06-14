import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexTitleSubtitle,
  ApexDataLabels,
  ApexChart,
  ApexPlotOptions,
  ApexLegend,
  ChartComponent
} from "ng-apexcharts";
import { GroupedSeries } from '../bar-graph/bar-graph.component';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  title: ApexTitleSubtitle;
  plotOptions: ApexPlotOptions;
  legend: ApexLegend;
  colors: string[];
};

export interface TreeMapSeries {
    name: String,
    data: [
      {
        x: String,
        y: Number
      }
    ]
}

@Component({
  selector: 'app-tree-map',
  templateUrl: './tree-map.component.html',
  styleUrls: ['./tree-map.component.scss']
})
export class TreeMapComponent implements OnInit {
@ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  @Input() name: string;
  // @Input() categories: string[];
  // @Input() data: number[];
  @Input() groupedSeries: ApexAxisChartSeries;
  title!: ApexTitleSubtitle
  chartData: GroupedSeries[]

  isDistributed = true

  constructor() {
  }

  ngOnInit(): void {
    console.log('groupedSeries', this.groupedSeries)

    this.chartOptions = {
      series: this.groupedSeries,
      legend: {
        show: true
      },
      chart: {
        height: 350,
        type: "treemap"
      },
      // title: {
      //   text: "Multi-dimensional Treemap",
      //   align: "center"
      // }
    };
  }
}
