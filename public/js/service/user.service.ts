import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { ServiceResponse } from '../model/service-response.model';
import { UserModel } from '../model/user.model';
import { ChangePasswordModel } from '../model/change-password.model';
import { AppConstants } from '../helper/app.constants';

@Injectable()

export class UserService {

    private getUsersUrl = AppConstants.AppUrl + "admin/getUsersList";
    private resetPasswordUrl = AppConstants.AppUrl + "superAdmin/resetPassword";
    private createUserUrl = AppConstants.AppUrl + "superAdmin/createUser";
    private deleteUserUrl = AppConstants.AppUrl + "superAdmin/deleteUser";
    private changePasswordUrl = AppConstants.AppUrl + "user/changePassword";
    private getLoggedInUserUrl = AppConstants.AppUrl + "user/getLoggedInUser";
    
    constructor(private http: Http){

    }

    getUsers(data:UserModel): Observable<ServiceResponse> {
        let headers = new Headers({ 'Content-type': 'application/json' });
        let options = new RequestOptions({ headers });
        
        return this.http.post(this.getUsersUrl, data, options)
                        .map((res:Response) => res.json())
                        .catch((error:any) => Observable.throw(error.json().error || "Server error" ));
    }

     resetPassword(data:UserModel): Observable<ServiceResponse> {
        let headers = new Headers({ 'Content-type': 'application/json' });
        let options = new RequestOptions({ headers });
        
        return this.http.post(this.resetPasswordUrl, data, options)
                        .map((res:Response) => res.json())
                        .catch((error:any) => Observable.throw(error.json().error || "Server error" ));
    }

    createUser(data:UserModel): Observable<ServiceResponse> {
        let headers = new Headers({ 'Content-type': 'application/json' });
        let options = new RequestOptions({ headers });
        
        return this.http.post(this.createUserUrl, data, options)
                        .map((res:Response) => res.json())
                        .catch((error:any) => Observable.throw(error.json().error || "Server error" ));
    }

    deleteUser(data:UserModel): Observable<ServiceResponse> {
        let headers = new Headers({ 'Content-type': 'application/json' });
        let options = new RequestOptions({ headers });
        
        return this.http.post(this.deleteUserUrl, data, options)
                        .map((res:Response) => res.json())
                        .catch((error:any) => Observable.throw(error.json().error || "Server error" ));
    }

    changePassword(data:UserModel): Observable<ServiceResponse> {
        let headers = new Headers({ 'Content-type': 'application/json' });
        let options = new RequestOptions({ headers });
        
        return this.http.post(this.changePasswordUrl, data, options)
                        .map((res:Response) => res.json())
                        .catch((error:any) => Observable.throw(error.json().error || "Server error" ));
    }

    getLoggedInUser(): Observable<ServiceResponse> {
        let headers = new Headers({ 'Content-type': 'application/json' });
        let options = new RequestOptions({ headers });
        
        return this.http.post(this.getLoggedInUserUrl, '', options)
                        .map((res:Response) => res.json())
                        .catch((error:any) => Observable.throw(error.json().error || "Server error" ));
    }


}