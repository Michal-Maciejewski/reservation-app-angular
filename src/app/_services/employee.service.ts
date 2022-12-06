import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Router} from '@angular/router';
import { User } from "@app/_models/user";
import { environment } from "@environments/environment";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from 'rxjs/operators'
import { IRandomUsers } from '@app/_models/IRandomUsers';

@Injectable({providedIn: 'root'})
export class EmployeeService {

   private baseURL = 'https://random-data-api.com';
  
   constructor(private http: HttpClient) { }

   getRandomUsers(): Observable<IRandomUsers> {
    const URL = `${this.baseURL}/api/users/random_user?size=10`;
    return this.http.get<IRandomUsers>(URL);
   }
}