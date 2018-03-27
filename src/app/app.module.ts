import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }    from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';

import { AppComponent } from './app.component';
import { AlbumServiceService } from './album-service.service';
import { ArtistsComponent } from './artists/artists.component';
import { AppRoutingModule } from './app-routing.module';
import {AlbumsComponent} from "./albums/albums.component";

@NgModule({
  declarations: [AppComponent, ArtistsComponent, AlbumsComponent],
  imports: [BrowserModule, FormsModule, AppRoutingModule, HttpClientModule],
  providers: [AlbumServiceService],
  bootstrap: [AppComponent]
})
export class AppModule {}
