import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-views',
  templateUrl: './page-views.component.html',
  styleUrls: ['./page-views.component.scss']
})
export class PageViewsComponent implements OnInit {
  @Input() startDate!: Date
  @Input() endDate!: Date
  @Input() timePeriod!: string
  categories = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep"
        ]

  constructor() { }

  ngOnInit(): void {
    console.log('starts')
    console.log(this.startDate)
  }

  ngOnChanges() {
    // console.log('new start date', this.startDate)
  }


  getUniqueVisitors() {
    return [44, 55, 41, 37, 22, 43, 21, 45, 60];
  }
  
  getPageViews() {
    return [53, 32, 33, 52, 13, 43, 32, 23, 39];
  }
}
