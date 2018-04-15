import { Component } from '@angular/core';
import { Album } from '../Album';
import { AlbumService } from '../album.service';
import { NgForm } from '@angular/forms';
import { LoginAwareComponent } from '../../LoginAwareComponent';
import { UserService } from '../user.service';
import { BsModalService } from 'ngx-bootstrap';
import { AlbumModalComponent } from '../album-modal/album-modal.component';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css']
})
export class AlbumsComponent extends LoginAwareComponent {
  resultAlbums: Album[];

  constructor(
    private albumService: AlbumService,
    private bsModalService: BsModalService,
    userService: UserService
  ) {
    super(userService);
  }

  createAlbum() {
    let album: Album = new Album();
    const initialState = { album: album };
    this.bsModalService.show(AlbumModalComponent, { initialState });
  }

  editAlbum(selectedAlbum: Album) {
    let album: Album = { ...selectedAlbum };
    const initialState = { album: album };
    this.bsModalService.show(AlbumModalComponent, { initialState });
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
