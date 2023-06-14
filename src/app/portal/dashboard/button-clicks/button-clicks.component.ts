import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ChartSeries } from '@ui-core-model/response';
import { AnalyticsService } from '@ui-core-services/analytics.service';
import { ApexAxisChartSeries } from 'ng-apexcharts';
import { GroupedSeries } from 'src/app/shared/components/bar-graph/bar-graph.component';

@Component({
  selector: 'app-button-clicks',
  templateUrl: './button-clicks.component.html',
  styleUrls: ['./button-clicks.component.scss']
})
export class ButtonClicksComponent implements OnInit {
  @Input() startDate!: Date
  @Input() endDate!: Date
  @Input() timePeriod!: string

  treeMapData: ApexAxisChartSeries
  
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
      this.analyticsService.getButtonClicks(this.startDate, this.endDate)
      .subscribe(data => this.data = data)
      
      this.analyticsService.getButtonClicksTree(this.startDate, this.endDate)
      .subscribe(data => this.treeMapData = data)
      
    }
    this.cdr.detectChanges();
    console.log(this.data)
  }
  
}
