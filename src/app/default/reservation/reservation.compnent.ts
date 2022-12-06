import { Component, Input, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { FormControl,FormGroup,Validators,FormBuilder } from '@angular/forms';
import { BehaviorSubject, Observable } from "rxjs";

@Component({templateUrl: 'reservation.compnent.html'})
export class ReservationComponent implements OnInit{

  public dateSelected = false;
  public sittingSelected = false;
  public timeSelected = false;
  public loading = false;
  public error = '';
  public sittingsForDate = ['Breakfast', 'Lunch', 'Dinner'];
  public sittingTimes = ['9:00','9:30', '10:00', '10:30'];

  constructor(private formBuilder: FormBuilder)
  {

  }

  ngOnInit() {

  }

  selectDate()
  {
    this.dateSelected = true;
    this.sittingSelected = false;
    this.timeSelected = false;
  }

  selectSitting()
  {
    this.sittingSelected = true;
    this.timeSelected = false;
  }

  selectTime()
  {
    this.timeSelected = true;
  }
  
}