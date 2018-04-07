import {Component, OnInit} from '@angular/core';
import {UserServiceService} from "../user-service.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css']
})
export class LoginModalComponent implements OnInit {

  error: String;

  constructor(private userService: UserServiceService) {

  }

  ngOnInit() {
  }



  login(f: NgForm) {
    const credentials = {
      userName: f.value.userName,
      password: f.value.password
    };
    //TODO try catch for failures
    this.userService.doLogin(credentials)
  }

}
