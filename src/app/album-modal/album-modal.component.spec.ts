import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumModalComponent } from './album-modal.component';
import { BsModalRef, ModalModule } from 'ngx-bootstrap';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { InputComponent } from '../input/input.component';
import { ModalComponent } from '../modal/modal.component';
import { AlbumService } from '../album.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Album } from '../Album';

describe('AlbumModalComponent', () => {
  let component: AlbumModalComponent;
  let fixture: ComponentFixture<AlbumModalComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [
          FormsModule,
          BrowserModule,
          ModalModule,
          HttpClientTestingModule
        ],
        declarations: [AlbumModalComponent, InputComponent, ModalComponent],
        providers: [BsModalRef, AlbumService]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumModalComponent);
    component = fixture.componentInstance;
    component.album = new Album();
    component.allArtists = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
