import { Component, ViewChild } from "@angular/core";
import {ChartComponent} from "ng-apexcharts";


@Component({
  selector: 'app-referrers',
  templateUrl: './referrers.component.html',
  styleUrls: ['./referrers.component.scss']
})
export class ReferrersComponent {
  c = [
          "Google",
          "none",
          "Facebook",
          "Twitter"
        ]

  getData =[300, 120, 90, 50];
  

  getCategories() {
    return [
          "Google",
          "none",
          "Facebook",
          "Twitter"
        ];
  }
}
