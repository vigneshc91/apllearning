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
var user_service_1 = require('../service/user.service');
var AdminDashboardComponent = (function () {
    function AdminDashboardComponent(fb, userService) {
        this.userService = userService;
        this.teacherCreatedSuccessMessage = false;
        this.teacherCreatedFailureMessage = false;
        this.userSuccessMessage = false;
        this.userFailureMessage = false;
        this.users = [];
        this.createTeacherForm = fb.group({
            "user_name": [null, forms_1.Validators.required]
        });
    }
    AdminDashboardComponent.prototype.ngOnInit = function () {
        this.getUsers();
    };
    AdminDashboardComponent.prototype.getUsers = function (load) {
        var _this = this;
        var user = {
            user_type: app_constants_1.AppConstants.USER_TYPE.Teacher
        };
        if (load) {
            user.start = this.users.length;
            user.size = app_constants_1.AppConstants.PAGINATION_SIZE;
        }
        var response;
        response = this.userService.getUsers(user);
        response.subscribe(function (data) {
            if (data.status) {
                if (data.result.length) {
                    _this.users = _this.users.concat(data.result);
                    if (data.result.length < app_constants_1.AppConstants.PAGINATION_SIZE) {
                        _this.hasMoreTeachers = false;
                    }
                    else {
                        _this.hasMoreTeachers = true;
                    }
                }
            }
        }, function (err) {
            console.log(err);
        });
    };
    AdminDashboardComponent.prototype.showResetPasswordConfirm = function (userId) {
        this.userModal = {
            user_id: userId
        };
        this.resetPasswordModal.show();
    };
    AdminDashboardComponent.prototype.closeResetPasswordModal = function () {
        this.userModal = {};
        this.resetPasswordModal.hide();
    };
    AdminDashboardComponent.prototype.resetPassword = function () {
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
    AdminDashboardComponent.prototype.createTeacher = function (value) {
        var _this = this;
        var response;
        if (this.createTeacherForm.valid) {
            value.user_type = app_constants_1.AppConstants.USER_TYPE.Teacher;
            response = this.userService.createUser(value);
            response.subscribe(function (data) {
                if (data.status) {
                    _this.createTeacherForm.reset();
                    _this.teacherCreatedSuccessMessage = true;
                    _this.message = data.result;
                    setTimeout(function () {
                        this.teacherCreatedSuccessMessage = false;
                    }.bind(_this), 3000);
                    _this.users = [];
                    _this.getUsers();
                }
                else {
                    _this.teacherCreatedFailureMessage = true;
                    _this.message = data.result;
                    setTimeout(function () {
                        this.teacherCreatedFailureMessage = false;
                    }.bind(_this), 3000);
                }
            }, function (err) {
                console.log(err);
            });
        }
    };
    AdminDashboardComponent.prototype.showDeleteConfirm = function (index, userId) {
        this.userModal = {
            user_id: userId,
            index: index
        };
        this.deleteTeacherModal.show();
    };
    AdminDashboardComponent.prototype.closeDeleteTeacherModal = function () {
        this.userModal = {};
        this.deleteTeacherModal.hide();
    };
    AdminDashboardComponent.prototype.deleteTeacher = function () {
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
            _this.deleteTeacherModal.hide();
        }, function (err) {
            console.log(err);
        });
    };
    __decorate([
        core_1.ViewChild('deleteTeacherModal'), 
        __metadata('design:type', ng2_bootstrap_1.ModalDirective)
    ], AdminDashboardComponent.prototype, "deleteTeacherModal", void 0);
    __decorate([
        core_1.ViewChild('resetPasswordModal'), 
        __metadata('design:type', ng2_bootstrap_1.ModalDirective)
    ], AdminDashboardComponent.prototype, "resetPasswordModal", void 0);
    AdminDashboardComponent = __decorate([
        core_1.Component({
            selector: 'admin',
            templateUrl: '/apllearning/resources/views/admin/dashboard.component.html',
            providers: [user_service_1.UserService]
        }), 
        __metadata('design:paramtypes', [forms_1.FormBuilder, user_service_1.UserService])
    ], AdminDashboardComponent);
    return AdminDashboardComponent;
}());
exports.AdminDashboardComponent = AdminDashboardComponent;
//# sourceMappingURL=admin-dashboard.component.js.map