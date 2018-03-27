import { Component, OnInit } from '@angular/core';
import { Album } from '../Album';
import { UserInfo } from '../UserInfo';
import { AlbumServiceService } from '../album-service.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css']
})
export class AlbumsComponent implements OnInit {
  resultAlbums: Album[];
  userInfo: UserInfo;

  constructor(private albumService: AlbumServiceService) {
    this.albumService = albumService;
    this.userInfo = { isAdmin: true }; //TODO this should come from the logged in user
  }

  ngOnInit() {}

  createAlbum() {
    let newAlbum: Album = new Album();
    // TODO $('#albumModal').modal('show');
  }

  editAlbum(album: Album) {
    console.log(`editing ${JSON.stringify(album)}`);

    //TODO
  }

  onSubmit(f: NgForm) {
    const searchCriteria = {
      title: f.value.searchName,
      year: f.value.searchYear
    };
    this.albumService
      .listAlbumsByCriteria(searchCriteria)
      .subscribe(albums => (this.resultAlbums = albums));
  }

  deleteAlbum(album: Album) {
    const shouldDeleteAlbum = window.confirm(
      `Are you sure you want to delete: ${album.title} ?`
    );
    if (shouldDeleteAlbum === true) {
      this.albumService.deleteAlbum(album.id).then(() => {
        // TODO $route.reload();
      });
    }
  }
}
