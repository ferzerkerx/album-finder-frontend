import { Component } from '@angular/core';
import { Album } from '../Album';
import { AlbumService } from '../album.service';
import { BsModalRef } from 'ngx-bootstrap';
import { NgForm } from '@angular/forms';
import { ModalComponent } from '../modal/modal.component';
import {Artist} from "../Artist";

@Component({
  selector: 'app-album-modal',
  templateUrl: './album-modal.component.html',
  styleUrls: ['./album-modal.component.css']
})
export class AlbumModalComponent extends ModalComponent {
  album: Album;
  allArtists: Artist[];

  constructor(
    private albumService: AlbumService,
    public bsModalRef: BsModalRef
  ) {
    super(bsModalRef);
  }

  ngOnInit() {
    super.ngOnInit();
    this.albumService
      .listArtistByName("")
      .subscribe((artists) => this.allArtists =  artists);
  }

  save(f: NgForm) {
    const data: Album = new Album({
      year: f.value.year,
      title: f.value.title,
      artist: this.album.artist,
      id: this.album.id
    });

    this.albumService
      .saveAlbum(data)
      .subscribe(() => this.onSuccess(), () => this.onFailure());
  }
}
