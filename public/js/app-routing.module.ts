import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Common components
import { LoginComponent } from './login.component';
import { NavHeaderComponent } from './nav-header.component';
import { ChangePasswordComponent } from './change-password.component';
// SuperAdmin components
import { DashboardComponent } from './superAdmin/dashboard.component';
// Admin components
import { AdminDashboardComponent } from './admin/admin-dashboard.component';
import { StudentComponent } from './admin/student.component';
import { GradeComponent } from './admin/grade.component';
import { SubjectComponent } from './admin/subject.component';
// Teacher components
import { TeacherDashboardComponent } from './teacher/teacher-dashboard.component';
// Student components
import { StudentDashboardComponent } from './student/student-dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: '/apllearning', pathMatch: 'full' },
  { path: 'apllearning', component: LoginComponent },
  { path: 'apllearning/superAdmin/dashboard', component: DashboardComponent },
  { path: 'apllearning/user/changePassword', component: ChangePasswordComponent },
  { path: 'apllearning/admin/dashboard', component: AdminDashboardComponent },
  { path: 'apllearning/admin/student', component: StudentComponent },
  { path: 'apllearning/admin/grade', component: GradeComponent },
  { path: 'apllearning/admin/subject', component: SubjectComponent },
  { path: 'apllearning/teacher/dashboard', component: TeacherDashboardComponent },
  { path: 'apllearning/teacher/student', component: StudentComponent },
  { path: 'apllearning/teacher/subject', component: SubjectComponent },
  { path: 'apllearning/student/dashboard', component: StudentDashboardComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
