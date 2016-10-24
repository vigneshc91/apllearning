import { Component } from '@angular/core';
import { LoginComponent } from './login.component';
import { NavHeaderComponent } from './nav-header.component';
import { DashboardComponent } from './superAdmin/dashboard.component';

@Component({
  selector: 'apl-learning',
  template: (()=>{
      if(location.pathname.match('superAdmin') != null){
          return '<nav-header></nav-header><h1>Super Admin</h1><super-admin></super-admin>';
      } else if(location.pathname.match('changePassword') != null) {
          return '<nav-header></nav-header><change-password></change-password>';
      } else {
          return '<h1>Welcome</h1><login-section></login-section>';
      }
  })()
})

export class AppComponent { }
