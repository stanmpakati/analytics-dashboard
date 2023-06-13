import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexXAxis,
  ApexPlotOptions,
  ApexNonAxisChartSeries,
  ApexFill,
  ApexLegend,
  ApexResponsive,
  ApexStroke,
  ApexYAxis,
  ApexTitleSubtitle,
  ApexTooltip
} from "ng-apexcharts";

export type BarChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  tooltip: ApexTooltip;
  colors: string[];
  title: ApexTitleSubtitle;
  subtitle: ApexTitleSubtitle;
};

// export type BarChartOptions = {
//   series: ApexAxisChartSeries;
//   stroke: ApexStroke,
//   chart: ApexChart;
//   dataLabels: ApexDataLabels;
//   plotOptions: ApexPlotOptions;
//   xaxis: ApexXAxis;
// };

export type PieChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  fill: ApexFill;
  legend: ApexLegend;
  dataLabels: ApexDataLabels;
};