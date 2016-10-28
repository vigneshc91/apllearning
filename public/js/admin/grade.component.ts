import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import { ModalDirective } from 'ng2-bootstrap/ng2-bootstrap';

import { AppConstants } from '../helper/app.constants';
import { ServiceResponse } from '../model/service-response.model';
import { GradeModel } from '../model/grade.model';
import { GradeService } from '../service/grade.service';

@Component({
  selector: 'grade',
  templateUrl: '/apllearning/resources/views/admin/grade.component.html',
  providers: [ GradeService ]
})

export class GradeComponent implements OnInit {

    gradeForm:FormGroup;
    grades:GradeModel[];
    gradeCreatedSuccessMessage:boolean = false;
    gradeCreatedFailureMessage:boolean = false;
    gradeSuccessMessage:boolean = false;
    gradeFailureMessage:boolean = false;
    message:string;
    hasMoreGrades:boolean;
    @ViewChild('deleteGradeModal') public deleteGradeModal:ModalDirective;
    gradeModal:GradeModel;
    gradeRange:number[] = AppConstants.GRADE_RANGE;
    sectionRange:string[] = AppConstants.SECTION_RANGE;
    selectedGrade:number|string = '';
    selectedFilterGrade:number|string = '';
    selectedSection:string = '';
    isEditGrade:boolean = false;

    constructor(fb: FormBuilder, private gradeService: GradeService){
        this.grades = [];
        this.gradeForm = fb.group({
            "grade": [null, Validators.required],
            "section": [null, Validators.required]
        });
    }

    ngOnInit(){
        this.getGrades();
    }

    filterGrades(){
        this.grades = [];
        this.getGrades();
    }

    getGrades(load?:boolean){
        let grade: GradeModel = {};
        if(load){
            grade.start = this.grades.length;
            grade.size = AppConstants.PAGINATION_SIZE;
        }
        if(this.selectedFilterGrade){
            grade.grade = <number>this.selectedFilterGrade;
        }
        let response:Observable<ServiceResponse>;

        response = this.gradeService.getGrades(grade);
        response.subscribe(
            data => {
                if(data.status){
                    if(data.result.length){
                        this.grades = this.grades.concat(data.result);
                        if(data.result.length < AppConstants.PAGINATION_SIZE){
                            this.hasMoreGrades = false;
                        } else {
                            this.hasMoreGrades = true;
                        }
                    }
                }
            },
            err => {
                console.log(err);
            }
        );
    }


    createGrade(value: GradeModel){
        let response:Observable<ServiceResponse>;
        if(this.gradeForm.valid){
            if(this.isEditGrade){
                value.grade_id = this.gradeModal.grade_id;
            }
            response = this.gradeService.createGrade(value);
            response.subscribe(
                data => {
                    if(data.status){
                        // this.gradeForm.reset();
                        this.gradeCreatedSuccessMessage = true;
                        this.message = data.result;
                        setTimeout(function() {
                            this.gradeCreatedSuccessMessage = false;
                        }.bind(this), 3000);
                        this.grades = [];
                        this.getGrades();
                    } else {
                        this.gradeCreatedFailureMessage = true;
                        this.message = data.result;
                        setTimeout(function() {
                            this.gradeCreatedFailureMessage = false;
                        }.bind(this), 3000);
                    }
                    if(this.isEditGrade){
                        this.gradeModal = {};
                        this.isEditGrade = false;
                        this.gradeForm.reset();
                    }
                },
                err => {
                    console.log(err);
                } 
            );
        }
    }

    showDeleteConfirm(index:number, gradeId:number){
        this.gradeModal = {
            grade_id: gradeId,
            index: index
        };
        this.deleteGradeModal.show();
    }
    
    closeDeleteGradeModal(){
        this.gradeModal = {};
        this.deleteGradeModal.hide();
    }

    deleteGrade(){
        let grade: GradeModel = this.gradeModal;
        let response:Observable<ServiceResponse>;

        response = this.gradeService.deleteGrade(grade);
        response.subscribe(
            data => {
                if(data.status){
                    this.grades.splice(grade.index,1);
                    this.gradeSuccessMessage = true;
                    this.message = data.result;
                    setTimeout(function() {
                        this.gradeSuccessMessage = false;
                    }.bind(this), 3000);
                } else {
                    this.gradeFailureMessage = true;
                    this.message = data.result;
                    setTimeout(function() {
                        this.gradeFailureMessage = false;
                    }.bind(this), 3000);
                }
                this.gradeModal = {};
                this.deleteGradeModal.hide();
            },
            err => {
                console.log(err);
            }
        );
    }

    cancelEditGrade(){
        this.gradeModal = {};
        this.isEditGrade = false;
        this.gradeForm.reset();
        this.selectedGrade = '';
        this.selectedSection = '';
    }

    editGrade(gradeId:number, grade:number, section:string){
        this.gradeModal = {
            grade_id: gradeId
        };
        this.isEditGrade = true;
        this.selectedGrade = grade;
        this.selectedSection = section;
    }
    

 }
