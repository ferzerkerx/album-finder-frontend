import { UserService } from './user.service';
import { UserInfo } from './UserInfo';

export class LoginAwareComponent {
  protected userInfo: UserInfo = new UserInfo();

  constructor(protected userService: UserService) {
    userService.userInfo$.subscribe(userInfo => {
      this.userInfo = userInfo;
    });
  }
}
