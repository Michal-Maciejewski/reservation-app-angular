import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { FormControl,FormGroup,Validators,FormBuilder } from '@angular/forms';
import { MatDatepicker } from "@angular/material/datepicker";
import { BehaviorSubject, first, observable, Observable, of } from "rxjs";

@Component({templateUrl: 'reservation.compnent.html'})
export class ReservationComponent implements OnInit, AfterViewInit{
  public selectable = true;
  public submitted = false;
  public dateSelected = false;
  public sittingSelected = false;
  public timeSelected = false;
  public loading = false;
  public error = '';
  public sittingTimes:string[] = [];
  public sittingTimesOb$:BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  public sittingTypeOb$:BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

  reservationForm!: FormGroup;
  picker!: MatDatepicker<Date>;

  public dates = this.getDates();

  myFilter = (d: Date | null): boolean => {
    // Only allow dates in `validDates`.
    return this.dates.findIndex((valid_date) => d?.toDateString() === valid_date.toDateString()) > -1
  };

  getDates():Date[]{
    var dates:Date[] = [];
    for(var i = 0; i < 30; i++)
    {
      var date = new Date();
      date.setDate(date.getDate() + i);
      dates.push(date);
    }
    return dates;
  }

  firstFormGroup = this._formBuilder.group({
    amountOfGuests:[1, Validators.required],
    date:['', Validators.required],
    sitting:['', Validators.required],
    pick:['', Validators.required]
  });
  secondFormGroup = this._formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phoneNumber: ['', Validators.required]
  });
  isEditable = false;

  constructor(private _formBuilder: FormBuilder) {
    
  }

  ngAfterViewInit(): void {
  }

  // convenience getter for easy access to form fields
  get f() { return this.firstFormGroup.controls; }
  get f2() { return this.secondFormGroup.controls; }

  ngOnInit() {
    
  }

  getDate()
  {
    if(this.firstFormGroup.controls.date.value != null)
    {
      return new Date(this.firstFormGroup.controls.date.value).toDateString();
    }
    return "";
  }

  selectDate()
  {
    this.dateSelected = true;
    this.sittingSelected = false;
    this.timeSelected = false;
    this.firstFormGroup.controls.sitting.setValue('');
    this.firstFormGroup.controls.pick.setValue('');

    this.sittingTypeOb$.next(['Breakfast','Lunch','Dinner']);

  }

  selectSitting()
  {
    this.sittingSelected = true;
    this.firstFormGroup.controls.pick.setValue('');
    this.sittingTimesOb$.next(['9:00','9:30', '10:00', '10:30']);
    this.timeSelected = false;
  }

  selectTime()
  {
    this.timeSelected = true;
  }
  
}