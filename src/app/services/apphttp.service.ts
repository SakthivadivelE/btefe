import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { loginData ,userData} from '../models';
import { serverUrl } from '../serverconfig';

import { AuthHttp } from 'angular2-jwt';



@Injectable()
export class ApphttpService {
public isLoggedIn:boolean=false;
  constructor(private http: HttpClient,public authHttp: AuthHttp) { 
   
  }
 
  userLogin(data:loginData): Observable<userData> {
    var json = JSON.stringify(data);
    return this.http.post<any>(`${serverUrl}/login`,{data:json})
      .pipe(
        tap(this.setSession),
        catchError(this.handleError('userLogin', []))
      );
  }

  createAuthorizationHeader() {
    return new HttpHeaders().set("Authorization",  'Bearer ' + localStorage.getItem('token'));
}

  userLogout(data:any):Observable<any> {
     var data:any=JSON.stringify(data);
     var  headers = this.createAuthorizationHeader();
    
     return this.http.get<any>(`${serverUrl}/logout?data=${data}`,{headers})
       .pipe(
         tap(this.logout),
         catchError(this.handleError('logout', []))
       );
   }

   logout() {
     localStorage.removeItem('token');
     localStorage.removeItem('user_id');
     this.isLoggedIn = false;
   }

  userRegistration(data:any) :Observable<any> {
    var json = JSON.stringify(data);
    return this.http.post<any>(`${serverUrl}/userRegistration`,{data:json},{observe: 'response'});
  }
  
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); 
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  private setSession(authResult) {
    localStorage.setItem('token', authResult.token);
    if(typeof authResult.user !== undefined && typeof authResult.user !== "undefined") {
      localStorage.setItem('user_id', authResult.user[0].user_id);
    }
    
    this.isLoggedIn = true;
}  

getThing() {
  this.authHttp.get(`${serverUrl}/listRejectedPosts`)
    .subscribe(
      data => console.error(data),
      err => console.error(err),
      () => console.error('Request Complete')
    );
}
}
