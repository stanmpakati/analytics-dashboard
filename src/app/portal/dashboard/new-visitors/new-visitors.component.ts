import { Component, Input, OnInit } from '@angular/core';
import { ChartSeries } from '@ui-core-model/response';
import { AnalyticsService } from '@ui-core-services/analytics.service';

@Component({
  selector: 'app-new-visitors',
  templateUrl: './new-visitors.component.html',
  styleUrls: ['./new-visitors.component.scss']
})
export class NewVisitorsComponent implements OnInit {
  @Input() startDate!: Date
  @Input() endDate!: Date
  @Input() timePeriod!: string
  
  data: ChartSeries
  name = "Device Type"

  constructor(
    public analyticsService: AnalyticsService
  ) {  }

  ngOnInit(): void {
  }
    
  ngOnChanges() {
    if (this.startDate && this.endDate) {
      this.analyticsService.getNewVisitors(this.startDate, this.endDate, this.timePeriod)
      .subscribe(data => this.data = data)
    }
  }
}
