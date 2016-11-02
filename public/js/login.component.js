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
var router_1 = require('@angular/router');
var forms_1 = require('@angular/forms');
var login_logout_service_1 = require('./service/login-logout.service');
var user_service_1 = require('./service/user.service');
var app_constants_1 = require('./helper/app.constants');
var LoginComponent = (function () {
    function LoginComponent(router, fb, loginLogoutService, userService) {
        this.router = router;
        this.loginLogoutService = loginLogoutService;
        this.userService = userService;
        this.userLoginFailureMessage = false;
        this.getLoggedInUser();
        this.loginForm = fb.group({
            'user_name': [null, forms_1.Validators.required],
            'password': [null, forms_1.Validators.required]
        });
    }
    LoginComponent.prototype.getLoggedInUser = function () {
        var _this = this;
        var response;
        response = this.userService.getLoggedInUser();
        response.subscribe(function (data) {
            if (data.status) {
                _this.redirectUser(data.result.user_type);
            }
        }, function (err) {
            console.log(err);
        });
    };
    LoginComponent.prototype.login = function (value) {
        var _this = this;
        var response;
        if (this.loginForm.valid) {
            response = this.loginLogoutService.login(value);
            response.subscribe(function (data) {
                if (data.status) {
                    _this.redirectUser(data.result);
                }
                else {
                    _this.userLoginFailureMessage = true;
                    _this.message = data.result;
                    setTimeout(function () {
                        this.userLoginFailureMessage = false;
                    }.bind(_this), 3000);
                }
            }, function (err) {
                console.log(err);
            });
        }
    };
    LoginComponent.prototype.redirectUser = function (userType) {
        switch (userType) {
            case app_constants_1.AppConstants.USER_TYPE.SuperAdmin:
                // location.href = "superAdmin/dashboard";
                this.router.navigate(['apllearning/superAdmin/dashboard']);
                break;
            case app_constants_1.AppConstants.USER_TYPE.Admin:
                // location.href = "admin/dashboard";
                this.router.navigate(['apllearning/admin/dashboard']);
                break;
            case app_constants_1.AppConstants.USER_TYPE.Teacher:
                // location.href = "teacher/dashboard";
                this.router.navigate(['apllearning/teacher/dashboard']);
                break;
            case app_constants_1.AppConstants.USER_TYPE.Student:
                // location.href = "student/dashboard";
                this.router.navigate(['apllearning/student/dashboard']);
                break;
        }
    };
    LoginComponent.prototype.logout = function () {
        var response;
        response = this.loginLogoutService.logout();
        response.subscribe(function (data) {
            if (data.status) {
                console.log(data.result);
            }
            else {
                console.log(data.result);
            }
        }, function (err) {
            console.log(err);
        });
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'login-section',
            templateUrl: '/apllearning/resources/views/login.component.html',
            providers: [login_logout_service_1.LoginLogoutService, user_service_1.UserService]
        }), 
        __metadata('design:paramtypes', [router_1.Router, forms_1.FormBuilder, login_logout_service_1.LoginLogoutService, user_service_1.UserService])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map