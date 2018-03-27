import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlbumServiceService } from '../album-service.service';
import { Artist } from '../Artist';
import {UserInfo} from "../UserInfo";

@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.css']
})
export class ArtistsComponent implements OnInit {
  resultArtist$: Artist[];
  userInfo: UserInfo;
  resultsFilter: String;

  constructor(private albumService: AlbumServiceService) {
    this.albumService = albumService;
    this.userInfo = {isAdmin: true}; //TODO this should come from the logged in user
  }

  ngOnInit() {}

  onSubmit(f: NgForm) {
    this.albumService
      .listArtistByName(f.value.searchName)
      .subscribe(artists => (this.resultArtist$ = artists));
  }

  createArtist() {
    let newArtist : Artist = new Artist();
    // TODO $('#artistModal').modal('show');
  }

  editArtist(artist: Artist) {
    console.log(`editing ${JSON.stringify(artist)}`);

    //TODO
  }

  deleteArtist(artist: Artist) {
    const shouldDeleteArtist = window.confirm(`Are you sure you want to delete: ${artist.name} ?`);
    if (shouldDeleteArtist) {
      this.albumService.deleteArtist(artist.id)
        .then(() => {
        // TODO $route.reload();
      });
    }
  }
}
