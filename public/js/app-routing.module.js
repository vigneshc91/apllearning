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
//Common components
var login_component_1 = require('./login.component');
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
var routes = [
    { path: '', redirectTo: '/apllearning', pathMatch: 'full' },
    { path: 'apllearning', component: login_component_1.LoginComponent },
    { path: 'apllearning/superAdmin/dashboard', component: dashboard_component_1.DashboardComponent },
    { path: 'apllearning/user/changePassword', component: change_password_component_1.ChangePasswordComponent },
    { path: 'apllearning/admin/dashboard', component: admin_dashboard_component_1.AdminDashboardComponent },
    { path: 'apllearning/admin/student', component: student_component_1.StudentComponent },
    { path: 'apllearning/admin/grade', component: grade_component_1.GradeComponent },
    { path: 'apllearning/admin/subject', component: subject_component_1.SubjectComponent },
    { path: 'apllearning/teacher/dashboard', component: teacher_dashboard_component_1.TeacherDashboardComponent },
    { path: 'apllearning/teacher/student', component: student_component_1.StudentComponent },
    { path: 'apllearning/teacher/subject', component: subject_component_1.SubjectComponent },
    { path: 'apllearning/student/dashboard', component: student_dashboard_component_1.StudentDashboardComponent },
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forRoot(routes)],
            exports: [router_1.RouterModule]
        }), 
        __metadata('design:paramtypes', [])
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
//# sourceMappingURL=app-routing.module.js.map