import { RangeGroupType } from './../../core/models/time-period';
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

  rangeGroups: string [] = Object.keys(RangeGroupType)
  today = new Date();

  showAnalytics = false;
  isLoading = false;

  constructor() { }

  ngOnInit(): void {
    this.filterByControl = new FormControl('week')
    this.timePeriodControl = new FormControl('DAILY')
    
    this.startDateControl = new FormControl()
    this.endDateControl = new FormControl(this.today);

    this.setFormValuesFromToggle(this.filterByControl.value)

    this.reportRange = new FormGroup({
      start: this.startDateControl,
      end: this.endDateControl
    });

    
    this.filterByControl.valueChanges.subscribe((value) => {
       this.setFormValuesFromToggle(value)
    })
  }

  setFormValuesFromToggle(value: string) {
    if(value === 'day') {
      this.timePeriodControl.setValue('HOURLY')
      this.startDateControl.setValue(new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate() - 1))
    } else if(value === 'week') {
      this.timePeriodControl.setValue('DAILY')
      this.startDateControl.setValue(new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate() - 7))      
    } else if (value === 'month') {
      this.timePeriodControl.setValue('DAILY')
      this.startDateControl.setValue(new Date(this.today.getFullYear(), this.today.getMonth() - 1, this.today.getDate()))
    } else { // YEARLY
      this.timePeriodControl.setValue('MONTHLY')
      this.startDateControl.setValue(new Date(this.today.getFullYear() - 1, this.today.getMonth(), this.today.getDate()))
    } 
  }

  toggleShowAnalytics(hasData: boolean) {
    this.showAnalytics = hasData
  }

  toggleIsLoading(isLoading: boolean) {
    this.isLoading = isLoading
  }

}
