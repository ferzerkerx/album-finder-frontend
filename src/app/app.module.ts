import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  HTTP_INTERCEPTORS,
  HttpClientModule,
  HttpClientXsrfModule
} from '@angular/common/http';

import { AppComponent } from './app.component';
import { AlbumService } from './album.service';
import { ArtistsComponent } from './artists/artists.component';
import { AppRoutingModule } from './app-routing.module';
import { AlbumsComponent } from './albums/albums.component';
import { UserService } from './user.service';
import { LoginModalComponent } from './login-modal/login-modal.component';
import {
  BsModalService,
  ComponentLoaderFactory,
  ModalModule,
  PositioningService
} from 'ngx-bootstrap';
import { ArtistModalComponent } from './artist-modal/artist-modal.component';
import { AlbumModalComponent } from './album-modal/album-modal.component';
import { HttpXsrfInterceptor } from './HttpxrsfInterceptor';

@NgModule({
  declarations: [
    AppComponent,
    ArtistsComponent,
    AlbumsComponent,
    LoginModalComponent,
    ArtistModalComponent,
    AlbumModalComponent
  ],
  entryComponents: [
    LoginModalComponent,
    ArtistModalComponent,
    AlbumModalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientXsrfModule,
    ModalModule
  ],
  providers: [
    AlbumService,
    UserService,
    BsModalService,
    ComponentLoaderFactory,
    PositioningService,
    [{ provide: HTTP_INTERCEPTORS, useClass: HttpXsrfInterceptor, multi: true }]
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
