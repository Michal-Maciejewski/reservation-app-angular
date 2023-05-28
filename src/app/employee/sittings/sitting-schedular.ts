import {Component, Inject, OnInit} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from "@angular/router";
import { first } from 'rxjs/operators';

import { AfterViewInit, Input, OnChanges, SimpleChanges } from "@angular/core";
import { MatDatepicker } from "@angular/material/datepicker";
import { BehaviorSubject, observable, Observable, of } from "rxjs";


@Component({
    selector: 'app-sitting-schedular',
    templateUrl: 'sitting-schedular.html',
  })

  
  export class DialogAnimationsExampleDialog {
    submitted = false;
    form!: FormGroup;

    constructor(private formBuilder: FormBuilder, public dialogRef: MatDialogRef<DialogAnimationsExampleDialog>, @Inject(MAT_DIALOG_DATA) public data: any) {

    }

    get f() { return this.form.controls; }

    ngOnInit() {
     
        this.form = this.formBuilder.group({
            title: '',
            start: '',
            end: '',
            sittingType: '',
            capacity: '',
            notes: ''
        });
    }
    onCloseDialog() {
        this.dialogRef.close();
    }
    submit() {
      this.dialogRef.close({data: this.form.value});
    }
  }
  