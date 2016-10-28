import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { ServiceResponse } from '../model/service-response.model';
import { SubjectModel } from '../model/subject.model';
import { AppConstants } from '../helper/app.constants';

@Injectable()

export class SubjectService {

    private getSubjectsUrl:string = AppConstants.AppUrl + "admin/getSubjectsList"; 
    private createSubjectUrl:string = AppConstants.AppUrl + "admin/createSubject"; 
    private editSubjectUrl:string = AppConstants.AppUrl + "admin/editSubject"; 
    private deleteSubjectUrl:string = AppConstants.AppUrl + "admin/deleteSubject";

    constructor(private http: Http){

    }

    getSubjects(data:SubjectModel): Observable<ServiceResponse> {
        let headers = new Headers({ 'Content-type': 'application/json' });
        let options = new RequestOptions({ headers });
        
        return this.http.post(this.getSubjectsUrl, data, options)
                        .map((res:Response) => res.json())
                        .catch((error:any) => Observable.throw(error.json().error || "Server error" ));
    }

    createSubject(data:SubjectModel): Observable<ServiceResponse> {
        let headers = new Headers({ 'Content-type': 'application/json' });
        let options = new RequestOptions({ headers });
        let url = data.subject_id == null ? this.createSubjectUrl : this.editSubjectUrl;

        return this.http.post(url, data, options)
                        .map((res:Response) => res.json())
                        .catch((error:any) => Observable.throw(error.json().error || "Server error" ));
    }

    deleteSubject(data:SubjectModel): Observable<ServiceResponse> {
        let headers = new Headers({ 'Content-type': 'application/json' });
        let options = new RequestOptions({ headers });
        
        return this.http.post(this.deleteSubjectUrl, data, options)
                        .map((res:Response) => res.json())
                        .catch((error:any) => Observable.throw(error.json().error || "Server error" ));
    }

}