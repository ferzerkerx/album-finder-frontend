import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumsComponent } from './albums.component';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {
  BsModalService,
  ComponentLoaderFactory,
  ModalModule,
  PositioningService
} from 'ngx-bootstrap';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { InputComponent } from '../input/input.component';
import { ModalComponent } from '../modal/modal.component';
import { AlbumService } from '../album.service';
import { UserService } from '../user.service';

describe('AlbumsComponent', () => {
  let component: AlbumsComponent;
  let fixture: ComponentFixture<AlbumsComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [
          FormsModule,
          BrowserModule,
          ModalModule,
          HttpClientTestingModule
        ],
        declarations: [AlbumsComponent, InputComponent, ModalComponent],
        providers: [
          PositioningService,
          ComponentLoaderFactory,
          BsModalService,
          AlbumService,
          UserService
        ]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
