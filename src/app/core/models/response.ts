export interface ReferrerResponse {
  name: string;
  count: number;
}

export interface MetricsOverviewResponse {
  visits: number,
  uniqueVisitors: number,
  devices: number,
  averageVisitDuration: number,
}

export interface ChartSeries {
  labels: string[];
  data: any[]
}