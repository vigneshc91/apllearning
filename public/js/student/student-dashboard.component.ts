import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs/Rx';

import { AppConstants } from '../helper/app.constants';
import { ServiceResponse } from '../model/service-response.model';
import { MaterialModel } from '../model/material.model';
import { UserModel } from '../model/user.model';
import { GradeModel } from '../model/grade.model';
import { SubjectModel } from '../model/subject.model';
import { UserService } from '../service/user.service';
import { GradeService } from '../service/grade.service';
import { SubjectService } from '../service/subject.service';
import { MaterialService } from '../service/material.service';


@Component({
  selector: 'student-material',
  templateUrl: '/apllearning/resources/views/student/dashboard.component.html',
  providers: [ UserService, GradeService, SubjectService, MaterialService ]
})

export class StudentDashboardComponent implements OnInit {

    materials:MaterialModel[];
    grades:GradeModel[];
    subjects:SubjectModel[];
    selectedSubject: SubjectModel;
    hasMoreMaterials:boolean;
    materialModel:MaterialModel;
    materialUrl:string;
    currentUser:UserModel;
    isMaterialView:boolean = false;

    constructor(private userService: UserService,  private gradeService: GradeService, private subjectService: SubjectService, private materialService: MaterialService){
        this.subjects = [];
        this.materialModel = {};
        this.materialUrl = AppConstants.MaterialUrl;
        
    }

    ngOnInit(){
        let response:Observable<ServiceResponse>;
        response = this.userService.getLoggedInUser();
        response.subscribe(
            data => {
                if(data.status){
                    this.currentUser = data.result;
                    this.getUserById(this.currentUser.id); 
                }
            }
        );
        
    }

    viewMaterial(subject: SubjectModel){
        this.materialModel.subject_id = subject.id;
        this.selectedSubject = subject;
        this.isMaterialView = true;
        this.materials = [];
        this.getMaterials();
    }

    getUserById(userId?:number){
        let user:UserModel = {
            user_id: userId
        };
        
        let response:Observable<ServiceResponse>;

        response = this.userService.getUserById(user);
        response.subscribe(
            data => {
                if(data.status){
                    if(data.result){
                        this.currentUser = data.result;
                        this.getSubjects();
                    }
                }
            },
            err => {
                console.log(err);
            }
        );
    }

    getMaterials(load?:boolean){
        let material: MaterialModel = new MaterialModel();
        
        material.grade_id = this.currentUser.grade_id;
        material.subject_id = this.materialModel.subject_id;
        if(load){
            material.start = this.materials.length;
            material.size = AppConstants.PAGINATION_SIZE;
        }
        
        let response:Observable<ServiceResponse>;

        response = this.materialService.getMaterials(material);
        response.subscribe(
            data => {
                if(data.status){
                    if(data.result.length){
                        this.materials = this.materials.concat(data.result);
                        if(data.result.length < AppConstants.PAGINATION_SIZE){
                            this.hasMoreMaterials = false;
                        } else {
                            this.hasMoreMaterials = true;
                        }
                    }
                }
            },
            err => {
                console.log(err);
            }
        );
    }


    getSubjects(){
        let subject: SubjectModel = {
            start: 0,
            size: AppConstants.MAX_NUMBER
        };
        subject.grade = this.currentUser.grade;
        
        let response:Observable<ServiceResponse>;

        response = this.subjectService.getSubjects(subject);
        response.subscribe(
            data => {
                if(data.status){
                    if(data.result.length){
                        this.subjects = data.result;
                    }
                }
            },
            err => {
                console.log(err);
            }
        );
    }
    
}