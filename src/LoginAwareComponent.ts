import { UserServiceService } from './app/user-service.service';
import { UserInfo } from './app/UserInfo';

export class LoginAwareComponent {
  protected userInfo: UserInfo = new UserInfo();

  constructor(private userService: UserServiceService) {
    userService.userInfo$.subscribe(userInfo => (this.userInfo = userInfo));
  }
}
