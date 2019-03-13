// import { AlertService } from 'ngx-alerts';
// import { delay, get } from 'lodash';
// import { Http, Headers, RequestOptions, ResponseContentType, Response } from '@angular/http';
import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs/Observable';
// import { Router } from '@angular/router';

import { HttpResponse } from './http.interface';
import { requestTypes } from './http.enum';
// import { SpinnerService } from '../spinner/spinner.service';

@Injectable({providedIn: 'root'})
export class HttpService {
    // constructor(
    //     // private alertService: AlertService,
    //     private http: Http,
    //     private router: Router
    // ) {}
    //
    // httpRequest(url: string, method: requestTypes, {bodyObj, isLoader}: {bodyObj?: any, isLoader?: boolean}) {
    //     const loader: boolean = isLoader ? isLoader : true;
    //     // const path: string = CONSTANTS.API.PREFIX + url;
    //     const path: string = '';
    //     const body: any = bodyObj || {};
    //     const responseType: ResponseContentType = ResponseContentType.Json;
    //     const options: { withCredentials: boolean } = { withCredentials: true };
    //     const headers = new Headers({
    //         'Content-Type': 'application/json',
    //     });
    //     let request: Observable<Response>;
    //
    //     if (method === requestTypes.DELETE) {
    //         request = this.http.delete(path, new RequestOptions({ ...options, body }));
    //     } else if(method === requestTypes.GET) {
    //         request = this.http.get(path, {
    //             ...options,
    //             params: body,
    //             responseType
    //         });
    //     } else {
    //         request = this.http[method](path, body, new RequestOptions({headers: headers, withCredentials: true}));
    //     }
    //
    //     return this.responseMapCatch(request, isLoader);
    // }
    //
    // private responseMapCatch(response: Observable<Response>, isLoader: boolean): Observable<HttpResponse<any>> {
    //     if(isLoader) {
    //         console.log('spinner on')
    //         // this.spinnerService.toggleSpinner(true);
    //     }
    //
    //     return response
    //         .map((res: Response) => this.extractData(res))
    //         .catch((err: Response) => this.handleError(err))
    //         .finally(() => {
    //             if(isLoader) {
    //                 console.log('spinner off')
    //                 // this.spinnerService.toggleSpinner(false);
    //             }
    //         });
    // }
    //
    // private extractData(res: Response): HttpResponse<any> {
    //     return {
    //         body: this.isJson(res) ? res.json() : {},
    //         isSuccess: true,
    //         statusCode: res.status
    //     };
    // }
    //
    // private handleError (error: Response): Observable<HttpResponse<any>> {
    //     const err: any = this.isJson(error) ? error.json() : {};
    //     const statusCode: number = error.status;
    //
    //     const response: HttpResponse<{}> = {
    //         body: {},
    //         errors: err,
    //         isSuccess: false,
    //         statusCode
    //     };
    //
    //     if(statusCode === 401 || statusCode === 403) {
    //         this.router.navigate(['/login']);
    //     }
    //
    //
    //     if(err && err.message) {
    //         console.log('error:', err.message);
    //         // this.alertService.danger(err.message);
    //     }
    //     return Observable.of(response);
    // }
    //
    // private isJson(response: Response): boolean {
    //     try {
    //         response.json();
    //     } catch (e) {
    //         return false;
    //     }
    //
    //     return true;
    // }
}
