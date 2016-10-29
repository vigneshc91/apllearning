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
        let headers = new Headers({ 'Content-type': 'multipart/form-data'});
        let options = new RequestOptions({ headers });
        let url = data.material_id == null ? this.createMaterialUrl : this.editMaterialUrl;
        let fd:FormData = new FormData();
        
        if(data.material_id){
            fd.append('material_id', data.material_id);
        }
        if(data.grade_id){
            fd.append('grade_id', data.grade_id);
        }
        if(data.subject_id){
            fd.append('subject_id', data.subject_id);
        }
        if(data.title){
            fd.append('title', data.title);
        }
        if(data.url){
            fd.append('url', data.url);
        }
        if(data.description){
            fd.append('description', data.description);
        }

        let xhr:XMLHttpRequest = new XMLHttpRequest();
        xhr.open('post', url, true);
        xhr.send(fd);
        return Observable.create(res => {
            xhr.onreadystatechange =() => {
                if(xhr.readyState == 4){
                    if(xhr.status == 200){
                        res.next(JSON.parse(xhr.response));
                    } else {
                        res.error(xhr.response);
                    }
                }
            }

        });
        
        
        /*return this.http.post(url, fd, options)
                        .map((res:Response) => res.json())
                        .catch((error:any) => Observable.throw(error.json().error || "Server error" ));
        */
    }

    deleteMaterial(data:MaterialModel): Observable<ServiceResponse> {
        let headers = new Headers({ 'Content-type': 'application/json' });
        let options = new RequestOptions({ headers });
        
        return this.http.post(this.deleteMaterialUrl, data, options)
                        .map((res:Response) => res.json())
                        .catch((error:any) => Observable.throw(error.json().error || "Server error" ));
    }

}