import { TreeMapSeries } from './../../shared/components/tree-map/tree-map.component';
import { ButtonClickResponse, LinkClickResponse, MetricsOverviewResponse, PageViewsResponse, ReferrerResponse } from './../models/response';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, map, of } from 'rxjs';
import { ChartSeries } from '@ui-core-model/response';
import { RangeGroupType } from '@ui-core-model/time-period';
import { GroupedSeries } from 'src/app/shared/components/bar-graph/bar-graph.component';
import { ApexAxisChartSeries } from 'ng-apexcharts';

const analyticsUrl = `${environment.ANALYTICS_SERVICE_URL}`;
const clientUrl = `${environment.CLIENT_URL}`;

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  constructor(private http: HttpClient) { }
  
  public getReferrers(startDate: Date, endDate: Date): Observable<ChartSeries> {
    // return of([{"name":"DESKTOP","count":1}])
    // return of({
    //     labels: ["google.com", "", "facebook.com", "bing.com"],
    //     data: [18, 15, 7, 3]
    //   })
      return this.http.get<ReferrerResponse[]>(`${analyticsUrl}/analytics/referrer?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`)
        .pipe(map(data => {
          return {
            labels: data.map(d => d.name !== '' ? d.name : 'none'),
            data: data.map(d => d.count)
          }
        }));
  }

  public getOS(startDate: Date, endDate: Date, dateRange: string): Observable<ChartSeries> {

    // return of({labels: [
    //       "Windows",
    //       "Android",
    //       "iOS",
    //       "MacOS",
    //       "Linux"
    //     ], data: [43, 32, 28, 7, 5]})

      return this.http.get<ReferrerResponse[]>(
        `${analyticsUrl}/analytics/os?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}&dateRange=${dateRange}`)
        .pipe(map(data => {
          return {
            labels: data.map(d => d.name),
            data: data.map(d => d.count)
          }
        }))
  }

  public getBrowsers(startDate: Date, endDate: Date, dateRange: string): Observable<ChartSeries> {

    // return of({
    //   labels: [
    //     "Google Chrome",
    //     "Microsoft Edge",
    //     "Safari",
    //     "Mozilla Firefox",
    //     "Opera"
    //   ],      
    //   data: [300, 200, 69, 50, 5]
    // })
    
    return this.http.get<ReferrerResponse[]>(
        `${analyticsUrl}/analytics/browser?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}&dateRange=${dateRange}`)
        .pipe(map(data => {
          return {
            labels: data.map(d => d.name),
            data: data.map(d => d.count),
          }
        }))
  }

  public getNewVisitors(startDate: Date, endDate: Date, dateRange: string): Observable<ChartSeries> {
    // return of({
    //   labels: [
    //       "Jan",
    //       "Feb",
    //       "Mar",
    //       "Apr",
    //       "May",
    //       "Jun",
    //       "Jul",
    //       "Aug",
    //       "Sep"
    //     ],      
    //   data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
    // })

    return this.http.get<ReferrerResponse[]>(
      `${analyticsUrl}/analytics/visits-new?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}&dateRange=${dateRange}`)
      .pipe(map(data => {
        return {
          labels: data.map(d => d.name),
          data: data.map(d => d.count)
        }
      }))
  }

  public getDeviceType(startDate: Date, endDate: Date): Observable<ChartSeries> {
    // return of({
    //   labels: ["DESKTOP", "MOBILE", "TABLET"],
    //   data: [8, 5, 1]
    // })

    // Returns as List<ReferrerResponse> then convert to ChartSeries
    return this.http.get<ReferrerResponse[]>(
      `${analyticsUrl}/analytics/device-type?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`)
      .pipe(map(data => {
        return {
          labels: data.map(d => d.name),
          data: data.map(d => d.count)
        }
      }))
  }

  public getMetricsOverview(startDate: Date, endDate: Date): Observable<MetricsOverviewResponse[]> {
    // return of([{
    //       visits: 11,
    //       devices: 11,
    //       averageVisitDuration: 11000.0
    //     }])
    return this.http.get<MetricsOverviewResponse[]>(
      `${analyticsUrl}/analytics/?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`)
  }

  public getPageViews(startDate: Date, endDate: Date): Observable<ChartSeries> {
//     return of([
// 	{
// 		"pageName": "/",
// 		"visits": 6,
// 		"uniqueVisits": 3
// 	},
// 	{
// 		"pageName": "/index.html",
// 		"visits": 2,
// 		"uniqueVisits": 2
// 	},
// 	{
// 		"pageName": "/other.html",
// 		"visits": 2,
// 		"uniqueVisits": 2
// 	}
// ])
    return this.http.get<PageViewsResponse[]>(
      `${analyticsUrl}/analytics/pageviews?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`)
      .pipe(map(data => {
        return {
          labels: data.map(d => d.pageName.replace(clientUrl, '')),
          data: data.map(d => d.visits)
        }
      }))
  }

  public getButtonClicks(startDate: Date, endDate: Date) {  

  // return of({groupedSeries, categories})
    return this.http.get<ButtonClickResponse[]>(
      `${analyticsUrl}/analytics/button-clicks?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`)
      .pipe(map(res => {
        const categories: string[] = []
        res.map(r => {
          if (categories.indexOf(r.page) === -1) categories.push(r.page.replace(clientUrl, ''))
        })

        // map res and return a GroupedSeries
        const groupedSeries: GroupedSeries[] = res.map(r => {
          // if (categories.indexOf(r.page) === -1) categories.push(r.page)

          if (categories.indexOf(r.page) === -1) {
            return {
              name: '',
              data: []
            }
          } else { 
            return {
              name: r.buttonName,
              data: [r.clickCount]
            }
          }
        })
        return {groupedSeries, categories}
      }))
  }

  public getLinkClicks(startDate: Date, endDate: Date) {  

  // return of({groupedSeries, categories})
    return this.http.get<LinkClickResponse[]>(
      `${analyticsUrl}/analytics/link-clicks?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`)
      .pipe(map(res => {
        const categories: string[] = []
        res.map(r => {
          if (categories.indexOf(r.page) === -1) categories.push(r.page.replace(clientUrl, ''))
        })

        // map res and return a GroupedSeries
        const groupedSeries: GroupedSeries[] = res.map(r => {
          // if (categories.indexOf(r.page) === -1) categories.push(r.page)

          if (categories.indexOf(r.page) === -1) {
            return {
              name: '',
              data: []
            }
          } else { 
            return {
              name: r.linkName,
              data: [r.clickCount]
            }
          }
        })
        return {groupedSeries, categories}
      }))
  }



  public getLinkClicksTree(startDate: Date, endDate: Date): Observable<ApexAxisChartSeries> {  

    const clicks = [
	{
		page: "/",
		clickCount: 1,
		linkName: "ABOUT",
		linkDestination: "http://localhost:5500/about.html"
	},
	{
		page: "/",
		clickCount: 2,
		linkName: "My void link",
		linkDestination: "javascript:void(0)"
	},
	{
		page: "/",
		clickCount: 1,
		linkName: "Other page",
		linkDestination: "http://127.0.0.1:5500/other.html"
	},
	{
		page: "/",
		clickCount: 3,
		linkName: "Other page",
		linkDestination: "http://localhost:5500/other.html"
	},
	{
		page: "/about.html",
		clickCount: 1,
		linkName: "HOME",
		linkDestination: "http://localhost:5500/index.html"
	},
]

  // convert to TreeMapSeries
  // const treeMapSeries: ApexAxisChartSeries = clicks.map(c => {
  //   return {
  //     name: c.page.replace(clientUrl, ''),
  //     data: [
  //       {
  //         x: c.linkName,
  //         y: c.clickCount
  //       }
  //     ]
  //   }
  // })

  // return treeMapSeries;

    return this.http.get<LinkClickResponse[]>(
      `${analyticsUrl}/analytics/link-clicks?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`)
      .pipe(map(res => {
        const treeMapSeries: ApexAxisChartSeries = res.map(c => {
        // const categories: string[] = []
        // res.map(r => {
        //   if (categories.indexOf(r.page) === -1) categories.push(r.page.replace(clientUrl, ''))
        // })

        // if (categories.indexOf(c.page) === -1) {
        //     return {
        //       name: '',
        //       data: []
        //     }
        //   } 

        return {
            name: c.page.replace(clientUrl, ''),
            data: [
              {
                x: c.linkName,
                y: c.clickCount
              }
            ]
          }
        })
        return treeMapSeries
      }))
  }


  public getButtonClicksTree(startDate: Date, endDate: Date): Observable<ApexAxisChartSeries> {  

    return this.http.get<ButtonClickResponse[]>(
      `${analyticsUrl}/analytics/button-clicks?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`)
      .pipe(map(res => {
        const treeMapSeries: ApexAxisChartSeries = res.map(c => {
        // const categories: string[] = []
        // res.map(r => {
        //   if (categories.indexOf(r.page) === -1) categories.push(r.page.replace(clientUrl, ''))
        // })

        // if (categories.indexOf(c.page) === -1) {
        //     return {
        //       name: '',
        //       data: []
        //     }
        //   } 

        return {
            name: c.page.replace(clientUrl, ''),
            data: [
              {
                x: c.buttonName,
                y: c.clickCount
              }
            ]
          }
        })
        return treeMapSeries
      }))
  }
}

