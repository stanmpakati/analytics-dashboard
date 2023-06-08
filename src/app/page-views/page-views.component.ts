import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-views',
  templateUrl: './page-views.component.html',
  styleUrls: ['./page-views.component.scss']
})
export class PageViewsComponent implements OnInit {
  @Input() startDate!: Date
  @Input() endDate!: Date
  categories = ['2008', '2009', '2010', '2011', '2012', '2013', '2014']

  constructor() { }

  ngOnInit(): void {
    console.log('starts')
    console.log(this.startDate)
  }

  ngOnChanges() {
    // console.log('new start date', this.startDate)
  }


  getUniqueVisitors() {
    return [44, 55, 41, 37, 22, 43, 21];
  }
  
  getPageViews() {
    return [53, 32, 33, 52, 13, 43, 32];
  }
}
