import { Component } from '@angular/core';
import { LoginModalComponent } from './login-modal/login-modal.component';
import { BsModalService } from 'ngx-bootstrap';
import {UserService} from "./user.service";
import {LoginAwareComponent} from "./LoginAwareComponent";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent extends LoginAwareComponent {
  title = 'app';

  constructor(private modalService: BsModalService, protected userService: UserService) {
    super(userService);
  }

  openLoginModal() {
    this.modalService.show(LoginModalComponent);
  }

  logout() {
    this.userService.doLogout();
  }
}
