import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import { ModalDirective } from 'ng2-bootstrap/ng2-bootstrap';

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
    adminCreatedSuccessMessage:boolean = false;
    adminCreatedFailureMessage:boolean = false;
    adminSuccessMessage:boolean = false;
    adminFailureMessage:boolean = false;
    message:string;
    hasMoreAdmins:boolean = true;
    @ViewChild('deleteAdminModal') public deleteAdminModal:ModalDirective;
    @ViewChild('resetPasswordModal') public resetPasswordModal:ModalDirective;
    userModal:UserModel;

    constructor(fb: FormBuilder, private userService: UserService){
        this.users = [];
        this.createAdminForm = fb.group({
            "user_name": [null, Validators.required]
        });
    }

    ngOnInit(){
        this.getUsers();
    }

    getUsers(load?:boolean){
        let user: UserModel = {
            user_type: AppConstants.USER_TYPE.Admin
        };
        if(load){
            user.start = this.users.length;
            user.size = AppConstants.PAGINATION_SIZE;
        }
        let response:Observable<ServiceResponse>;

        response = this.userService.getUsers(user);
        response.subscribe(
            data => {
                if(data.status){
                    if(data.result.length){
                        this.users = this.users.concat(data.result);
                        if(data.result.length < AppConstants.PAGINATION_SIZE){
                            this.hasMoreAdmins = false;
                        }
                    }
                }
            },
            err => {
                console.log(err);
            }
        );
    }

    showResetPasswordConfirm(userId:number){
        this.userModal = {
            user_id: userId
        };
        this.resetPasswordModal.show();
    }

    closeResetPasswordModal(){
        this.userModal = {};
        this.resetPasswordModal.hide();
    }

    resetPassword(){
        let user: UserModel = this.userModal;
        let response:Observable<ServiceResponse>;

        response = this.userService.resetPassword(user);
        response.subscribe(
            data => {
                if(data.status){
                    this.adminSuccessMessage = true;
                    this.message = data.result;
                    setTimeout(function() {
                        this.adminSuccessMessage = false;
                    }.bind(this), 3000);
                } else {
                    this.adminFailureMessage = true;
                    this.message = data.result;
                    setTimeout(function() {
                        this.adminFailureMessage = false;
                    }.bind(this), 3000);
                }
                this.userModal = {};
                this.resetPasswordModal.hide();
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
                        this.adminCreatedSuccessMessage = true;
                        this.message = data.result;
                        setTimeout(function() {
                            this.adminCreatedSuccessMessage = false;
                        }.bind(this), 3000);
                        this.users = [];
                        this.getUsers();
                    } else {
                        this.adminCreatedFailureMessage = true;
                        this.message = data.result;
                        setTimeout(function() {
                            this.adminCreatedFailureMessage = false;
                        }.bind(this), 3000);
                    }
                },
                err => {
                    console.log(err);
                } 
            );
        }
    }

    showDeleteConfirm(index:number, userId:number){
        this.userModal = {
            user_id: userId,
            index: index
        };
        this.deleteAdminModal.show();
    }
    
    closeDeleteAdminModal(){
        this.userModal = {};
        this.deleteAdminModal.hide();
    }

    deleteAdmin(){
        let user: UserModel = this.userModal;
        let response:Observable<ServiceResponse>;

        response = this.userService.deleteUser(user);
        response.subscribe(
            data => {
                if(data.status){
                    this.users.splice(user.index,1);
                    this.adminSuccessMessage = true;
                    this.message = data.result;
                    setTimeout(function() {
                        this.adminSuccessMessage = false;
                    }.bind(this), 3000);
                } else {
                    this.adminFailureMessage = true;
                    this.message = data.result;
                    setTimeout(function() {
                        this.adminFailureMessage = false;
                    }.bind(this), 3000);
                }
                this.userModal = {};
                this.deleteAdminModal.hide();
            },
            err => {
                console.log(err);
            }
        );
    }
    

 }
