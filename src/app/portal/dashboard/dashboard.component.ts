import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  filterByControl!: FormControl
  timePeriodControl!: FormControl
  // date picker
  reportRange!: FormGroup
  startDateControl!: FormControl
  endDateControl!: FormControl
  today = new Date();

  constructor() { }

  ngOnInit(): void {
    this.filterByControl = new FormControl('week')
    this.timePeriodControl = new FormControl('daily')
    
    this.startDateControl = new FormControl()
    this.endDateControl = new FormControl(this.today);

    if(this.filterByControl.value === 'day') {
      this.timePeriodControl.setValue('hourly')
      // set start date to the day before
      this.endDateControl.setValue(new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate() - 1))
    } else if(this.filterByControl.value === 'week') {
      this.timePeriodControl.setValue('daily')
      // set start date to the week before
      this.startDateControl.setValue(new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate() - 7))      
    } else if (this.filterByControl.value === 'month') {
      this.timePeriodControl.setValue('weekly')
      this.startDateControl.setValue(new Date(this.today.getFullYear(), this.today.getMonth() - 1, this.today.getDate()))
    } else if (this.filterByControl.value === 'year') {
      this.timePeriodControl.setValue('monthly')
      this.startDateControl.setValue(new Date(this.today.getFullYear() - 1, this.today.getMonth(), this.today.getDate()))
    }  

    this.reportRange = new FormGroup({
      start: this.startDateControl,
      end: this.endDateControl
    });
  }

  // Function to listen to the date picker and change date range


}
