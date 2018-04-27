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
  @ViewChild('searchForm') searchForm: NgForm;

  constructor(
    private readonly albumService: AlbumService,
    private readonly bsModalService: BsModalService,
    protected userService: UserService
  ) {
    super(userService);
  }

  createAlbum() {
    const album: Album = new Album();
    const initialState = { album };
    this.showModal(initialState);
  }

  editAlbum(selectedAlbum: Album) {
    const album: Album = { ...selectedAlbum };
    const initialState = { album };
    this.showModal(initialState);
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
      this.filteredAlbums = this.foundAlbums.filter(item =>
        item.title.includes(this.searchFilter)
      );
    }
  }

  private refreshResults() {
    this.searchAlbums(this.searchForm);
  }

  private showModal(initialState) {
    const bsModalRef = this.bsModalService.show(AlbumModalComponent, {
      initialState
    });
    bsModalRef.content.onActionClicked.subscribe(wasSaved => {
      if (wasSaved) {
        this.refreshResults();
      }
    });
  }
}
