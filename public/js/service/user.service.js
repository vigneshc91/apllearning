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
var http_1 = require('@angular/http');
var Rx_1 = require('rxjs/Rx');
var app_constants_1 = require('../helper/app.constants');
var UserService = (function () {
    function UserService(http) {
        this.http = http;
        this.getUsersUrl = app_constants_1.AppConstants.AppUrl + "admin/getUsersList";
        this.resetPasswordUrl = app_constants_1.AppConstants.AppUrl + "superAdmin/resetPassword";
        this.createUserUrl = app_constants_1.AppConstants.AppUrl + "superAdmin/createUser";
        this.deleteUserUrl = app_constants_1.AppConstants.AppUrl + "superAdmin/deleteUser";
        this.changePasswordUrl = app_constants_1.AppConstants.AppUrl + "user/changePassword";
        this.getLoggedInUserUrl = app_constants_1.AppConstants.AppUrl + "user/getLoggedInUser";
        this.editStudentUrl = app_constants_1.AppConstants.AppUrl + "admin/editStudent";
    }
    UserService.prototype.getUsers = function (data) {
        var headers = new http_1.Headers({ 'Content-type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(this.getUsersUrl, data, options)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || "Server error"); });
    };
    UserService.prototype.resetPassword = function (data) {
        var headers = new http_1.Headers({ 'Content-type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(this.resetPasswordUrl, data, options)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || "Server error"); });
    };
    UserService.prototype.createUser = function (data) {
        var headers = new http_1.Headers({ 'Content-type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        var url = (data.user_id) == null ? this.createUserUrl : this.editStudentUrl;
        return this.http.post(url, data, options)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || "Server error"); });
    };
    UserService.prototype.deleteUser = function (data) {
        var headers = new http_1.Headers({ 'Content-type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(this.deleteUserUrl, data, options)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || "Server error"); });
    };
    UserService.prototype.changePassword = function (data) {
        var headers = new http_1.Headers({ 'Content-type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(this.changePasswordUrl, data, options)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || "Server error"); });
    };
    UserService.prototype.getLoggedInUser = function () {
        var headers = new http_1.Headers({ 'Content-type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(this.getLoggedInUserUrl, '', options)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || "Server error"); });
    };
    UserService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map