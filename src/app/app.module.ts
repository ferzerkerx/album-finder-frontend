import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AlbumService } from './album.service';
import { ArtistsComponent } from './artists/artists.component';
import { AppRoutingModule } from './app-routing.module';
import { AlbumsComponent } from './albums/albums.component';
import { UserServiceService } from './user-service.service';
import { LoginModalComponent } from './login-modal/login-modal.component';
import {BsModalService, ComponentLoaderFactory, ModalModule, PositioningService} from "ngx-bootstrap";
import { ArtistModalComponent } from './artist-modal/artist-modal.component';

@NgModule({
  declarations: [AppComponent, ArtistsComponent, AlbumsComponent, LoginModalComponent, ArtistModalComponent],
  entryComponents: [LoginModalComponent, ArtistModalComponent],
  imports: [BrowserModule, FormsModule, AppRoutingModule, HttpClientModule, ModalModule],
  providers: [AlbumService, UserServiceService, BsModalService, ComponentLoaderFactory, PositioningService],
  bootstrap: [AppComponent]
})
export class AppModule {}
