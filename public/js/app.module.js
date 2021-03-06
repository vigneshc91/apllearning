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
var platform_browser_1 = require('@angular/platform-browser');
var forms_1 = require('@angular/forms');
var http_1 = require('@angular/http');
var ng2_bootstrap_1 = require('ng2-bootstrap/ng2-bootstrap');
// Common components
var app_routing_module_1 = require('./app-routing.module');
var app_component_1 = require('./app.component');
var login_component_1 = require('./login.component');
var nav_header_component_1 = require('./nav-header.component');
var change_password_component_1 = require('./change-password.component');
// SuperAdmin components
var dashboard_component_1 = require('./superAdmin/dashboard.component');
// Admin components
var admin_dashboard_component_1 = require('./admin/admin-dashboard.component');
var student_component_1 = require('./admin/student.component');
var grade_component_1 = require('./admin/grade.component');
var subject_component_1 = require('./admin/subject.component');
// Teacher components
var teacher_dashboard_component_1 = require('./teacher/teacher-dashboard.component');
// Student components
var student_dashboard_component_1 = require('./student/student-dashboard.component');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule, forms_1.FormsModule, forms_1.ReactiveFormsModule, http_1.HttpModule, ng2_bootstrap_1.ModalModule, app_routing_module_1.AppRoutingModule],
            declarations: [app_component_1.AppComponent, login_component_1.LoginComponent, nav_header_component_1.NavHeaderComponent, change_password_component_1.ChangePasswordComponent, dashboard_component_1.DashboardComponent, admin_dashboard_component_1.AdminDashboardComponent, grade_component_1.GradeComponent, student_component_1.StudentComponent, subject_component_1.SubjectComponent, teacher_dashboard_component_1.TeacherDashboardComponent, student_dashboard_component_1.StudentDashboardComponent],
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map