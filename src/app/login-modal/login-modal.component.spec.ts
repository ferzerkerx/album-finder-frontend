import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginModalComponent } from './login-modal.component';
import { BsModalRef, ModalModule } from 'ngx-bootstrap';
import { UserService } from '../user.service';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { InputComponent } from '../input/input.component';
import { ModalComponent } from '../modal/modal.component';

describe('LoginModalComponent', () => {
  let component: LoginModalComponent;
  let fixture: ComponentFixture<LoginModalComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [
          FormsModule,
          BrowserModule,
          ModalModule,
          HttpClientTestingModule
        ],
        declarations: [LoginModalComponent, InputComponent, ModalComponent],
        providers: [BsModalRef, UserService]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
