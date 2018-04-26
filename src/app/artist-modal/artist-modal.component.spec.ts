import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistModalComponent } from './artist-modal.component';
import { BsModalRef, ModalModule } from 'ngx-bootstrap';
import { AlbumService } from '../album.service';
import { InputComponent } from '../input/input.component';
import { ModalComponent } from '../modal/modal.component';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Artist } from '../Artist';

describe('ArtistModalComponent', () => {
  let component: ArtistModalComponent;
  let fixture: ComponentFixture<ArtistModalComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [
          FormsModule,
          BrowserModule,
          ModalModule,
          HttpClientTestingModule
        ],
        declarations: [ArtistModalComponent, InputComponent, ModalComponent],
        providers: [BsModalRef, AlbumService]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistModalComponent);
    component = fixture.componentInstance;
    component.artist = new Artist();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
