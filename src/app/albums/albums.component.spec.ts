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
import {Album} from "../Album";
import {Artist} from "../Artist";

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

  it('should filter', () => {
    component.foundAlbums =  [
      { id: 1, title: 'fakeAlbum', year: '2014', artist: new Artist() },
      { id: 2, title: 'realAlbum', year: '2018', artist: new Artist() }
    ] as Album[];

    component.searchFilter = 'fake';

    component.filterResults();

    fixture.detectChanges();

    expect(component.filteredAlbums.length).toEqual(1);
    expect(component.filteredAlbums[0].title).toEqual('fakeAlbum');
  });
});
