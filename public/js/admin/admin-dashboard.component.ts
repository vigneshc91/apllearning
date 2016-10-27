import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import { ModalDirective } from 'ng2-bootstrap/ng2-bootstrap';

import { AppConstants } from '../helper/app.constants';
import { ServiceResponse } from '../model/service-response.model';
import { UserModel } from '../model/user.model';
import { UserService } from '../service/user.service';

@Component({
  selector: 'admin',
  templateUrl: '/apllearning/resources/views/admin/dashboard.component.html',
  providers: [ UserService ]
})

export class AdminDashboardComponent implements OnInit {
    createTeacherForm:FormGroup;
    users:UserModel[];
    teacherCreatedSuccessMessage:boolean = false;
    teacherCreatedFailureMessage:boolean = false;
    userSuccessMessage:boolean = false;
    userFailureMessage:boolean = false;
    message:string;
    hasMoreTeachers:boolean;
    @ViewChild('deleteTeacherModal') public deleteTeacherModal:ModalDirective;
    @ViewChild('resetPasswordModal') public resetPasswordModal:ModalDirective;
    userModal:UserModel;

    constructor(fb: FormBuilder, private userService: UserService){
        this.users = [];
        this.createTeacherForm = fb.group({
            "user_name": [null, Validators.required]
        });
    }

    ngOnInit(){
        this.getUsers();
    }

    getUsers(load?:boolean){
        let user: UserModel = {
            user_type: AppConstants.USER_TYPE.Teacher
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
                            this.hasMoreTeachers = false;
                        } else {
                            this.hasMoreTeachers = true;
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
                    this.userSuccessMessage = true;
                    this.message = data.result;
                    setTimeout(function() {
                        this.userSuccessMessage = false;
                    }.bind(this), 3000);
                } else {
                    this.userFailureMessage = true;
                    this.message = data.result;
                    setTimeout(function() {
                        this.userFailureMessage = false;
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

    createTeacher(value: UserModel){
        let response:Observable<ServiceResponse>;
        if(this.createTeacherForm.valid){
            value.user_type = AppConstants.USER_TYPE.Teacher;
            response = this.userService.createUser(value);
            response.subscribe(
                data => {
                    if(data.status){
                        this.createTeacherForm.reset();
                        this.teacherCreatedSuccessMessage = true;
                        this.message = data.result;
                        setTimeout(function() {
                            this.teacherCreatedSuccessMessage = false;
                        }.bind(this), 3000);
                        this.users = [];
                        this.getUsers();
                    } else {
                        this.teacherCreatedFailureMessage = true;
                        this.message = data.result;
                        setTimeout(function() {
                            this.teacherCreatedFailureMessage = false;
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
        this.deleteTeacherModal.show();
    }
    
    closeDeleteTeacherModal(){
        this.userModal = {};
        this.deleteTeacherModal.hide();
    }

    deleteTeacher(){
        let user: UserModel = this.userModal;
        let response:Observable<ServiceResponse>;

        response = this.userService.deleteUser(user);
        response.subscribe(
            data => {
                if(data.status){
                    this.users.splice(user.index,1);
                    this.userSuccessMessage = true;
                    this.message = data.result;
                    setTimeout(function() {
                        this.userSuccessMessage = false;
                    }.bind(this), 3000);
                } else {
                    this.userFailureMessage = true;
                    this.message = data.result;
                    setTimeout(function() {
                        this.userFailureMessage = false;
                    }.bind(this), 3000);
                }
                this.userModal = {};
                this.deleteTeacherModal.hide();
            },
            err => {
                console.log(err);
            }
        );
    }
}