import { ChangeDetectorRef, Component, Input, ViewChild } from "@angular/core";
import { ChartSeries } from "@ui-core-model/response";
import { AnalyticsService } from "@ui-core-services/analytics.service";


@Component({
  selector: 'app-os',
  templateUrl: './os.component.html',
  styleUrls: ['./os.component.scss']
})
export class OsComponent {
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
      this.analyticsService.getOS(this.startDate, this.endDate, this.timePeriod)
      .subscribe(data => this.data = data)
    }
    this.cdr.detectChanges();
  }
  
}
