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

  ngOnInit(): void {
    if(this.groupedSeries?.length > 0) {
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
