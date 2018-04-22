import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { UserService } from '../user.service';
import { BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css']
})
export class LoginModalComponent {
  constructor(
    private userService: UserService,
    public bsModalRef: BsModalRef
  ) {}

  login(f: NgForm) {
    const credentials = {
      username: f.value.username,
      password: f.value.password
    };
    this.userService.doLogin(credentials);
    this.close();
  }

  close() {
    this.bsModalRef.hide();
  }
}
