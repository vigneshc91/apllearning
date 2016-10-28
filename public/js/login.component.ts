import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Rx';

import { LoginModel } from './model/login.model';
import { ServiceResponse } from './model/service-response.model';
import { LoginLogoutService } from './service/login-logout.service';
import { AppConstants } from './helper/app.constants';
import { DashboardComponent } from './superAdmin/dashboard.component';

@Component({
  selector: 'login-section',
  templateUrl:'/apllearning/resources/views/login.component.html',
  providers: [ LoginLogoutService ]
})

export class LoginComponent {
    loginForm: FormGroup;
    userLoginFailureMessage:boolean = false;
    message:string;

    constructor(fb: FormBuilder, private loginLogoutService: LoginLogoutService){
        this.loginForm = fb.group({
            'user_name': [null, Validators.required],
            'password': [null, Validators.required]
        });
    }

    login(value: LoginModel){
        let response:Observable<ServiceResponse>;
        if(this.loginForm.valid){
            response = this.loginLogoutService.login(value);
            response.subscribe(
                data => {
                    if(data.status){
                        switch (data.result) {
                            case AppConstants.USER_TYPE.SuperAdmin:
                                location.href = "superAdmin/dashboard";
                                break;
                            case AppConstants.USER_TYPE.Admin:
                                location.href = "admin/dashboard";
                                break;
                            case AppConstants.USER_TYPE.Teacher:
                                location.href = "teacher/dashboard";
                                break;
                            case AppConstants.USER_TYPE.Student:
                                console.log("Student");
                                break;
                        }
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
