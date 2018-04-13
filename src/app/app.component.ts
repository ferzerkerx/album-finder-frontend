import { Component } from '@angular/core';
import { LoginModalComponent } from './login-modal/login-modal.component';
import { BsModalService } from 'ngx-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private modalService: BsModalService) {}

  openLoginModal() {
    this.modalService.show(LoginModalComponent);
  }
}
