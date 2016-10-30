import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import { ModalDirective } from 'ng2-bootstrap/ng2-bootstrap';

import { AppConstants } from '../helper/app.constants';
import { ServiceResponse } from '../model/service-response.model';
import { UserModel } from '../model/user.model';
import { GradeModel } from '../model/grade.model';
import { UserService } from '../service/user.service';
import { GradeService } from '../service/grade.service';

@Component({
  selector: 'student',
  templateUrl: '/apllearning/resources/views/admin/student.component.html',
  providers: [ UserService, GradeService ]
})

export class StudentComponent implements OnInit {
    studentForm:FormGroup;
    searchUserForm:FormGroup;
    users:UserModel[];
    grades:GradeModel[];
    studentCreatedSuccessMessage:boolean = false;
    studentCreatedFailureMessage:boolean = false;
    userSuccessMessage:boolean = false;
    userFailureMessage:boolean = false;
    message:string;
    hasMoreStudents:boolean;
    @ViewChild('deleteStudentModal') public deleteStudentModal:ModalDirective;
    @ViewChild('resetPasswordModal') public resetPasswordModal:ModalDirective;
    userModal:UserModel;
    selectedGrade:number|string = '';
    selectedFilterGrade:number|string = '';
    isEditStudent:boolean = false;


    constructor(fb: FormBuilder, private userService: UserService, private gradeService: GradeService){
        this.users = [];
        this.userModal = new UserModel();
        this.studentForm = fb.group({
            "user_name": [null, Validators.required],
            "grade_id": [null, Validators.required]
        });
        this.searchUserForm = fb.group({
            'user_name': [null, Validators.required]
        });
    }

    ngOnInit(){
        this.getUsers();
        this.getGrades();
    }

    filterUsers(){
        this.users = [];
        this.getUsers(false);
    }

    searchUsers(user:UserModel){
        if(this.searchUserForm.valid){
            this.userModal.user_name = user.user_name;
            this.users = [];
            this.getUsers();
        }
    }

    resetSearchUsers(){
        this.searchUserForm.reset();
        this.users = [];
        this.userModal = {};
        this.getUsers();
    }

    getUsers(load?:boolean){
        let user: UserModel = {
            user_type: AppConstants.USER_TYPE.Student
        };
        if(this.userModal.user_name){
            user.user_name = this.userModal.user_name;
        }
        if(load){
            user.start = this.users.length;
            user.size = AppConstants.PAGINATION_SIZE;
        }
        if(this.selectedFilterGrade){
            user.grade_id = <number>this.selectedFilterGrade;
        }
        
        let response:Observable<ServiceResponse>;

        response = this.userService.getUsers(user);
        response.subscribe(
            data => {
                if(data.status){
                    if(data.result.length){
                        this.users = this.users.concat(data.result);
                        if(data.result.length < AppConstants.PAGINATION_SIZE){
                            this.hasMoreStudents = false;
                        } else {
                            this.hasMoreStudents = true;
                        }
                    }
                }
            },
            err => {
                console.log(err);
            }
        );
    }

    getGrades(){
        let grade: GradeModel = {
            start: 0,
            size: AppConstants.MAX_NUMBER
        };
        let response:Observable<ServiceResponse>;

        response = this.gradeService.getGrades(grade);
        response.subscribe(
            data => {
                if(data.status){
                    if(data.result.length){
                        this.grades = data.result;
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

    createStudent(value: UserModel){
        let response:Observable<ServiceResponse>;
        if(this.studentForm.valid){
            if(this.isEditStudent){
                value.user_id = this.userModal.user_id
            } else {
                value.user_type = AppConstants.USER_TYPE.Student;
            }
            response = this.userService.createUser(value);
            response.subscribe(
                data => {
                    if(data.status){
                        this.studentForm.reset();
                        this.selectedGrade = '';
                        this.studentCreatedSuccessMessage = true;
                        this.message = data.result;
                        setTimeout(function() {
                            this.studentCreatedSuccessMessage = false;
                        }.bind(this), 3000);
                        this.users = [];
                        this.getUsers();
                    } else {
                        this.studentCreatedFailureMessage = true;
                        this.message = data.result;
                        setTimeout(function() {
                            this.studentCreatedFailureMessage = false;
                        }.bind(this), 3000);
                    }
                    if(this.isEditStudent){
                        this.userModal = {};
                        this.isEditStudent = false;
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
        this.deleteStudentModal.show();
    }
    
    closeDeleteStudentModal(){
        this.userModal = {};
        this.deleteStudentModal.hide();
    }

    deleteStudent(){
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
                this.deleteStudentModal.hide();
            },
            err => {
                console.log(err);
            }
        );
    }

    editStudent(userId: number, userName: string, gradeId: number){
        this.userModal = {
            user_id: userId
        };
        this.isEditStudent = true;
        this.studentForm.setValue({
            'user_name': userName,
            'grade_id': gradeId
        });
    }

    cancelStudentEdit(){
        this.userModal = {};
        this.isEditStudent = false;
        this.studentForm.reset();
        this.selectedGrade = '';
    }
}