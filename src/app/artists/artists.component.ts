import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlbumService } from '../album.service';
import { Artist } from '../Artist';
import { UserInfoAwareComponent } from '../UserInfoAwareComponent';
import { UserService } from '../user.service';
import { BsModalService } from 'ngx-bootstrap';
import { ArtistModalComponent } from '../artist-modal/artist-modal.component';

@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.css']
})
export class ArtistsComponent extends UserInfoAwareComponent {
  foundArtists: Artist[];
  filteredArtists: Artist[];
  searchFilter: string;
  @ViewChild('searchForm') searchForm: NgForm;

  constructor(
    private albumService: AlbumService,
    protected userService: UserService,
    private bsModalService: BsModalService
  ) {
    super(userService);
  }

  searchArtists(f: NgForm) {
    this.albumService
      .listArtistByName(f.value.searchName)
      .subscribe(artists => {
        this.foundArtists = artists;
        this.filterResults();
      });
  }

  createArtist() {
    const artist: Artist = new Artist();
    const initialState = { artist };
    this.showModal(initialState);
  }

  editArtist(selectedArtist: Artist) {
    const artist: Artist = { ...selectedArtist };
    const initialState = { artist };
    this.showModal(initialState);
  }

  deleteArtist(artist: Artist) {
    const shouldDeleteArtist = window.confirm(
      `Are you sure you want to delete: ${artist.name} ?`
    );
    if (shouldDeleteArtist) {
      this.albumService.deleteArtist(artist.id).subscribe(() => {
        this.refreshResults();
      });
    }
  }

  filterResults() {
    this.filteredArtists = this.foundArtists;
    if (this.searchFilter && this.searchFilter.length > 0) {
      this.filteredArtists = this.foundArtists.filter(item =>
        item.name.includes(this.searchFilter)
      );
    }
  }

  private refreshResults() {
    this.searchArtists(this.searchForm);
  }

  private showModal(initialState) {
    const bsModalRef = this.bsModalService.show(ArtistModalComponent, {
      initialState
    });
    bsModalRef.content.onSave.subscribe(wasSaved => {
      if (wasSaved) {
        this.refreshResults();
      }
    });
  }
}
