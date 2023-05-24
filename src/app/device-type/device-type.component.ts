import { Component } from "@angular/core";



@Component({
  selector: 'app-device-type',
  templateUrl: './device-type.component.html',
  styleUrls: ['./device-type.component.scss']
})
export class DeviceTypeComponent {
  

  getSeries() {
    return [10, 55, 41, 17, 15]
  }

  getLabels() {
    return ["Mobile", "Desktop", "Tablet", "Unknown", "Others"]
  }
}
