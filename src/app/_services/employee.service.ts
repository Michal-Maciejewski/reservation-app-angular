import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Router} from '@angular/router';
import { User } from "@app/_models/user";
import { environment } from "@environments/environment";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from 'rxjs/operators'
import { IEmployeeTableData} from '@app/_models/iemployee-table-data';

@Injectable({providedIn: 'root'})
export class EmployeeService {

   private baseURL = 'https://random-data-api.com';
  
   constructor(private http: HttpClient) { }

   getRandomUsers(orderBy?: string, direction?: string, take?: number, skip?: number, search?: string): Observable<IEmployeeTableData> {
    const URL = `${this.baseURL}/employee/`;
    return this.http.get<IEmployeeTableData>(URL);
   }
}