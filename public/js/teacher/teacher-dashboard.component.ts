import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import { ModalDirective } from 'ng2-bootstrap/ng2-bootstrap';

import { AppConstants } from '../helper/app.constants';
import { ServiceResponse } from '../model/service-response.model';
import { MaterialModel } from '../model/material.model';
import { GradeModel } from '../model/grade.model';
import { SubjectModel } from '../model/subject.model';
import { GradeService } from '../service/grade.service';
import { SubjectService } from '../service/subject.service';
import { MaterialService } from '../service/material.service';


@Component({
  selector: 'material',
  templateUrl: '/apllearning/resources/views/teacher/dashboard.component.html',
  providers: [ GradeService, SubjectService, MaterialService ]
})

export class TeacherDashboardComponent {

    materialForm:FormGroup;
    materials:MaterialModel[];
    grades:GradeModel[];
    subjects:SubjectModel[];
    materialCreatedSuccessMessage:boolean = false;
    materialCreatedFailureMessage:boolean = false;
    materialSuccessMessage:boolean = false;
    materialFailureMessage:boolean = false;
    message:string;
    hasMoreMaterials:boolean;
    @ViewChild('deleteMaterialModal') public deleteMaterialModal:ModalDirective;
    materialModel:MaterialModel;
    selectedGrade:number|string = '';
    selectedSubject:number|string = '';
    selectedFilterGrade:number|string = '';
    isEditMaterial:boolean = false;


    constructor(fb: FormBuilder, private gradeService: GradeService, private subjectService: SubjectService, private materialService: MaterialService){
        this.materials = [];
        this.materialForm = fb.group({
            "grade_id": [null, Validators.required],
            "subject_id": [null, Validators.required],
            "title": [null, Validators.required],
            "url": [null, Validators.required],
            "description": [null]
        });
    }

    ngOnInit(){
        this.getMaterials();
        this.getGrades();
        this.getSubjects();
    }

    filterMaterials(){
        this.materials = [];
        this.getMaterials(false);
    }

    getMaterials(load?:boolean){
        let material: MaterialModel;
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

    getSubjects(){
        let subject: SubjectModel = {
            start: 0,
            size: AppConstants.MAX_NUMBER
        };
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


    createMaterial(value: MaterialModel){
        let response:Observable<ServiceResponse>;
        if(this.materialForm.valid){
            if(this.isEditMaterial){
                value.material_id = this.materialModel.material_id
            }

            response = this.materialService.createMaterial(value);
            response.subscribe(
                data => {
                    if(data.status){
                        this.materialForm.reset();
                        this.selectedGrade = '';
                        this.selectedSubject = '';
                        this.materialCreatedSuccessMessage = true;
                        this.message = data.result;
                        setTimeout(function() {
                            this.materialCreatedSuccessMessage = false;
                        }.bind(this), 3000);
                        this.materials = [];
                        this.getMaterials();
                    } else {
                        this.materialCreatedFailureMessage = true;
                        this.message = data.result;
                        setTimeout(function() {
                            this.materialCreatedFailureMessage = false;
                        }.bind(this), 3000);
                    }
                    if(this.isEditMaterial){
                        this.materialModel = {};
                        this.isEditMaterial = false;
                    }
                },
                err => {
                    console.log(err);
                } 
            );
        }
    }

    showDeleteConfirm(index:number, materialId:number){
        this.materialModel = {
            material_id: materialId,
            index: index
        };
        this.deleteMaterialModal.show();
    }
    
    closeDeleteMaterialModal(){
        this.materialModel = {};
        this.deleteMaterialModal.hide();
    }

    deleteMaterial(){
        let material: MaterialModel = this.materialModel;
        let response:Observable<ServiceResponse>;

        response = this.materialService.deleteMaterial(material);
        response.subscribe(
            data => {
                if(data.status){
                    this.materials.splice(material.index,1);
                    this.materialSuccessMessage = true;
                    this.message = data.result;
                    setTimeout(function() {
                        this.materialSuccessMessage = false;
                    }.bind(this), 3000);
                } else {
                    this.materialFailureMessage = true;
                    this.message = data.result;
                    setTimeout(function() {
                        this.materialFailureMessage = false;
                    }.bind(this), 3000);
                }
                this.materialModel = {};
                this.deleteMaterialModal.hide();
            },
            err => {
                console.log(err);
            }
        );
    }

    editMaterial(material:MaterialModel){
        this.materialModel = {
            material_id: material.id
        };
        this.isEditMaterial = true;
        this.materialForm.setValue({
            'grade_id': material.grade_id,
            'subject_id': material.subject_id,
            'title': material.title,
            'url': '',
            'description': material.description
        });
    }

    cancelMaterialEdit(){
        this.materialModel = {};
        this.isEditMaterial = false;
        this.materialForm.reset();
        this.selectedGrade = '';
        this.selectedSubject = '';
    }
    
}