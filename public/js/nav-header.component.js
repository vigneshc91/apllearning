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
var user_service_1 = require('./service/user.service');
var app_constants_1 = require('./helper/app.constants');
var NavHeaderComponent = (function () {
    function NavHeaderComponent(router, userService) {
        this.router = router;
        this.userService = userService;
        this.loggedInUser = {};
    }
    NavHeaderComponent.prototype.ngOnInit = function () {
        this.getLoggedInUser();
    };
    NavHeaderComponent.prototype.getLoggedInUser = function () {
        var _this = this;
        var response;
        response = this.userService.getLoggedInUser();
        response.subscribe(function (data) {
            if (data.status) {
                _this.loggedInUser = data.result;
                switch (_this.loggedInUser.user_type) {
                    case app_constants_1.AppConstants.USER_TYPE.SuperAdmin:
                        _this.userType = "Super Admin";
                        _this.userDashboard = "/apllearning/superAdmin/dashboard";
                        break;
                    case app_constants_1.AppConstants.USER_TYPE.Admin:
                        _this.userType = "Admin";
                        _this.userDashboard = "/apllearning/admin/dashboard";
                        break;
                    case app_constants_1.AppConstants.USER_TYPE.Teacher:
                        _this.userType = "Teacher";
                        _this.userDashboard = "/apllearning/teacher/dashboard";
                        break;
                    case app_constants_1.AppConstants.USER_TYPE.Student:
                        _this.userType = "Student";
                        _this.userDashboard = "/apllearning/student/dashboard";
                        break;
                }
            }
            else {
                // location.href = "/apllearning";
                _this.router.navigate(['']);
            }
        }, function (err) {
            console.log(err);
        });
    };
    NavHeaderComponent = __decorate([
        core_1.Component({
            selector: 'nav-header',
            templateUrl: '/apllearning/resources/views/nav-header.component.html',
            providers: [user_service_1.UserService]
        }), 
        __metadata('design:paramtypes', [router_1.Router, user_service_1.UserService])
    ], NavHeaderComponent);
    return NavHeaderComponent;
}());
exports.NavHeaderComponent = NavHeaderComponent;
//# sourceMappingURL=nav-header.component.js.map