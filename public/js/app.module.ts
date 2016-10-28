import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ModalModule } from 'ng2-bootstrap/ng2-bootstrap';

// Common components
import { AppComponent }   from './app.component';
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

@NgModule({
  imports:      [ BrowserModule, FormsModule, ReactiveFormsModule, HttpModule, ModalModule ],
  declarations: [ AppComponent, LoginComponent, NavHeaderComponent, ChangePasswordComponent, DashboardComponent, AdminDashboardComponent, GradeComponent, StudentComponent, SubjectComponent, TeacherDashboardComponent ],
  bootstrap:    [ AppComponent ]
})

export class AppModule { }
