import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlbumServiceService } from '../album-service.service';
import { Artist } from '../Artist';
import { LoginAwareComponent } from '../../LoginAwareComponent';
import { UserServiceService } from '../user-service.service';

@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.css']
})
export class ArtistsComponent extends LoginAwareComponent {
  resultArtist$: Artist[];

  constructor(
    private albumService: AlbumServiceService,
    userService: UserServiceService
  ) {
    super(userService);
    this.albumService = albumService;
  }

  onSubmit(f: NgForm) {
    this.albumService
      .listArtistByName(f.value.searchName)
      .subscribe(artists => (this.resultArtist$ = artists));
  }

  createArtist() {
    let newArtist: Artist = new Artist();
    // TODO $('#artistModal').modal('show');
  }

  editArtist(artist: Artist) {
    console.log(`editing ${JSON.stringify(artist)}`);

    //TODO
  }

  deleteArtist(artist: Artist) {
    const shouldDeleteArtist = window.confirm(
      `Are you sure you want to delete: ${artist.name} ?`
    );
    if (shouldDeleteArtist) {
      this.albumService.deleteArtist(artist.id).then(() => {
        // TODO $route.reload();
      });
    }
  }
}
