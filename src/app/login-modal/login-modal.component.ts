import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { UserService } from '../user.service';
import { BsModalRef } from 'ngx-bootstrap';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css']
})
export class LoginModalComponent extends ModalComponent {
  constructor(private userService: UserService, public bsModalRef: BsModalRef) {
    super(bsModalRef);
  }

  login(f: NgForm) {
    const credentials = {
      username: f.value.username,
      password: f.value.password
    };
    this.userService.doLogin(credentials);
    this.close();
  }
}
