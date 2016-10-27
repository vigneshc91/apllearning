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
var DashboardComponent = (function () {
    function DashboardComponent(fb, gradeService) {
        this.gradeService = gradeService;
        this.gradeCreatedSuccessMessage = false;
        this.gradeCreatedFailureMessage = false;
        this.gradeSuccessMessage = false;
        this.gradeFailureMessage = false;
        this.grades = [];
        this.createGradeForm = fb.group({
            "grade": [null, forms_1.Validators.required],
            "section": [null, forms_1.Validators.required]
        });
    }
    DashboardComponent.prototype.ngOnInit = function () {
        this.getGrades();
    };
    DashboardComponent.prototype.getGrades = function (load) {
        var _this = this;
        var grade = {};
        if (load) {
            grade.start = this.grades.length;
            grade.size = app_constants_1.AppConstants.PAGINATION_SIZE;
        }
        var response;
        response = this.gradeService.getGrades(grade);
        response.subscribe(function (data) {
            if (data.status) {
                if (data.result.length) {
                    _this.grades = _this.grades.concat(data.result);
                    if (data.result.length < app_constants_1.AppConstants.PAGINATION_SIZE) {
                        _this.hasMoreGrades = false;
                    }
                    else {
                        _this.hasMoreGrades = true;
                    }
                }
            }
        }, function (err) {
            console.log(err);
        });
    };
    DashboardComponent.prototype.createGrade = function (value) {
        var _this = this;
        var response;
        if (this.createGradeForm.valid) {
            response = this.gradeService.createGrade(value);
            response.subscribe(function (data) {
                if (data.status) {
                    _this.createGradeForm.reset();
                    _this.gradeCreatedSuccessMessage = true;
                    _this.message = data.result;
                    setTimeout(function () {
                        this.gradeCreatedSuccessMessage = false;
                    }.bind(_this), 3000);
                    _this.grades = [];
                    _this.getGrades();
                }
                else {
                    _this.gradeCreatedFailureMessage = true;
                    _this.message = data.result;
                    setTimeout(function () {
                        this.gradeCreatedFailureMessage = false;
                    }.bind(_this), 3000);
                }
            }, function (err) {
                console.log(err);
            });
        }
    };
    DashboardComponent.prototype.showDeleteConfirm = function (index, gradeId) {
        this.gradeModal = {
            grade_id: gradeId,
            index: index
        };
        this.deleteGradeModal.show();
    };
    DashboardComponent.prototype.closeDeleteGradeModal = function () {
        this.gradeModal = {};
        this.deleteGradeModal.hide();
    };
    DashboardComponent.prototype.deleteGrade = function () {
        var _this = this;
        var grade = this.gradeModal;
        var response;
        response = this.gradeService.deleteGrade(grade);
        response.subscribe(function (data) {
            if (data.status) {
                _this.grades.splice(grade.index, 1);
                _this.gradeSuccessMessage = true;
                _this.message = data.result;
                setTimeout(function () {
                    this.gradeSuccessMessage = false;
                }.bind(_this), 3000);
            }
            else {
                _this.gradeFailureMessage = true;
                _this.message = data.result;
                setTimeout(function () {
                    this.gradeFailureMessage = false;
                }.bind(_this), 3000);
            }
            _this.gradeModal = {};
            _this.deleteGradeModal.hide();
        }, function (err) {
            console.log(err);
        });
    };
    __decorate([
        core_1.ViewChild('deleteGradeModal'), 
        __metadata('design:type', ng2_bootstrap_1.ModalDirective)
    ], DashboardComponent.prototype, "deleteGradeModal", void 0);
    DashboardComponent = __decorate([
        core_1.Component({
            selector: 'super-admin',
            templateUrl: '/apllearning/resources/views/admin/grade.component.html'
        }), 
        __metadata('design:paramtypes', [forms_1.FormBuilder, grade_service_1.GradeService])
    ], DashboardComponent);
    return DashboardComponent;
}());
exports.DashboardComponent = DashboardComponent;
//# sourceMappingURL=grade.component.js.map