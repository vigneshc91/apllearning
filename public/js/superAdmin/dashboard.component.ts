import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Rx';

import { AppConstants } from '../helper/app.constants';
import { ServiceResponse } from '../model/service-response.model';
import { UserModel } from '../model/user.model';
import { UserService } from '../service/user.service';

@Component({
  selector: 'super-admin',
  templateUrl: '/apllearning/resources/views/superAdmin/dashboard.component.html',
  providers: [ UserService ]
})

export class DashboardComponent implements OnInit {

    createAdminForm:FormGroup;
    users:UserModel[];

    constructor(fb: FormBuilder, private userService: UserService){
        this.users = [];
        this.createAdminForm = fb.group({
            "user_name": [null, Validators.required]
        });
    }

    ngOnInit(){
        this.getUsers();
    }

    getUsers(){
        let user: UserModel = {
            user_type: AppConstants.USER_TYPE.Admin
        };
        let response:Observable<ServiceResponse>;

        response = this.userService.getUsers(user);
        response.subscribe(
            data => {
                if(data.status){
                    if(data.result.length){
                        this.users = this.users.concat(data.result);
                    }
                }
            },
            err => {
                console.log(err);
            }
        );
    }

    resetPassword(userId:number){
        let user: UserModel = {
            user_id: userId
        };
        let response:Observable<ServiceResponse>;

        response = this.userService.resetPassword(user);
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

    createAdmin(value: UserModel){
        let response:Observable<ServiceResponse>;
        if(this.createAdminForm.valid){
            value.user_type = AppConstants.USER_TYPE.Admin;
            response = this.userService.createUser(value);
            response.subscribe(
                data => {
                    if(data.status){
                        this.createAdminForm.reset();
                        this.users = [];
                        this.getUsers();
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

    deleteAdmin(userId:number){
        let user: UserModel = {
            user_id: userId
        };
        let response:Observable<ServiceResponse>;

        response = this.userService.deleteUser(user);
        response.subscribe(
            data => {
                if(data.status){
                    this.users = [];
                    this.getUsers();
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
