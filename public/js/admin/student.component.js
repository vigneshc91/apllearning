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
var user_model_1 = require('../model/user.model');
var user_service_1 = require('../service/user.service');
var grade_service_1 = require('../service/grade.service');
var StudentComponent = (function () {
    function StudentComponent(fb, userService, gradeService) {
        this.userService = userService;
        this.gradeService = gradeService;
        this.studentCreatedSuccessMessage = false;
        this.studentCreatedFailureMessage = false;
        this.userSuccessMessage = false;
        this.userFailureMessage = false;
        this.selectedGrade = '';
        this.selectedFilterGrade = '';
        this.isEditStudent = false;
        this.users = [];
        this.userModal = new user_model_1.UserModel();
        this.studentForm = fb.group({
            "user_name": [null, forms_1.Validators.required],
            "grade_id": [null, forms_1.Validators.required]
        });
        this.searchUserForm = fb.group({
            'user_name': [null, forms_1.Validators.required]
        });
    }
    StudentComponent.prototype.ngOnInit = function () {
        this.getUsers();
        this.getGrades();
    };
    StudentComponent.prototype.filterUsers = function () {
        this.users = [];
        this.getUsers(false);
    };
    StudentComponent.prototype.searchUsers = function (user) {
        if (this.searchUserForm.valid) {
            this.userModal.user_name = user.user_name;
            this.users = [];
            this.getUsers();
        }
    };
    StudentComponent.prototype.resetSearchUsers = function () {
        this.searchUserForm.reset();
        this.users = [];
        this.userModal = {};
        this.getUsers();
    };
    StudentComponent.prototype.getUsers = function (load) {
        var _this = this;
        var user = {
            user_type: app_constants_1.AppConstants.USER_TYPE.Student
        };
        if (this.userModal.user_name) {
            user.user_name = this.userModal.user_name;
        }
        if (load) {
            user.start = this.users.length;
            user.size = app_constants_1.AppConstants.PAGINATION_SIZE;
        }
        if (this.selectedFilterGrade) {
            user.grade_id = this.selectedFilterGrade;
        }
        var response;
        response = this.userService.getUsers(user);
        response.subscribe(function (data) {
            if (data.status) {
                if (data.result.length) {
                    _this.users = _this.users.concat(data.result);
                    if (data.result.length < app_constants_1.AppConstants.PAGINATION_SIZE) {
                        _this.hasMoreStudents = false;
                    }
                    else {
                        _this.hasMoreStudents = true;
                    }
                }
            }
        }, function (err) {
            console.log(err);
        });
    };
    StudentComponent.prototype.getGrades = function () {
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
    StudentComponent.prototype.showResetPasswordConfirm = function (userId) {
        this.userModal = {
            user_id: userId
        };
        this.resetPasswordModal.show();
    };
    StudentComponent.prototype.closeResetPasswordModal = function () {
        this.userModal = {};
        this.resetPasswordModal.hide();
    };
    StudentComponent.prototype.resetPassword = function () {
        var _this = this;
        var user = this.userModal;
        var response;
        response = this.userService.resetPassword(user);
        response.subscribe(function (data) {
            if (data.status) {
                _this.userSuccessMessage = true;
                _this.message = data.result;
                setTimeout(function () {
                    this.userSuccessMessage = false;
                }.bind(_this), 3000);
            }
            else {
                _this.userFailureMessage = true;
                _this.message = data.result;
                setTimeout(function () {
                    this.userFailureMessage = false;
                }.bind(_this), 3000);
            }
            _this.userModal = {};
            _this.resetPasswordModal.hide();
        }, function (err) {
            console.log(err);
        });
    };
    StudentComponent.prototype.createStudent = function (value) {
        var _this = this;
        var response;
        if (this.studentForm.valid) {
            if (this.isEditStudent) {
                value.user_id = this.userModal.user_id;
            }
            else {
                value.user_type = app_constants_1.AppConstants.USER_TYPE.Student;
            }
            response = this.userService.createUser(value);
            response.subscribe(function (data) {
                if (data.status) {
                    _this.studentForm.reset();
                    _this.selectedGrade = '';
                    _this.studentCreatedSuccessMessage = true;
                    _this.message = data.result;
                    setTimeout(function () {
                        this.studentCreatedSuccessMessage = false;
                    }.bind(_this), 3000);
                    _this.users = [];
                    _this.getUsers();
                }
                else {
                    _this.studentCreatedFailureMessage = true;
                    _this.message = data.result;
                    setTimeout(function () {
                        this.studentCreatedFailureMessage = false;
                    }.bind(_this), 3000);
                }
                if (_this.isEditStudent) {
                    _this.userModal = {};
                    _this.isEditStudent = false;
                }
            }, function (err) {
                console.log(err);
            });
        }
    };
    StudentComponent.prototype.showDeleteConfirm = function (index, userId) {
        this.userModal = {
            user_id: userId,
            index: index
        };
        this.deleteStudentModal.show();
    };
    StudentComponent.prototype.closeDeleteStudentModal = function () {
        this.userModal = {};
        this.deleteStudentModal.hide();
    };
    StudentComponent.prototype.deleteStudent = function () {
        var _this = this;
        var user = this.userModal;
        var response;
        response = this.userService.deleteUser(user);
        response.subscribe(function (data) {
            if (data.status) {
                _this.users.splice(user.index, 1);
                _this.userSuccessMessage = true;
                _this.message = data.result;
                setTimeout(function () {
                    this.userSuccessMessage = false;
                }.bind(_this), 3000);
            }
            else {
                _this.userFailureMessage = true;
                _this.message = data.result;
                setTimeout(function () {
                    this.userFailureMessage = false;
                }.bind(_this), 3000);
            }
            _this.userModal = {};
            _this.deleteStudentModal.hide();
        }, function (err) {
            console.log(err);
        });
    };
    StudentComponent.prototype.editStudent = function (userId, userName, gradeId) {
        this.userModal = {
            user_id: userId
        };
        this.isEditStudent = true;
        this.studentForm.setValue({
            'user_name': userName,
            'grade_id': gradeId
        });
    };
    StudentComponent.prototype.cancelStudentEdit = function () {
        this.userModal = {};
        this.isEditStudent = false;
        this.studentForm.reset();
        this.selectedGrade = '';
    };
    __decorate([
        core_1.ViewChild('deleteStudentModal'), 
        __metadata('design:type', ng2_bootstrap_1.ModalDirective)
    ], StudentComponent.prototype, "deleteStudentModal", void 0);
    __decorate([
        core_1.ViewChild('resetPasswordModal'), 
        __metadata('design:type', ng2_bootstrap_1.ModalDirective)
    ], StudentComponent.prototype, "resetPasswordModal", void 0);
    StudentComponent = __decorate([
        core_1.Component({
            selector: 'student',
            templateUrl: '/apllearning/resources/views/admin/student.component.html',
            providers: [user_service_1.UserService, grade_service_1.GradeService]
        }), 
        __metadata('design:paramtypes', [forms_1.FormBuilder, user_service_1.UserService, grade_service_1.GradeService])
    ], StudentComponent);
    return StudentComponent;
}());
exports.StudentComponent = StudentComponent;
//# sourceMappingURL=student.component.js.map