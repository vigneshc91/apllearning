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
var subject_service_1 = require('../service/subject.service');
var SubjectComponent = (function () {
    function SubjectComponent(fb, subjectService) {
        this.subjectService = subjectService;
        this.subjectCreatedSuccessMessage = false;
        this.subjectCreatedFailureMessage = false;
        this.subjectSuccessMessage = false;
        this.subjectFailureMessage = false;
        this.gradeRange = app_constants_1.AppConstants.GRADE_RANGE;
        this.selectedGrade = '';
        this.selectedFilterGrade = '';
        this.isEditSubject = false;
        this.subjects = [];
        this.subjectForm = fb.group({
            "name": [null, forms_1.Validators.required],
            "grade": [null, forms_1.Validators.required]
        });
    }
    SubjectComponent.prototype.ngOnInit = function () {
        this.getSubjects();
    };
    SubjectComponent.prototype.filterSubjects = function () {
        this.subjects = [];
        this.getSubjects();
    };
    SubjectComponent.prototype.getSubjects = function (load) {
        var _this = this;
        var subject = {};
        if (load) {
            subject.start = this.subjects.length;
            subject.size = app_constants_1.AppConstants.PAGINATION_SIZE;
        }
        if (this.selectedFilterGrade) {
            subject.grade = this.selectedFilterGrade;
        }
        var response;
        response = this.subjectService.getSubjects(subject);
        response.subscribe(function (data) {
            if (data.status) {
                if (data.result.length) {
                    _this.subjects = _this.subjects.concat(data.result);
                    if (data.result.length < app_constants_1.AppConstants.PAGINATION_SIZE) {
                        _this.hasMoreSubjects = false;
                    }
                    else {
                        _this.hasMoreSubjects = true;
                    }
                }
            }
        }, function (err) {
            console.log(err);
        });
    };
    SubjectComponent.prototype.createSubject = function (value) {
        var _this = this;
        var response;
        if (this.subjectForm.valid) {
            if (this.isEditSubject) {
                value.subject_id = this.subjectModal.subject_id;
            }
            response = this.subjectService.createSubject(value);
            response.subscribe(function (data) {
                if (data.status) {
                    // this.gradeForm.reset();
                    _this.subjectCreatedSuccessMessage = true;
                    _this.message = data.result;
                    setTimeout(function () {
                        this.subjectCreatedSuccessMessage = false;
                    }.bind(_this), 3000);
                    _this.subjects = [];
                    _this.getSubjects();
                }
                else {
                    _this.subjectCreatedFailureMessage = true;
                    _this.message = data.result;
                    setTimeout(function () {
                        this.subjectCreatedFailureMessage = false;
                    }.bind(_this), 3000);
                }
                if (_this.isEditSubject) {
                    _this.subjectModal = {};
                    _this.isEditSubject = false;
                    _this.subjectForm.reset();
                    _this.selectedGrade = '';
                }
            }, function (err) {
                console.log(err);
            });
        }
    };
    SubjectComponent.prototype.showDeleteConfirm = function (index, subjectId) {
        this.subjectModal = {
            subject_id: subjectId,
            index: index
        };
        this.deleteSubjectModal.show();
    };
    SubjectComponent.prototype.closeDeleteSubjectModal = function () {
        this.subjectModal = {};
        this.deleteSubjectModal.hide();
    };
    SubjectComponent.prototype.deleteSubject = function () {
        var _this = this;
        var subject = this.subjectModal;
        var response;
        response = this.subjectService.deleteSubject(subject);
        response.subscribe(function (data) {
            if (data.status) {
                _this.subjects.splice(subject.index, 1);
                _this.subjectSuccessMessage = true;
                _this.message = data.result;
                setTimeout(function () {
                    this.subjectSuccessMessage = false;
                }.bind(_this), 3000);
            }
            else {
                _this.subjectFailureMessage = true;
                _this.message = data.result;
                setTimeout(function () {
                    this.subjectFailureMessage = false;
                }.bind(_this), 3000);
            }
            _this.subjectModal = {};
            _this.deleteSubjectModal.hide();
        }, function (err) {
            console.log(err);
        });
    };
    SubjectComponent.prototype.cancelEditSubject = function () {
        this.subjectModal = {};
        this.isEditSubject = false;
        this.subjectForm.reset();
        this.selectedGrade = '';
    };
    SubjectComponent.prototype.editSubject = function (subjectId, name, grade) {
        this.subjectModal = {
            subject_id: subjectId
        };
        this.isEditSubject = true;
        this.subjectForm.setValue({
            'name': name,
            'grade': grade
        });
    };
    __decorate([
        core_1.ViewChild('deleteSubjectModal'), 
        __metadata('design:type', ng2_bootstrap_1.ModalDirective)
    ], SubjectComponent.prototype, "deleteSubjectModal", void 0);
    SubjectComponent = __decorate([
        core_1.Component({
            selector: 'subject',
            templateUrl: '/apllearning/resources/views/admin/subject.component.html',
            providers: [subject_service_1.SubjectService]
        }), 
        __metadata('design:paramtypes', [forms_1.FormBuilder, subject_service_1.SubjectService])
    ], SubjectComponent);
    return SubjectComponent;
}());
exports.SubjectComponent = SubjectComponent;
//# sourceMappingURL=subject.component.js.map