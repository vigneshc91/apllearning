import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { ServiceResponse } from '../model/service-response.model';
import { MaterialModel } from '../model/material.model';
import { AppConstants } from '../helper/app.constants';

@Injectable()

export class MaterialService {

    private getMaterialsUrl:string = AppConstants.AppUrl + "teacher/getMaterialsList";
    private createMaterialUrl:string = AppConstants.AppUrl + "teacher/createMaterial"; 
    private editMaterialUrl:string = AppConstants.AppUrl + "teacher/editMaterial"; 
    private deleteMaterialUrl:string = AppConstants.AppUrl + "teacher/deleteMaterial";

    constructor(private http: Http){

    }

    getMaterials(data:MaterialModel): Observable<ServiceResponse> {
        let headers = new Headers({ 'Content-type': 'application/json' });
        let options = new RequestOptions({ headers });
        
        return this.http.post(this.getMaterialsUrl, data, options)
                        .map((res:Response) => res.json())
                        .catch((error:any) => Observable.throw(error.json().error || "Server error" ));
    }

    createMaterial(data:MaterialModel): Observable<ServiceResponse> {
        let headers = new Headers({ 'Content-type': 'application/json' });
        let options = new RequestOptions({ headers });
        let url = data.grade_id == null ? this.createMaterialUrl : this.editMaterialUrl;

        return this.http.post(url, data, options)
                        .map((res:Response) => res.json())
                        .catch((error:any) => Observable.throw(error.json().error || "Server error" ));
    }

    deleteMaterial(data:MaterialModel): Observable<ServiceResponse> {
        let headers = new Headers({ 'Content-type': 'application/json' });
        let options = new RequestOptions({ headers });
        
        return this.http.post(this.deleteMaterialUrl, data, options)
                        .map((res:Response) => res.json())
                        .catch((error:any) => Observable.throw(error.json().error || "Server error" ));
    }

}