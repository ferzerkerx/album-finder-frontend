import {Component} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AlbumService} from '../album.service';
import {Artist} from '../Artist';
import {LoginAwareComponent} from '../../LoginAwareComponent';
import {UserServiceService} from '../user-service.service';
import {BsModalService} from 'ngx-bootstrap';
import {ArtistModalComponent} from '../artist-modal/artist-modal.component';

@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.css']
})
export class ArtistsComponent extends LoginAwareComponent {
  resultArtist$: Artist[];

  constructor(
    private albumService: AlbumService,
    userService: UserServiceService,
    private bsModalService: BsModalService
  ) {
    super(userService);
  }

  onSubmit(f: NgForm) {
    this.albumService
      .listArtistByName(f.value.searchName)
      .subscribe(artists => (this.resultArtist$ = artists));
  }

  createArtist() {
    const artist: Artist = new Artist();
    const initialState = { artist: artist };
    this.bsModalService.show(ArtistModalComponent, { initialState });
  }

  editArtist(selectedArtist: Artist) {
    const artist: Artist = { ...selectedArtist };
    const initialState = { artist: artist };
    this.bsModalService.show(ArtistModalComponent, { initialState });
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
