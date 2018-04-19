import { Injectable } from '@angular/core';
import { UserInfo } from './UserInfo';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { handleError, url } from './service.util';

@Injectable()
export class UserService {
  private userInfoSource = new Subject<UserInfo>();

  userInfo$: Observable<UserInfo> = this.userInfoSource.asObservable();

  constructor(private http: HttpClient) {}

  doLogin(credentials): void {
    let hashedCredentials = btoa(
      `${credentials.username}:${credentials.password}`
    );

    const headers = new HttpHeaders({
      Authorization: `Basic ${hashedCredentials}`
    });

    this.http
      .post<UserInfo>(url('user'), {}, { headers })
      .pipe(catchError(handleError))
      .subscribe(value => {
        const userInfo: UserInfo = {
          userName: value.username,
          isAdmin: value.authorities
            .map(e => e.authority)
            .includes('ROLE_ADMIN'),
          authenticated: true
        };
        this.userInfoSource.next(userInfo);
      });
  }

  doLogout(): void {
    const loggedOutUser: UserInfo = {
      userName: '',
      isAdmin: false,
      authenticated: false
    };
    this.http
      .post<any>(url('logout'), {})
      .pipe(catchError(handleError))
      .subscribe(() => this.userInfoSource.next(loggedOutUser));
  }
}
