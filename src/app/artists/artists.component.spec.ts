import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistsComponent } from './artists.component';
import { InputComponent } from '../input/input.component';
import {
  BsModalService,
  ComponentLoaderFactory,
  ModalModule,
  PositioningService
} from 'ngx-bootstrap';
import { AlbumService } from '../album.service';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserService } from '../user.service';
import { ModalComponent } from '../modal/modal.component';

describe('ArtistsComponent', () => {
  let component: ArtistsComponent;
  let fixture: ComponentFixture<ArtistsComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [
          FormsModule,
          BrowserModule,
          ModalModule,
          HttpClientTestingModule
        ],
        declarations: [ArtistsComponent, InputComponent, ModalComponent],
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
    fixture = TestBed.createComponent(ArtistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
