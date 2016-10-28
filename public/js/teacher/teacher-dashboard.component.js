"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
var ng2_bootstrap_1 = require('ng2-bootstrap/ng2-bootstrap');
var app_constants_1 = require('../helper/app.constants');
var grade_service_1 = require('../service/grade.service');
var subject_service_1 = require('../service/subject.service');
var material_service_1 = require('../service/material.service');
var TeacherDashboardComponent = (function () {
    function TeacherDashboardComponent(fb, gradeService, subjectService, materialService) {
        this.gradeService = gradeService;
        this.subjectService = subjectService;
        this.materialService = materialService;
        this.materialCreatedSuccessMessage = false;
        this.materialCreatedFailureMessage = false;
        this.materialSuccessMessage = false;
        this.materialFailureMessage = false;
        this.selectedGrade = '';
        this.selectedSubject = '';
        this.selectedFilterGrade = '';
        this.isEditMaterial = false;
        this.materials = [];
        this.materialForm = fb.group({
            "grade_id": [null, forms_1.Validators.required],
            "subject_id": [null, forms_1.Validators.required],
            "title": [null, forms_1.Validators.required],
            "url": [null, forms_1.Validators.required],
            "description": [null]
        });
    }
    TeacherDashboardComponent.prototype.ngOnInit = function () {
        this.getMaterials();
        this.getGrades();
        this.getSubjects();
    };
    TeacherDashboardComponent.prototype.filterMaterials = function () {
        this.materials = [];
        this.getMaterials(false);
    };
    TeacherDashboardComponent.prototype.getMaterials = function (load) {
        var _this = this;
        var material;
        if (load) {
            material.start = this.materials.length;
            material.size = app_constants_1.AppConstants.PAGINATION_SIZE;
        }
        var response;
        response = this.materialService.getMaterials(material);
        response.subscribe(function (data) {
            if (data.status) {
                if (data.result.length) {
                    _this.materials = _this.materials.concat(data.result);
                    if (data.result.length < app_constants_1.AppConstants.PAGINATION_SIZE) {
                        _this.hasMoreMaterials = false;
                    }
                    else {
                        _this.hasMoreMaterials = true;
                    }
                }
            }
        }, function (err) {
            console.log(err);
        });
    };
    TeacherDashboardComponent.prototype.getGrades = function () {
        var _this = this;
        var grade = {
            start: 0,
            size: app_constants_1.AppConstants.MAX_NUMBER
        };
        var response;
        response = this.gradeService.getGrades(grade);
        response.subscribe(function (data) {
            if (data.status) {
                if (data.result.length) {
                    _this.grades = data.result;
                }
            }
        }, function (err) {
            console.log(err);
        });
    };
    TeacherDashboardComponent.prototype.getSubjects = function () {
        var _this = this;
        var subject = {
            start: 0,
            size: app_constants_1.AppConstants.MAX_NUMBER
        };
        var response;
        response = this.subjectService.getSubjects(subject);
        response.subscribe(function (data) {
            if (data.status) {
                if (data.result.length) {
                    _this.subjects = data.result;
                }
            }
        }, function (err) {
            console.log(err);
        });
    };
    TeacherDashboardComponent.prototype.createMaterial = function (value) {
        var _this = this;
        var response;
        if (this.materialForm.valid) {
            if (this.isEditMaterial) {
                value.material_id = this.materialModel.material_id;
            }
            response = this.materialService.createMaterial(value);
            response.subscribe(function (data) {
                if (data.status) {
                    _this.materialForm.reset();
                    _this.selectedGrade = '';
                    _this.selectedSubject = '';
                    _this.materialCreatedSuccessMessage = true;
                    _this.message = data.result;
                    setTimeout(function () {
                        this.materialCreatedSuccessMessage = false;
                    }.bind(_this), 3000);
                    _this.materials = [];
                    _this.getMaterials();
                }
                else {
                    _this.materialCreatedFailureMessage = true;
                    _this.message = data.result;
                    setTimeout(function () {
                        this.materialCreatedFailureMessage = false;
                    }.bind(_this), 3000);
                }
                if (_this.isEditMaterial) {
                    _this.materialModel = {};
                    _this.isEditMaterial = false;
                }
            }, function (err) {
                console.log(err);
            });
        }
    };
    TeacherDashboardComponent.prototype.showDeleteConfirm = function (index, materialId) {
        this.materialModel = {
            material_id: materialId,
            index: index
        };
        this.deleteMaterialModal.show();
    };
    TeacherDashboardComponent.prototype.closeDeleteMaterialModal = function () {
        this.materialModel = {};
        this.deleteMaterialModal.hide();
    };
    TeacherDashboardComponent.prototype.deleteMaterial = function () {
        var _this = this;
        var material = this.materialModel;
        var response;
        response = this.materialService.deleteMaterial(material);
        response.subscribe(function (data) {
            if (data.status) {
                _this.materials.splice(material.index, 1);
                _this.materialSuccessMessage = true;
                _this.message = data.result;
                setTimeout(function () {
                    this.materialSuccessMessage = false;
                }.bind(_this), 3000);
            }
            else {
                _this.materialFailureMessage = true;
                _this.message = data.result;
                setTimeout(function () {
                    this.materialFailureMessage = false;
                }.bind(_this), 3000);
            }
            _this.materialModel = {};
            _this.deleteMaterialModal.hide();
        }, function (err) {
            console.log(err);
        });
    };
    TeacherDashboardComponent.prototype.editMaterial = function (material) {
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
    };
    TeacherDashboardComponent.prototype.cancelMaterialEdit = function () {
        this.materialModel = {};
        this.isEditMaterial = false;
        this.materialForm.reset();
        this.selectedGrade = '';
        this.selectedSubject = '';
    };
    __decorate([
        core_1.ViewChild('deleteMaterialModal'), 
        __metadata('design:type', ng2_bootstrap_1.ModalDirective)
    ], TeacherDashboardComponent.prototype, "deleteMaterialModal", void 0);
    TeacherDashboardComponent = __decorate([
        core_1.Component({
            selector: 'material',
            templateUrl: '/apllearning/resources/views/teacher/dashboard.component.html',
            providers: [grade_service_1.GradeService, subject_service_1.SubjectService, material_service_1.MaterialService]
        }), 
        __metadata('design:paramtypes', [forms_1.FormBuilder, grade_service_1.GradeService, subject_service_1.SubjectService, material_service_1.MaterialService])
    ], TeacherDashboardComponent);
    return TeacherDashboardComponent;
}());
exports.TeacherDashboardComponent = TeacherDashboardComponent;
//# sourceMappingURL=teacher-dashboard.component.js.map