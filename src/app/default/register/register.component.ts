import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthenticationService, PatronService } from "@app/_services";
import { first } from "rxjs/operators";


@Component({templateUrl:'register.component.html'})
export class RegisterComponent{
    loginForm!: FormGroup;
    loading = false;
    submitted = false;
    error = '';

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private patronService: PatronService
    ) { 
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            firstName: ['test', Validators.required],
            lastName: ['User', Validators.required],
            email: ['test@gmail.com', Validators.required],
            password: ['test', Validators.required],
            phoneNumber: [''],
            confirmPassword: ['']
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
        this.patronService.registerPatron({email: this.f.email.value, firstName: this.f.firstName.value, lastName: this.f.lastName.value, password: this.f.password.value})
            .pipe(first())
            .subscribe({
                next: () =>{
                    
                },
                error: error =>{
                    this.error = error;
                    this.loading = false;
                }
            });
    }
}