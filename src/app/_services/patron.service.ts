import { HttpClient } from "@angular/common/http";
import { Router} from '@angular/router';
import { Injectable } from "@angular/core";
import { User } from "@app/_models/user";
import { environment } from "@environments/environment";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from 'rxjs/operators'
import { RegisterMemberModel } from "@app/_models/patron-register";

@Injectable({providedIn: 'root'})
export class PatronService{
    
    constructor(private router: Router, private httpClient: HttpClient)
    {

    }

    registerPatron(user: RegisterMemberModel)
    {
        debugger;
        return this.httpClient.post<RegisterMemberModel>(`${environment.ApiUrl}user/register-member`, user)
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                return user;
            }));
    }
}