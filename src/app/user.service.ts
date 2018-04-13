import {Injectable} from '@angular/core';
import {UserInfo} from './UserInfo';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError} from "rxjs/operators";
import {ErrorObservable} from "rxjs/observable/ErrorObservable";

@Injectable()
export class UserService {
  private userInfoSource = new Subject<UserInfo>();

  userInfo$: Observable<UserInfo> = this.userInfoSource.asObservable();
  private url: String = 'http://localhost:8080';

  constructor(private http:HttpClient) {}

  doLogin(credentials) {
    console.log(`logging with credentials ${JSON.stringify(credentials)}`);

    let hashedCredentials = btoa(`${credentials.username}:${credentials.password}`);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': `Basic ${hashedCredentials}`
      })
    };

    return this.http.get<UserInfo>(this.url + '/user', httpOptions)
      .pipe(
        catchError(this.handleError)
      )
      .subscribe(value => {
        const userInfo: UserInfo = {
          userName: value.username,
          isAdmin: value.authorities.map(e => e.authority).includes('ROLE_ADMIN'),
          authenticated: true
        };
        this.userInfoSource.next(userInfo)
      });
  }

  doLogout() {
    const loggedOutUser: UserInfo = {
      userName: '',
      isAdmin: false,
      authenticated: false
    };
    return this.http.get<UserInfo>(this.url + '/logout')
      .pipe(
        catchError(this.handleError)
      )
      .subscribe(value => this.userInfoSource.next(loggedOutUser));
  }

  //TODO refine
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an ErrorObservable with a user-facing error message
    return new ErrorObservable(
      'Something bad happened; please try again later.');
  };
}
