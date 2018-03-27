import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AlbumServiceService } from './album-service.service';
import { AlbumsComponent } from './albums/albums.component';
import { ArtistsComponent } from './artists/artists.component';
import { AppRoutingModule } from './/app-routing.module';

@NgModule({
  declarations: [AppComponent, AlbumsComponent, ArtistsComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [AlbumServiceService],
  bootstrap: [AppComponent]
})
export class AppModule {}
