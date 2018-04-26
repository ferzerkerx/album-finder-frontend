import { async, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AlbumsComponent } from './albums/albums.component';
import { ArtistsComponent } from './artists/artists.component';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { InputComponent } from './input/input.component';
import { APP_BASE_HREF } from '@angular/common';
import {
  BsModalService,
  ComponentLoaderFactory,
  PositioningService
} from 'ngx-bootstrap';
import { UserService } from './user.service';
import { HttpClientModule } from '@angular/common/http';

describe('AppComponent', () => {
  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [
          BrowserModule,
          FormsModule,
          AppRoutingModule,
          HttpClientModule
        ],
        declarations: [
          AppComponent,
          AlbumsComponent,
          ArtistsComponent,
          InputComponent
        ],
        providers: [
          { provide: APP_BASE_HREF, useValue: '/' },
          BsModalService,
          ComponentLoaderFactory,
          PositioningService,
          UserService
        ]
      }).compileComponents();
    })
  );
  it(
    'should create the app',
    async(() => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.debugElement.componentInstance;
      expect(app).toBeTruthy();
    })
  );
  it(
    `should have as title 'app'`,
    async(() => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.debugElement.componentInstance;
      expect(app.title).toEqual('app');
    })
  );
  it(
    'should render a Login button',
    async(() => {
      const fixture = TestBed.createComponent(AppComponent);
      fixture.detectChanges();
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('.btn').textContent).toContain('Login');
    })
  );
});
