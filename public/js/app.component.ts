import { Component } from '@angular/core';
import { LoginComponent } from './login.component';
import { DashboardComponent } from './superAdmin/dashboard.component';

@Component({
  selector: 'apl-learning',
  template: (()=>{
      if(location.pathname.match('superAdmin').length){
          return '<h1>Super Admin</h1><super-admin></super-admin>';
      } else {
        return '<h1>Welcome</h1><login-section></login-section>';
      }
  })()
})

export class AppComponent { }
