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
var app_constants_1 = require('../helper/app.constants');
var material_model_1 = require('../model/material.model');
var user_service_1 = require('../service/user.service');
var grade_service_1 = require('../service/grade.service');
var subject_service_1 = require('../service/subject.service');
var material_service_1 = require('../service/material.service');
var StudentDashboardComponent = (function () {
    function StudentDashboardComponent(userService, gradeService, subjectService, materialService) {
        this.userService = userService;
        this.gradeService = gradeService;
        this.subjectService = subjectService;
        this.materialService = materialService;
        this.isMaterialView = false;
        this.subjects = [];
        this.materialModel = {};
        this.materialUrl = app_constants_1.AppConstants.MaterialUrl;
    }
    StudentDashboardComponent.prototype.ngOnInit = function () {
        var _this = this;
        var response;
        response = this.userService.getLoggedInUser();
        response.subscribe(function (data) {
            if (data.status) {
                _this.currentUser = data.result;
                _this.getUserById(_this.currentUser.id);
            }
        });
    };
    StudentDashboardComponent.prototype.viewMaterial = function (subject) {
        this.materialModel.subject_id = subject.id;
        this.selectedSubject = subject;
        this.isMaterialView = true;
        this.materials = [];
        this.getMaterials();
    };
    StudentDashboardComponent.prototype.getUserById = function (userId) {
        var _this = this;
        var user = {
            user_id: userId
        };
        var response;
        response = this.userService.getUserById(user);
        response.subscribe(function (data) {
            if (data.status) {
                if (data.result) {
                    _this.currentUser = data.result;
                    _this.getSubjects();
                }
            }
        }, function (err) {
            console.log(err);
        });
    };
    StudentDashboardComponent.prototype.getMaterials = function (load) {
        var _this = this;
        var material = new material_model_1.MaterialModel();
        material.grade_id = this.currentUser.grade_id;
        material.subject_id = this.materialModel.subject_id;
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
    StudentDashboardComponent.prototype.getSubjects = function () {
        var _this = this;
        var subject = {
            start: 0,
            size: app_constants_1.AppConstants.MAX_NUMBER
        };
        subject.grade = this.currentUser.grade;
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
    StudentDashboardComponent = __decorate([
        core_1.Component({
            selector: 'student-material',
            templateUrl: '/apllearning/resources/views/student/dashboard.component.html',
            providers: [user_service_1.UserService, grade_service_1.GradeService, subject_service_1.SubjectService, material_service_1.MaterialService]
        }), 
        __metadata('design:paramtypes', [user_service_1.UserService, grade_service_1.GradeService, subject_service_1.SubjectService, material_service_1.MaterialService])
    ], StudentDashboardComponent);
    return StudentDashboardComponent;
}());
exports.StudentDashboardComponent = StudentDashboardComponent;
//# sourceMappingURL=student-dashboard.component.js.map