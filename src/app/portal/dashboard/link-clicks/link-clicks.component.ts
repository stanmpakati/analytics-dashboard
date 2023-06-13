import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { AnalyticsService } from '@ui-core-services/analytics.service';
import { GroupedSeries } from 'src/app/shared/components/bar-graph/bar-graph.component';

@Component({
  selector: 'app-link-clicks',
  templateUrl: './link-clicks.component.html',
  styleUrls: ['./link-clicks.component.scss']
})
export class LinkClicksComponent implements OnInit {
@Input() startDate!: Date
  @Input() endDate!: Date
  @Input() timePeriod!: string
  
  data: {
    groupedSeries: GroupedSeries[];
    categories: string[];
}
  name = "Device Type"

  constructor(
    public analyticsService: AnalyticsService,
    private cdr: ChangeDetectorRef,
  ) {  }

  ngOnInit(): void {
  }
    
  ngOnChanges() {
    if (this.startDate && this.endDate) {
      this.analyticsService.getLinkClicks(this.startDate, this.endDate)
      .subscribe(data => this.data = data)
    }
    this.cdr.detectChanges();
  }
}
