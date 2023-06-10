import { Component, ViewChild } from "@angular/core";


@Component({
  selector: 'app-os',
  templateUrl: './os.component.html',
  styleUrls: ['./os.component.scss']
})
export class OsComponent {
  c = [
          "Windows",
          "Android",
          "iOS",
          "MacOS",
          "Linux"
        ]

  getData =[43, 32, 28, 7, 5];
  

  getCategories() {
    return this.c;
  }
  
}
