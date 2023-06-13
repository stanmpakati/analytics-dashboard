import { AnalyticsService } from '@ui-core-services/analytics.service';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ChartSeries } from '@ui-core-model/response';

@Component({
  selector: 'app-page-views',
  templateUrl: './page-views.component.html',
  styleUrls: ['./page-views.component.scss']
})
export class PageViewsComponent implements OnInit {
  @Input() startDate!: Date
  @Input() endDate!: Date
  @Input() timePeriod!: string
  data: ChartSeries

  categories = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep"
        ]

  constructor(
    private analyticsService: AnalyticsService,
    private cdr: ChangeDetectorRef,
) { }

  ngOnInit(): void {
  }

  ngOnChanges() {
    // console.log('new start date', this.startDate)
    if (this.startDate && this.endDate) {
      this.analyticsService.getPageViews(this.startDate, this.endDate)
        .subscribe(data => this.data = data)
    }
    this.cdr.detectChanges();
  }


  getUniqueVisitors() {
    return [44, 55, 41, 37, 22, 43, 21, 45, 60];
  }
  
  getPageViews() {
    return [53, 32, 33, 52, 13, 43, 32, 23, 39];
  }
}
