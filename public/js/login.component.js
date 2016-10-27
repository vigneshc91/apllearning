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
var login_logout_service_1 = require('./service/login-logout.service');
var app_constants_1 = require('./helper/app.constants');
var LoginComponent = (function () {
    function LoginComponent(fb, loginLogoutService) {
        this.loginLogoutService = loginLogoutService;
        this.userLoginFailureMessage = false;
        this.loginForm = fb.group({
            'user_name': [null, forms_1.Validators.required],
            'password': [null, forms_1.Validators.required]
        });
    }
    LoginComponent.prototype.login = function (value) {
        var _this = this;
        var response;
        if (this.loginForm.valid) {
            response = this.loginLogoutService.login(value);
            response.subscribe(function (data) {
                if (data.status) {
                    switch (data.result) {
                        case app_constants_1.AppConstants.USER_TYPE.SuperAdmin:
                            location.href = "superAdmin/dashboard";
                            break;
                        case app_constants_1.AppConstants.USER_TYPE.Admin:
                            location.href = "admin/dashboard";
                            break;
                        case app_constants_1.AppConstants.USER_TYPE.Teacher:
                            console.log("Techer");
                            break;
                        case app_constants_1.AppConstants.USER_TYPE.Student:
                            console.log("Student");
                            break;
                    }
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
            providers: [login_logout_service_1.LoginLogoutService]
        }), 
        __metadata('design:paramtypes', [forms_1.FormBuilder, login_logout_service_1.LoginLogoutService])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map