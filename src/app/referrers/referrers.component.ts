import { Component, Input } from "@angular/core";
import { ChartSeries } from "@ui-core-model/response";
import { AnalyticsService } from "@ui-core-services/analytics.service";


@Component({
  selector: 'app-referrers',
  templateUrl: './referrers.component.html',
  styleUrls: ['./referrers.component.scss']
})
export class ReferrersComponent {
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
      this.analyticsService.getReferrers(this.startDate, this.endDate)
      .subscribe(data => this.data = data)
    }
  }
}
