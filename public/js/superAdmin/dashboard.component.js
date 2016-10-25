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
var app_constants_1 = require('../helper/app.constants');
var user_service_1 = require('../service/user.service');
var DashboardComponent = (function () {
    function DashboardComponent(fb, userService) {
        this.userService = userService;
        this.adminCreatedSuccessMessage = false;
        this.adminCreatedFailureMessage = false;
        this.adminSuccessMessage = false;
        this.adminFailureMessage = false;
        this.hasMoreAdmins = true;
        this.users = [];
        this.createAdminForm = fb.group({
            "user_name": [null, forms_1.Validators.required]
        });
    }
    DashboardComponent.prototype.ngOnInit = function () {
        this.getUsers();
    };
    DashboardComponent.prototype.getUsers = function (load) {
        var _this = this;
        var user = {
            user_type: app_constants_1.AppConstants.USER_TYPE.Admin
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
                        _this.hasMoreAdmins = false;
                    }
                }
            }
        }, function (err) {
            console.log(err);
        });
    };
    DashboardComponent.prototype.resetPassword = function (userId) {
        var _this = this;
        var user = {
            user_id: userId
        };
        var response;
        response = this.userService.resetPassword(user);
        response.subscribe(function (data) {
            if (data.status) {
                _this.adminSuccessMessage = true;
                _this.message = data.result;
                setTimeout(function () {
                    this.adminSuccessMessage = false;
                }.bind(_this), 3000);
            }
            else {
                _this.adminFailureMessage = true;
                _this.message = data.result;
                setTimeout(function () {
                    this.adminFailureMessage = false;
                }.bind(_this), 3000);
            }
        }, function (err) {
            console.log(err);
        });
    };
    DashboardComponent.prototype.createAdmin = function (value) {
        var _this = this;
        var response;
        if (this.createAdminForm.valid) {
            value.user_type = app_constants_1.AppConstants.USER_TYPE.Admin;
            response = this.userService.createUser(value);
            response.subscribe(function (data) {
                if (data.status) {
                    _this.createAdminForm.reset();
                    _this.adminCreatedSuccessMessage = true;
                    _this.message = data.result;
                    setTimeout(function () {
                        this.adminCreatedSuccessMessage = false;
                    }.bind(_this), 3000);
                    _this.users = [];
                    _this.getUsers();
                }
                else {
                    _this.adminCreatedFailureMessage = true;
                    _this.message = data.result;
                    setTimeout(function () {
                        this.adminCreatedFailureMessage = false;
                    }.bind(_this), 3000);
                }
            }, function (err) {
                console.log(err);
            });
        }
    };
    DashboardComponent.prototype.deleteAdmin = function (index, userId) {
        var _this = this;
        var user = {
            user_id: userId
        };
        var response;
        response = this.userService.deleteUser(user);
        response.subscribe(function (data) {
            if (data.status) {
                _this.users.splice(index, 1);
                _this.adminSuccessMessage = true;
                _this.message = data.result;
                setTimeout(function () {
                    this.adminSuccessMessage = false;
                }.bind(_this), 3000);
            }
            else {
                _this.adminFailureMessage = true;
                _this.message = data.result;
                setTimeout(function () {
                    this.adminFailureMessage = false;
                }.bind(_this), 3000);
            }
        }, function (err) {
            console.log(err);
        });
    };
    DashboardComponent = __decorate([
        core_1.Component({
            selector: 'super-admin',
            templateUrl: '/apllearning/resources/views/superAdmin/dashboard.component.html',
            providers: [user_service_1.UserService]
        }), 
        __metadata('design:paramtypes', [forms_1.FormBuilder, user_service_1.UserService])
    ], DashboardComponent);
    return DashboardComponent;
}());
exports.DashboardComponent = DashboardComponent;
//# sourceMappingURL=dashboard.component.js.map