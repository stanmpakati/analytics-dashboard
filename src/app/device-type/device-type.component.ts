import { AnalyticsService } from './../core/services/analytics.service';
import { Component, OnInit } from "@angular/core";
import { ChartSeries } from "@ui-core-model/response";



@Component({
  selector: 'app-device-type',
  templateUrl: './device-type.component.html',
  styleUrls: ['./device-type.component.scss']
})
export class DeviceTypeComponent implements OnInit {
  data: ChartSeries
  name = "Device Type"

  constructor(
    public analyticsService: AnalyticsService
  ) {  }

  ngOnInit(): void {
    this.analyticsService.getDeviceType(new Date(), new Date())
      .subscribe(data => this.data = data)
  }
  

  // getSeries() {
  //   return [10, 55, 41, 17, 15]
  // }

  // getLabels() {
  //   return ["Mobile", "Desktop", "Tablet", "Unknown", "Others"]
  // }
}
