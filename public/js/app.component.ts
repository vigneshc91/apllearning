import { Component } from '@angular/core';
import { LoginComponent } from './login.component';
import { NavHeaderComponent } from './nav-header.component';
import { DashboardComponent } from './superAdmin/dashboard.component';

@Component({
  selector: 'apl-learning',
  template: (()=>{
      if(location.pathname.match('superAdmin') != null){
          return '<nav-header></nav-header><super-admin></super-admin>';
      } else if(location.pathname.match('changePassword') != null) {
          return '<nav-header></nav-header><change-password></change-password>';
      } else if(location.pathname.match('admin/dashboard') != null){
          return '<nav-header></nav-header><admin></admin>';
      } else if(location.pathname.match('admin/student') != null){
          return '<nav-header></nav-header><student></student>';
      } else if(location.pathname.match('admin/grade') != null){
          return '<nav-header></nav-header><grade></grade>';
      } else if(location.pathname.match('admin/subject') != null){
          return '<nav-header></nav-header><subject></subject>';
      } else if(location.pathname.match('teacher/dashboard') != null){
          return '<nav-header></nav-header><material></material>';
      } else if(location.pathname.match('teacher/student') != null){
          return '<nav-header></nav-header><student></student>';
      } else if(location.pathname.match('teacher/subject') != null){
          return '<nav-header></nav-header><subject></subject>';
      } else {
          return '<h1>Welcome</h1><login-section></login-section>';
      }
  })()
})

export class AppComponent { }
