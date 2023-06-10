import { AnalyticsService } from '../../../core/services/analytics.service';
import { Component, Input, OnInit } from "@angular/core";
import { ChartSeries } from "@ui-core-model/response";

@Component({
  selector: 'app-device-type',
  templateUrl: './device-type.component.html',
  styleUrls: ['./device-type.component.scss']
})
export class DeviceTypeComponent implements OnInit {
  @Input() startDate!: Date
  @Input() endDate!: Date
  data: ChartSeries
  name = "Device Type"

  constructor(
    public analyticsService: AnalyticsService
  ) {  }

  ngOnInit(): void {
    // this.analyticsService.getDeviceType(this.startDate, this.endDate)
    //   .subscribe(data => this.data = data)
    }
    
    ngOnChanges() {
      console.log('called at init')
      // console.log('new start date', this.startDate)
      // console.log('new end date', this.endDate)
    if (this.startDate && this.endDate) {
      this.analyticsService.getDeviceType(this.startDate, this.endDate)
      .subscribe(data => this.data = data)
    }
  }
  

  // getSeries() {
  //   return [10, 55, 41, 17, 15]
  // }

  // getLabels() {
  //   return ["Mobile", "Desktop", "Tablet", "Unknown", "Others"]
  // }
}
