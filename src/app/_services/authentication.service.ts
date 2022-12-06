import { HttpClient } from "@angular/common/http";
import { Router} from '@angular/router';
import { Injectable } from "@angular/core";
import { User } from "@app/_models/user";
import { environment } from "@environments/environment";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from 'rxjs/operators'

@Injectable({providedIn: 'root'})
export class AuthenticationService {
    
    private userSubject: BehaviorSubject<User | null>;
    public user: Observable<User | null>;
    
    constructor(private router: Router, private httpClient: HttpClient)
    {
        this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
        this.user = this.userSubject.asObservable();
    }

    public get authenticateUser()
    {
        return this.userSubject.value;
    }

    login(email: string, password: string)
    {
        return this.httpClient.post<any>(`${environment.ApiUrl}/token`, { email, password })
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
                this.userSubject.next(user);
                return user;
            }));
    }

    getRole() {

        var user = this.userSubject.getValue();
        if(user != undefined)
        {
            if(user.roles?.find((obj) =>{return obj === "patron";}))
            {
                return "patron";
            }

            if(user.roles?.find((obj) =>{return obj === "employee";}))
            {
                return "employee";
            }
        }
        return undefined;
    }

    logOut()
    {
        // remove user from local storage to log user out
        localStorage.removeItem('user');
        this.userSubject.next(null);
        this.router.navigate(['/']);
    }
}