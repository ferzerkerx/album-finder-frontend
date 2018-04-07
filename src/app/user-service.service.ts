import { Injectable } from '@angular/core';
import { UserInfo } from './UserInfo';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserServiceService {
  private userInfoSource = new Subject<UserInfo>();

  userInfo$: Observable<UserInfo> = this.userInfoSource.asObservable();

  constructor() {

  }

  doLogin(credentials) {
    console.log(`logging with credentials ${JSON.stringify(credentials)}`);
    //TODO call http service
    const userInfo: UserInfo = {
      userName: 'myUserName',
      isAdmin: true,
      authenticated: true
    };
    this.userInfoSource.next(userInfo);
  }

  doLogout() {
    //TODO call http service
    const userInfo: UserInfo = {
      userName: '',
      isAdmin: false,
      authenticated: false
    };
    this.userInfoSource.next(userInfo);
  }
}
