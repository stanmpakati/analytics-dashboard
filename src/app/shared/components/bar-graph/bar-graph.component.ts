import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { BarChartOptions } from '@ui-core-model/chart-options';
import { ApexTitleSubtitle, ChartComponent } from 'ng-apexcharts';

export interface GroupedSeries {
  name: string,
  data: number[]
}

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
  @Input() groupedSeries: GroupedSeries[];
  public chartOptions: Partial<BarChartOptions>;
  title!: ApexTitleSubtitle
  chartData: GroupedSeries[]

  isDistributed = true
  // name = 'index => category
  // login 78 => name
  // register 12 => data

  ngOnInit(): void {
    if(this.groupedSeries?.length > 0) {
      this.isDistributed = false
      this.chartData = this.groupedSeries
    } else {
      this.chartData = [
        {
          name: this.name,
          data: this.data,
        }
      ]
    }

    this.chartOptions = {
      series: this.chartData,
      stroke: {
        show: true,
        width: 1,
        colors: ["#fff"]
      },
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
          distributed: this.isDistributed,
          horizontal: true,
          dataLabels: {
            position: "bottom"
          }
        }
      },
      title: {
        text: 'this.name',
        align: "center",
        floating: false
      },
      subtitle: {
        text: "Category Names as DataLabels inside bars",
        align: "center"
      },
      dataLabels: {
        enabled: false
      }
    };
  }
}
