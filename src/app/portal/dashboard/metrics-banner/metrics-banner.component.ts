import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MetricsOverviewResponse } from '@ui-core-model/response';
import { AnalyticsService } from '@ui-core-services/analytics.service';

@Component({
  selector: 'app-metrics-banner',
  templateUrl: './metrics-banner.component.html',
  styleUrls: ['./metrics-banner.component.scss']
})
export class MetricsBannerComponent implements OnInit {
  @Input() startDate!: Date
  @Input() endDate!: Date
  @Output() hasData = new EventEmitter<boolean>();
  @Output() isLoading = new EventEmitter<boolean>();
  presentData!: MetricsOverviewResponse
  previousData!: MetricsOverviewResponse

  constructor(
    public analyticsService: AnalyticsService,
    private cdr: ChangeDetectorRef,
    ) { }

  ngOnInit(): void {
  }

  ngOnChanges() {
    if (this.startDate && this.endDate) {
      this.isLoading.emit(true)
      this.analyticsService.getMetricsOverview(this.startDate, this.endDate)
        .subscribe({
          next: (data: MetricsOverviewResponse[]) => {
            this.isLoading.emit(false)
            this.presentData = data[0]

            if (this.presentData?.visits) {
              this.hasData.emit(false)
            } else {
              this.hasData.emit(true)
            }
          },
          error: (error: any) => {
            this.hasData.emit(true)
            this.isLoading.emit(true)
          }
        })
    }
    // resend data but with a period difference of the previous period
    // get new start and end dates
  //   Date newStartDate = 

  //   Date difference = this.endDate - this.startDate;
  //   this.analyticsService.getMetricsOverview(this.startDate, this.endDate)
  //     .subscribe(data => this.presentData = data[0])
    this.cdr.detectChanges();

  }

  
  millisToMinutesAndSeconds(millis: number) {
    var minutes = Math.floor(millis / 60000);
    var seconds = +((millis % 60000) / 1000).toFixed(0);
    
    if (seconds < 60) {
      return seconds + 's'
    }
    
    return minutes + "m:" + (seconds < 10 ? '0' : '') + seconds + 's';
  }


}
