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
var MaterialService = (function () {
    function MaterialService(http) {
        this.http = http;
        this.getMaterialsUrl = app_constants_1.AppConstants.AppUrl + "teacher/getMaterialsList";
        this.createMaterialUrl = app_constants_1.AppConstants.AppUrl + "teacher/createMaterial";
        this.editMaterialUrl = app_constants_1.AppConstants.AppUrl + "teacher/editMaterial";
        this.deleteMaterialUrl = app_constants_1.AppConstants.AppUrl + "teacher/deleteMaterial";
    }
    MaterialService.prototype.getMaterials = function (data) {
        var headers = new http_1.Headers({ 'Content-type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(this.getMaterialsUrl, data, options)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || "Server error"); });
    };
    MaterialService.prototype.createMaterial = function (data) {
        var headers = new http_1.Headers({ 'Content-type': 'multipart/form-data' });
        var options = new http_1.RequestOptions({ headers: headers });
        var url = data.material_id == null ? this.createMaterialUrl : this.editMaterialUrl;
        var fd = new FormData();
        if (data.material_id) {
            fd.append('material_id', data.material_id);
        }
        if (data.grade_id) {
            fd.append('grade_id', data.grade_id);
        }
        if (data.subject_id) {
            fd.append('subject_id', data.subject_id);
        }
        if (data.title) {
            fd.append('title', data.title);
        }
        if (data.url) {
            fd.append('url', data.url);
        }
        if (data.description) {
            fd.append('description', data.description);
        }
        var xhr = new XMLHttpRequest();
        xhr.open('post', url, true);
        xhr.send(fd);
        return Rx_1.Observable.create(function (res) {
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        res.next(JSON.parse(xhr.response));
                    }
                    else {
                        res.error(xhr.response);
                    }
                }
            };
        });
        /*return this.http.post(url, fd, options)
                        .map((res:Response) => res.json())
                        .catch((error:any) => Observable.throw(error.json().error || "Server error" ));
        */
    };
    MaterialService.prototype.deleteMaterial = function (data) {
        var headers = new http_1.Headers({ 'Content-type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(this.deleteMaterialUrl, data, options)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || "Server error"); });
    };
    MaterialService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], MaterialService);
    return MaterialService;
}());
exports.MaterialService = MaterialService;
//# sourceMappingURL=material.service.js.map