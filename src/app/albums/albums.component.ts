import { Component } from '@angular/core';
import { Album } from '../Album';
import { AlbumService } from '../album.service';
import { NgForm } from '@angular/forms';
import { LoginAwareComponent } from '../../LoginAwareComponent';
import { UserServiceService } from '../user-service.service';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css']
})
export class AlbumsComponent extends LoginAwareComponent {
  resultAlbums: Album[];

  constructor(
    private albumService: AlbumService,
    userService: UserServiceService
  ) {
    super(userService);
    this.albumService = albumService;
  }

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
