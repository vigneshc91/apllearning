import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Rx';

import { LoginModel } from './model/login.model';
import { ServiceResponse } from './model/service-response.model';
import { LoginLogoutService } from './service/login-logout.service';
import { UserService } from './service/user.service';
import { AppConstants } from './helper/app.constants';
import { DashboardComponent } from './superAdmin/dashboard.component';

@Component({
  selector: 'login-section',
  templateUrl:'/apllearning/resources/views/login.component.html',
  providers: [ LoginLogoutService, UserService ]
})

export class LoginComponent {
    loginForm: FormGroup;
    userLoginFailureMessage:boolean = false;
    message:string;

    constructor(private router: Router, fb: FormBuilder, private loginLogoutService: LoginLogoutService, private userService: UserService){
        this.getLoggedInUser();
        this.loginForm = fb.group({
            'user_name': [null, Validators.required],
            'password': [null, Validators.required]
        });
    }

    getLoggedInUser(){
        let response:Observable<ServiceResponse>;
        response = this.userService.getLoggedInUser();
        response.subscribe(
            data => {
                if(data.status){
                    this.redirectUser(data.result.user_type);
                }
            },
            err => {
                console.log(err);
            }
        );
    }

    login(value: LoginModel){
        let response:Observable<ServiceResponse>;
        if(this.loginForm.valid){
            response = this.loginLogoutService.login(value);
            response.subscribe(
                data => {
                    if(data.status){
                        this.redirectUser(data.result);
                    } else {
                        this.userLoginFailureMessage = true;
                        this.message = data.result;
                        setTimeout(function() {
                            this.userLoginFailureMessage = false;
                        }.bind(this), 3000);
                    }
                },
                err => {
                    console.log(err);
                }
            );
        }        
    }

    redirectUser(userType:number){
        switch (userType) {
            case AppConstants.USER_TYPE.SuperAdmin:
                // location.href = "superAdmin/dashboard";
                this.router.navigate(['apllearning/superAdmin/dashboard']);
                break;
            case AppConstants.USER_TYPE.Admin:
                // location.href = "admin/dashboard";
                this.router.navigate(['apllearning/admin/dashboard']);
                break;
            case AppConstants.USER_TYPE.Teacher:
                // location.href = "teacher/dashboard";
                this.router.navigate(['apllearning/teacher/dashboard']);
                break;
            case AppConstants.USER_TYPE.Student:
                // location.href = "student/dashboard";
                this.router.navigate(['apllearning/student/dashboard']);
                break;
        }
    }

    logout(){
        let response:Observable<ServiceResponse>;
        response = this.loginLogoutService.logout();
        response.subscribe(
            data => {
                if(data.status){
                    console.log(data.result);
                } else {
                    console.log(data.result);
                }
            },
            err => {
                console.log(err);
            }
        );
    }
 }
