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

export interface PageViewsResponse {
  pageName: string,
  visits: number,
  uniqueVisits: number,
}

export interface ButtonClickResponse {
  page: string,
  clickCount: number,
  buttonName: string,
}

export interface LinkClickResponse {
  page: string,
  clickCount: number,
  linkName: string,
  linkDestination: string,
}

export interface LnkClickResponse {
  page: string,
  clickCount: number,
  linkName: string,
  linkDestination: string,
}
export interface ChartSeries {
  labels: string[];
  data: any[]
}