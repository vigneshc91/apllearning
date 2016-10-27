import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { ServiceResponse } from '../model/service-response.model';
import { GradeModel } from '../model/grade.model';
import { AppConstants } from '../helper/app.constants';

@Injectable()

export class GradeService {

    private getGradesUrl:string = AppConstants.AppUrl + "admin/getGradesList"; 
    private createGradeUrl:string = AppConstants.AppUrl + "admin/createGrade"; 
    private deleteGradeUrl:string = AppConstants.AppUrl + "admin/deleteGrade";

    constructor(private http: Http){

    }

    getGrades(data:GradeModel): Observable<ServiceResponse> {
        let headers = new Headers({ 'Content-type': 'application/json' });
        let options = new RequestOptions({ headers });
        
        return this.http.post(this.getGradesUrl, data, options)
                        .map((res:Response) => res.json())
                        .catch((error:any) => Observable.throw(error.json().error || "Server error" ));
    }

    createGrade(data:GradeModel): Observable<ServiceResponse> {
        let headers = new Headers({ 'Content-type': 'application/json' });
        let options = new RequestOptions({ headers });
        
        return this.http.post(this.createGradeUrl, data, options)
                        .map((res:Response) => res.json())
                        .catch((error:any) => Observable.throw(error.json().error || "Server error" ));
    }

    deleteGrade(data:GradeModel): Observable<ServiceResponse> {
        let headers = new Headers({ 'Content-type': 'application/json' });
        let options = new RequestOptions({ headers });
        
        return this.http.post(this.deleteGradeUrl, data, options)
                        .map((res:Response) => res.json())
                        .catch((error:any) => Observable.throw(error.json().error || "Server error" ));
    }

}