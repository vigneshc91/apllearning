import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { ServiceResponse } from './model/service-response.model';
import { UserModel } from './model/user.model';
import { UserService } from './service/user.service';
import { AppConstants } from './helper/app.constants';
import { DashboardComponent } from './superAdmin/dashboard.component';

@Component({
  selector: 'nav-header',
  templateUrl:'/apllearning/resources/views/nav-header.component.html',
  providers: [ UserService ]
})

export class NavHeaderComponent implements OnInit {
    
    loggedInUser:UserModel;

    constructor(private userService: UserService){
        this.loggedInUser = {};
    }

    ngOnInit(){
        this.getLoggedInUser();
    }

    getLoggedInUser(){
        let response:Observable<ServiceResponse>;
        response = this.userService.getLoggedInUser();
        response.subscribe(
            data => {
                if(data.status){
                    this.loggedInUser = data.result;
                } else {
                    location.href = "/apllearning";
                }
            },
            err => {
                console.log(err);
            }
        );
    }
}