import { Component, ViewChild } from '@angular/core';
import { Album } from '../Album';
import { AlbumService } from '../album.service';
import { NgForm } from '@angular/forms';
import { UserInfoAwareComponent } from '../UserInfoAwareComponent';
import { UserService } from '../user.service';
import { BsModalService } from 'ngx-bootstrap';
import { AlbumModalComponent } from '../album-modal/album-modal.component';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css']
})
export class AlbumsComponent extends UserInfoAwareComponent {
  foundAlbums: Album[];
  filteredAlbums: Album[];
  searchFilter: string;
  @ViewChild('myForm') myForm: NgForm;

  constructor(
    private albumService: AlbumService,
    private bsModalService: BsModalService,
    protected userService: UserService
  ) {
    super(userService);
  }

  createAlbum() {
    const album: Album = new Album();
    const initialState = { album: album };
    const bsModalRef = this.bsModalService.show(AlbumModalComponent, {
      initialState
    });
    bsModalRef.content.onSave.subscribe(wasSaved => {
      if (wasSaved) {
        this.refreshResults();
      }
    });
  }

  editAlbum(selectedAlbum: Album) {
    const album: Album = { ...selectedAlbum };
    const initialState = { album: album };
    const bsModalRef = this.bsModalService.show(AlbumModalComponent, {
      initialState
    });
    bsModalRef.content.onSave.subscribe(wasSaved => {
      if (wasSaved) {
        this.refreshResults();
      }
    });
  }

  searchAlbums(f: NgForm) {
    const searchCriteria = {
      title: f.value.searchName,
      year: f.value.searchYear
    };
    this.albumService.listAlbumsByCriteria(searchCriteria).subscribe(albums => {
      this.foundAlbums = albums;
      this.filterResults();
    });
  }

  deleteAlbum(album: Album) {
    const shouldDeleteAlbum = window.confirm(
      `Are you sure you want to delete: ${album.title} ?`
    );
    if (shouldDeleteAlbum === true) {
      this.albumService.deleteAlbum(album.id).subscribe(() => {
        this.refreshResults();
      });
    }
  }

  filterResults() {
    this.filteredAlbums = this.foundAlbums;
    if (this.searchFilter && this.searchFilter.length > 0) {
      this.filteredAlbums = this.foundAlbums.filter(e =>
        e.title.includes(this.searchFilter)
      );
    }
  }

  private refreshResults() {
    this.searchAlbums(this.myForm);
  }
}
