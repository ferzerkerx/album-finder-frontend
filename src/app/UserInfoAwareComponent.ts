import { UserService } from './user.service';
import { UserInfo } from './UserInfo';

export class UserInfoAwareComponent {
  private static _userInfo: UserInfo = new UserInfo();

  constructor(protected userService: UserService) {
    userService.userInfo$.subscribe(userInfo => {
      UserInfoAwareComponent._userInfo = userInfo;
    });
  }

  // noinspection JSMethodCanBeStatic
  get userInfo(): UserInfo {
    return UserInfoAwareComponent._userInfo;
  }
}
