import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-browsers',
  templateUrl: './browsers.component.html',
  styleUrls: ['./browsers.component.scss']
})
export class BrowsersComponent implements OnInit {
  c = [
          "Google Chrome",
          "Microsoft Edge",
          "Safari",
          "Mozilla Firefox",
          "Opera"
        ]

  getData =[300, 200, 69, 50, 5];
  

  getCategories() {
    return this.c;
  }
  
  constructor() { }

  ngOnInit(): void {
  }

}
