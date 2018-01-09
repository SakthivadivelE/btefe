import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { topics,postData } from '../models';
import { serverUrl } from '../serverconfig';

import { AuthHttp } from 'angular2-jwt';
import 'rxjs/add/operator/map';



@Injectable()
export class DataService {

  constructor(private http: HttpClient,private authHttp:AuthHttp) { 
   
  }

  public userData:any={};
 
  getTopics(): Observable<topics> {
    return this.http.get<any>(`${serverUrl}/listTopics`)
      .pipe(
        tap(()=>{console.log("here")}),
        catchError(this.handleError('getTopics', []))
      );
  }

  setUserData(value:any) {
    this.userData = value;
    localStorage.setItem('username',this.userData.username);
    localStorage.setItem('email',this.userData.email);
    localStorage.setItem('interest',this.userData.interest);
    localStorage.setItem('isAdmin',this.userData.isAdmin);
    localStorage.setItem('notify',this.userData.notify);
    localStorage.setItem('empID',this.userData.username);
  }

  getUserData() {
    var userData = {
      username:localStorage.getItem('username'),
      email:localStorage.getItem('email'),
      interest:localStorage.getItem('interest'),
      isAdmin: localStorage.getItem('isAdmin'),
      notify:localStorage.getItem('notify'),
      empID: localStorage.getItem('empID'),
      user_id: localStorage.getItem('user_id')
    };
    return userData;
  }

  

  getLatestTopicPosts(data:any): Observable<postData> {
    var data:any=JSON.stringify(data);
    return this.http.get<any>(`${serverUrl}/listLatestTopicPosts?data=${data}&token=${localStorage.getItem('token')}`)
      .pipe(
        tap(()=>{console.log("here")}),
        catchError(this.handleError('getLatestTopicPosts', []))
      );
  }

  getLatestTopicPostsForUser(data:any): Observable<any> {
    var data:any=JSON.stringify(data);
    var  headers = this.createAuthorizationHeader();
    
    return this.http.get<any>(`${serverUrl}/listLatestTopicPostsForUser?data=${data}`,{headers})
      .pipe(
        tap(()=>{console.log("here")}),
        catchError(this.handleError('getLatestTopicPostsForUser', []))
      );
  }

  removeUser(data:any): Observable<any> {
    var data:any=JSON.stringify(data);
    var  headers = this.createAuthorizationHeader();
    
    return this.http.get<any>(`${serverUrl}/removeUser?data=${data}`,{headers})
      .pipe(
        tap(()=>{console.log("here")}),
        catchError(this.handleError('removeUser', []))
      );
  }

  searchUsers(data:any): Observable<any> {
    var data:any=JSON.stringify(data);
    var  headers = this.createAuthorizationHeader();
    
    return this.http.get<any>(`${serverUrl}/searchUsers?data=${data}`,{headers})
      .pipe(
        tap(()=>{console.log("here")}),
        catchError(this.handleError('searchUsers', []))
      );
  }


  approvePost(data:any): Observable<any> {
    var data:any=JSON.stringify(data);
    var  headers = this.createAuthorizationHeader();
    
    return this.http.get<any>(`${serverUrl}/approvePost?data=${data}`,{headers})
      .pipe(
        tap(()=>{console.log("here")}),
        catchError(this.handleError('approvePost', []))
      );
  }


  rejectPost(data:any): Observable<any> {
    var data:any=JSON.stringify(data);
    var  headers = this.createAuthorizationHeader();
    
    return this.http.get<any>(`${serverUrl}/rejectPost?data=${data}`,{headers})
      .pipe(
        tap(()=>{console.log("here")}),
        catchError(this.handleError('rejectPost', []))
      );
  }

  getPostsWaitingForApprovals(data:any): Observable<any> {
    var data:any=JSON.stringify(data);
    var  headers = this.createAuthorizationHeader();
    
    return this.http.get<any>(`${serverUrl}/postsWaitingForApprovals?data=${data}`,{headers})
      .pipe(
        tap(()=>{console.log("here")}),
        catchError(this.handleError('getPostsWaitingForApprovals', []))
      );
  }

  deletePosts(data:any): Observable<any> {
    var data:any=JSON.stringify(data);
    var  headers = this.createAuthorizationHeader();
    
    return this.http.get<any>(`${serverUrl}/deletePost?data=${data}`,{headers})
      .pipe(
        tap(()=>{console.log("here")}),
        catchError(this.handleError('deletePosts', []))
      );
  }

  countApprovedPosts(): Observable<any> {
    var  headers = this.createAuthorizationHeader();
    
    return this.http.get<any>(`${serverUrl}/countApprovedPosts`,{headers})
      .pipe(
        tap(()=>{console.log("here")}),
        catchError(this.handleError('countApprovedPosts', []))
      );
  }


  countRejectedPosts(): Observable<any> {
    var  headers = this.createAuthorizationHeader();
    return this.http.get<any>(`${serverUrl}/countRejectedPosts`,{headers})
      .pipe(
        tap(()=>{console.log("here")}),
        catchError(this.handleError('countRejectedPosts', []))
      );
  }


  listUsers(): Observable<any> {
    var  headers = this.createAuthorizationHeader();
    
    return this.http.get<any>(`${serverUrl}/listUsers`,{headers})
      .pipe(
        tap(()=>{console.log("here")}),
        catchError(this.handleError('listUsers', []))
      );
  }

  getMostAnsweredTopicPosts(data:any): Observable<postData> {
    var data:any=JSON.stringify(data);
    var  headers = this.createAuthorizationHeader();
    
    return this.http.get<any>(`${serverUrl}/listMostAnsweredTopicPosts?data=${data}`,{headers})
      .pipe(
        tap(()=>{console.log("here")}),
        catchError(this.handleError('getMostAnsweredTopicPosts', []))
      );
  }

  listuserPosts(data:any): Observable<postData> {
    var data:any=JSON.stringify(data);
    var  headers = this.createAuthorizationHeader();
    
    return this.http.get<any>(`${serverUrl}/listUserPosts?data=${data}`,{headers})
      .pipe(
        tap(()=>{console.log("here")}),
        catchError(this.handleError('listUserPosts', []))
      );
  }

  listuserAnsweredPosts(data:any): Observable<postData> {
    var data:any=JSON.stringify(data);
    var  headers = this.createAuthorizationHeader();
    
    return this.http.get<any>(`${serverUrl}/listUserAnsweredPosts?data=${data}`,{headers})
      .pipe(
        tap(()=>{console.log("here")}),
        catchError(this.handleError('listuserAnsweredPosts', []))
      );
  }

  getRejectedPosts(data:any): Observable<postData> {
    var data:any=JSON.stringify(data);
    var  headers = this.createAuthorizationHeader();
    
    return this.http.get<any>(`${serverUrl}/listRejectedPosts?data=${data}`,{headers})
      .pipe(
        tap(()=>{console.log("")}),
        catchError(this.handleError('getRejectedPosts', []))
      );
  }

  searchPosts(data:any): Observable<postData> {
    var data:any=JSON.stringify(data);
    var  headers = this.createAuthorizationHeader();
    
    return this.http.get<any>(`${serverUrl}/searchPosts?data=${data}`,{headers})
      .pipe(
        tap(()=>{console.log("")}),
        catchError(this.handleError('searchPosts', []))
      );
  }

  getAllApprovedPosts(data:any): Observable<postData> {
    var data:any=JSON.stringify(data);
    var  headers = this.createAuthorizationHeader();
    
    return this.http.get<any>(`${serverUrl}/listLatestApprovedPosts?data=${data}`,{headers})
      .pipe(
        tap(()=>{console.log("")}),
        catchError(this.handleError('getAllApprovedPosts', []))
      );
  }
  

  listuserAskedPosts(data:any): Observable<postData> {
    var data:any=JSON.stringify(data);
    var  headers = this.createAuthorizationHeader();
    
    return this.http.get<any>(`${serverUrl}/listUserAskedPosts?data=${data}`,{headers})
      .pipe(
        tap(()=>{console.log("here")}),
        catchError(this.handleError('listUserAskedPosts', []))
      );
  }


  createAuthorizationHeader() {
      return new HttpHeaders().set("Authorization",  'Bearer ' + localStorage.getItem('token'));
  }

  createPost(data:any): Observable<any> {
    var data:any=JSON.stringify(data);

    return this.authHttp.get(`${serverUrl}/createPost?data=${data}`)
      .pipe(
        tap(()=>{console.log("here")}),
        catchError(this.handleError('createPost', []))
      );
  }

  getPostAnswers(data:any): Observable<any> {
    var data:any=JSON.stringify(data);
    var  headers = this.createAuthorizationHeader();

    return this.http.get(`${serverUrl}/getPostAnswers?data=${data}`,{headers})
      .pipe(
        tap(()=>{console.log("here")}),
        catchError(this.handleError('getPostAnswers', []))
      );
  }

  addAnswer(data:any): Observable<any> {
    var data:any=JSON.stringify(data);
    var  headers = this.createAuthorizationHeader();

    return this.http.get(`${serverUrl}/addAnswer?data=${data}`,{headers})
      .pipe(
        tap(()=>{console.log("here")}),
        catchError(this.handleError('addAnswer', []))
      );
  }
  
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); 
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  // getRejectedPosts():Observable<any> {
  //  return  this.authHttp.get(`${serverUrl}/listRejectedPosts`)
  //   .pipe(
  //     tap(()=>{console.error("here")}),
  //     catchError(this.handleError('RejectedPosts', []))
  //   );
  // }
     
}
