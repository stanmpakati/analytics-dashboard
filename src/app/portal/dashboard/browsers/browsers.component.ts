import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ChartSeries } from '@ui-core-model/response';
import { AnalyticsService } from '@ui-core-services/analytics.service';

@Component({
  selector: 'app-browsers',
  templateUrl: './browsers.component.html',
  styleUrls: ['./browsers.component.scss']
})
export class BrowsersComponent implements OnInit {
  @Input() startDate!: Date
  @Input() endDate!: Date
  @Input() timePeriod!: string
  
  data: ChartSeries
  name = "Device Type"

  constructor(
    public analyticsService: AnalyticsService,
    private cdr: ChangeDetectorRef,
  ) {  }

  ngOnInit(): void {
  }
    
  ngOnChanges() {
    if (this.startDate && this.endDate) {
      this.analyticsService.getBrowsers(this.startDate, this.endDate, this.timePeriod)
      .subscribe(data => this.data = data)
    }
    this.cdr.detectChanges();
  }
}
