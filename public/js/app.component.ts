import { Component } from '@angular/core';
import { LoginComponent } from './login.component';
import { NavHeaderComponent } from './nav-header.component';
import { DashboardComponent } from './superAdmin/dashboard.component';

function getComponent():string{
    let result:string;
    let component = location.pathname.replace('/apllearning/', '');

    switch (component) {
        case 'superAdmin/dashboard':
            result = '<nav-header></nav-header><super-admin></super-admin>';
            break;
        case 'user/changePassword':
            result = '<nav-header></nav-header><change-password></change-password>';
            break;
        case 'admin/dashboard':
            result = '<nav-header></nav-header><admin></admin>';
            break;
        case 'admin/student':
            result = '<nav-header></nav-header><student></student>';
            break;
        case 'admin/grade':
            result = '<nav-header></nav-header><grade></grade>';
            break;
        case 'admin/subject':
            result = '<nav-header></nav-header><subject></subject>';
            break;
        case 'teacher/dashboard':
            result = '<nav-header></nav-header><material></material>';
            break;
        case 'teacher/student':
            result = '<nav-header></nav-header><student></student>';
            break;
        case 'teacher/subject':
            result = '<nav-header></nav-header><subject></subject>';
            break;
        case 'student/dashboard':
            result = '<nav-header></nav-header><student-material></student-material>';
            break;
        default:
            result = '<login-section></login-section>';
            break;
    }

    return result;
}

@Component({
  selector: 'apl-learning',
  template: getComponent()
})

export class AppComponent { }
