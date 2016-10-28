import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import { ModalDirective } from 'ng2-bootstrap/ng2-bootstrap';

import { AppConstants } from '../helper/app.constants';
import { ServiceResponse } from '../model/service-response.model';
import { SubjectModel } from '../model/subject.model';
import { SubjectService } from '../service/subject.service';

@Component({
  selector: 'subject',
  templateUrl: '/apllearning/resources/views/admin/subject.component.html',
  providers: [ SubjectService ]
})

export class SubjectComponent implements OnInit {

    subjectForm:FormGroup;
    subjects:SubjectModel[];
    subjectCreatedSuccessMessage:boolean = false;
    subjectCreatedFailureMessage:boolean = false;
    subjectSuccessMessage:boolean = false;
    subjectFailureMessage:boolean = false;
    message:string;
    hasMoreSubjects:boolean;
    @ViewChild('deleteSubjectModal') public deleteSubjectModal:ModalDirective;
    subjectModal:SubjectModel;
    gradeRange:number[] = AppConstants.GRADE_RANGE;
    selectedGrade:number|string = '';
    selectedFilterGrade:number|string = '';
    isEditSubject:boolean = false;

    constructor(fb: FormBuilder, private subjectService: SubjectService){
        this.subjects = [];
        this.subjectForm = fb.group({
            "name": [null, Validators.required],
            "grade": [null, Validators.required]
        });
    }

    ngOnInit(){
        this.getSubjects();
    }

    filterSubjects(){
        this.subjects = [];
        this.getSubjects();
    }

    getSubjects(load?:boolean){
        let subject: SubjectModel = {};
        if(load){
            subject.start = this.subjects.length;
            subject.size = AppConstants.PAGINATION_SIZE;
        }
        if(this.selectedFilterGrade){
            subject.grade = <number>this.selectedFilterGrade;
        }
        let response:Observable<ServiceResponse>;

        response = this.subjectService.getSubjects(subject);
        response.subscribe(
            data => {
                if(data.status){
                    if(data.result.length){
                        this.subjects = this.subjects.concat(data.result);
                        if(data.result.length < AppConstants.PAGINATION_SIZE){
                            this.hasMoreSubjects = false;
                        } else {
                            this.hasMoreSubjects = true;
                        }
                    }
                }
            },
            err => {
                console.log(err);
            }
        );
    }


    createSubject(value: SubjectModel){
        let response:Observable<ServiceResponse>;
        if(this.subjectForm.valid){
            if(this.isEditSubject){
                value.subject_id = this.subjectModal.subject_id;
            }
            response = this.subjectService.createSubject(value);
            response.subscribe(
                data => {
                    if(data.status){
                        // this.gradeForm.reset();
                        this.subjectCreatedSuccessMessage = true;
                        this.message = data.result;
                        setTimeout(function() {
                            this.subjectCreatedSuccessMessage = false;
                        }.bind(this), 3000);
                        this.subjects = [];
                        this.getSubjects();
                    } else {
                        this.subjectCreatedFailureMessage = true;
                        this.message = data.result;
                        setTimeout(function() {
                            this.subjectCreatedFailureMessage = false;
                        }.bind(this), 3000);
                    }
                    if(this.isEditSubject){
                        this.subjectModal = {};
                        this.isEditSubject = false;
                        this.subjectForm.reset();
                        this.selectedGrade = '';
                    }
                },
                err => {
                    console.log(err);
                } 
            );
        }
    }

    showDeleteConfirm(index:number, subjectId:number){
        this.subjectModal = {
            subject_id: subjectId,
            index: index
        };
        this.deleteSubjectModal.show();
    }
    
    closeDeleteSubjectModal(){
        this.subjectModal = {};
        this.deleteSubjectModal.hide();
    }

    deleteSubject(){
        let subject: SubjectModel = this.subjectModal;
        let response:Observable<ServiceResponse>;

        response = this.subjectService.deleteSubject(subject);
        response.subscribe(
            data => {
                if(data.status){
                    this.subjects.splice(subject.index,1);
                    this.subjectSuccessMessage = true;
                    this.message = data.result;
                    setTimeout(function() {
                        this.subjectSuccessMessage = false;
                    }.bind(this), 3000);
                } else {
                    this.subjectFailureMessage = true;
                    this.message = data.result;
                    setTimeout(function() {
                        this.subjectFailureMessage = false;
                    }.bind(this), 3000);
                }
                this.subjectModal = {};
                this.deleteSubjectModal.hide();
            },
            err => {
                console.log(err);
            }
        );
    }

    cancelEditSubject(){
        this.subjectModal = {};
        this.isEditSubject = false;
        this.subjectForm.reset();
        this.selectedGrade = '';
    }

    editSubject(subjectId:number, name:string, grade:number){
        this.subjectModal = {
            subject_id: subjectId
        };
        this.isEditSubject = true;
        this.subjectForm.setValue({
            'name': name,
            'grade': grade
        });
    }
    

 }
