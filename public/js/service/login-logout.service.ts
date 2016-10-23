import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { ServiceResponse } from '../model/service-response.model';
import { LoginModel } from '../model/login.model';
import { AppConstants } from '../helper/app.constants';

@Injectable()

export class LoginLogoutService {

    private loginUrl = AppConstants.AppUrl + "user/login";
    private logoutUrl = AppConstants.AppUrl + "user/logout";

    constructor(private http: Http){

    }

    login(data:LoginModel): Observable<ServiceResponse> {
        let headers = new Headers({ 'Content-type': 'application/json' });
        let options = new RequestOptions({ headers });
        
        return this.http.post(this.loginUrl, data, options)
                        .map((res:Response) => res.json())
                        .catch((error:any) => Observable.throw(error.json().error || "Server error" ));
    }

    logout(): Observable<ServiceResponse> {
        let body;
        let headers = new Headers({ 'Content-type': 'application/json' });
        let options = new RequestOptions({ headers });

        return this.http.post(this.logoutUrl, body, options)
                        .map((res:Response) => res.json())
                        .catch((error:any) => Observable.throw(error.json().error || "Server error" ));
    }
}