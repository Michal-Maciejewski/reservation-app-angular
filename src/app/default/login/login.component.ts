import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { first } from 'rxjs/operators';

import { AuthenticationService } from "@app/_services";

@Component({templateUrl:'login.component.html'})
export class LoginComponent implements OnInit
{
    loginForm!: FormGroup;
    loading = false;
    submitted = false;
    error = '';

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService
    ) { 
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            email: ['test@gmail.com', Validators.required],
            password: ['test', Validators.required]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.error = '';
        this.loading = true;
        this.authenticationService.login(this.f['email'].value, this.f['password'].value)
            .pipe(first())
            .subscribe({
                next: () => {
                    // get return url from route parameters or default to '/'
                    var role = this.authenticationService.getRole();
                    const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/' + role;
                    if(role != undefined)
                    {
                        this.router.navigate([returnUrl]);
                    }
                    else
                    {
                        this.authenticationService.logOut();
                        this.router.navigate(['/']);
                    }
                },
                error: error => {
                    this.error = error;
                    this.loading = false;
                }
            });
    }
}