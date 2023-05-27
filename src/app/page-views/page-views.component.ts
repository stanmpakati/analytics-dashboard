import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-views',
  templateUrl: './page-views.component.html',
  styleUrls: ['./page-views.component.scss']
})
export class PageViewsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  getUniqueVisitors() {
    return [44, 55, 41, 37, 22, 43, 21];
  }
  
  getPageViews() {
    return [53, 32, 33, 52, 13, 43, 32];
  }
}
