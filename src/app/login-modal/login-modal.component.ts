import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";

import {UserServiceService} from "../user-service.service";
import {BsModalRef, ModalDirective} from "ngx-bootstrap";

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css']
})
export class LoginModalComponent {

  error: String;
  @ViewChild(ModalDirective) modal: ModalDirective;

  constructor(private userService: UserServiceService, public bsModalRef: BsModalRef) {
  }

  login(f: NgForm) {
    const credentials = {
      userName: f.value.userName,
      password: f.value.password
    };
    //TODO try catch for failures
    this.userService.doLogin(credentials);
    this.bsModalRef.hide();
  }

}
