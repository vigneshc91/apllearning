import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Rx';

import { ServiceResponse } from './model/service-response.model';
import { ChangePasswordModel } from './model/change-password.model';
import { UserService } from './service/user.service';
import { AppConstants } from './helper/app.constants';

@Component({
  selector: 'change-password',
  templateUrl:'/apllearning/resources/views/change-password.component.html',
  providers: [ UserService ]
})



export class ChangePasswordComponent {

    changePasswordForm:FormGroup;
    passwordSuccessMessage:boolean = false;
    passwordFailureMessage:boolean = false;
    message:string;

    constructor(fb: FormBuilder, private userService:UserService){
        this.changePasswordForm = fb.group({
            'old_password': [null, Validators.required],
            'new_password': [null, Validators.required],
            'confirm_new_password': [null, Validators.required] 
        });
    }

    passwordMatch(field1: FormControl, field2: FormControl){
        return field1 == field2 ? null : {passwordMatch: false};
    }

    changePassword(value:ChangePasswordModel){
        let response:Observable<ServiceResponse>;
        if(this.changePasswordForm.valid){
            response = this.userService.changePassword(value);
            response.subscribe(
                data => {
                    if(data.status){
                        this.changePasswordForm.reset();
                        this.passwordSuccessMessage = true;
                        this.message = data.result;
                        setTimeout(function() {
                            this.passwordSuccessMessage = false;
                        }.bind(this), 3000);
                    } else {
                        this.passwordFailureMessage = true;
                        this.message = data.result;
                        setTimeout(function() {
                            this.passwordFailureMessage = false;
                        }.bind(this), 3000);
                    }
                },
                err => {
                    console.log(err);
                }
            );
        }
    }

}