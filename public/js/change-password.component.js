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
var user_service_1 = require('./service/user.service');
var ChangePasswordComponent = (function () {
    function ChangePasswordComponent(fb, userService) {
        this.userService = userService;
        this.passwordSuccessMessage = false;
        this.passwordFailureMessage = false;
        this.changePasswordForm = fb.group({
            'old_password': [null, forms_1.Validators.required],
            'new_password': [null, forms_1.Validators.required],
            'confirm_new_password': [null, forms_1.Validators.required]
        });
    }
    ChangePasswordComponent.prototype.passwordMatch = function (field1, field2) {
        return field1 == field2 ? null : { passwordMatch: false };
    };
    ChangePasswordComponent.prototype.changePassword = function (value) {
        var _this = this;
        var response;
        if (this.changePasswordForm.valid) {
            response = this.userService.changePassword(value);
            response.subscribe(function (data) {
                if (data.status) {
                    _this.changePasswordForm.reset();
                    _this.passwordSuccessMessage = true;
                    _this.message = data.result;
                    setTimeout(function () {
                        this.passwordSuccessMessage = false;
                    }.bind(_this), 3000);
                }
                else {
                    _this.passwordFailureMessage = true;
                    _this.message = data.result;
                    setTimeout(function () {
                        this.passwordFailureMessage = false;
                    }.bind(_this), 3000);
                }
            }, function (err) {
                console.log(err);
            });
        }
    };
    ChangePasswordComponent = __decorate([
        core_1.Component({
            selector: 'change-password',
            templateUrl: '/apllearning/resources/views/change-password.component.html',
            providers: [user_service_1.UserService]
        }), 
        __metadata('design:paramtypes', [forms_1.FormBuilder, user_service_1.UserService])
    ], ChangePasswordComponent);
    return ChangePasswordComponent;
}());
exports.ChangePasswordComponent = ChangePasswordComponent;
//# sourceMappingURL=change-password.component.js.map