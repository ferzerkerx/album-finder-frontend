import { Component, OnInit } from '@angular/core';
import { Artist } from '../Artist';
import { BsModalRef } from 'ngx-bootstrap';
import { NgForm } from '@angular/forms';
import { AlbumService } from '../album.service';
import { Subject } from 'rxjs/Subject';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-create-artist-modal',
  templateUrl: './artist-modal.component.html',
  styleUrls: ['./artist-modal.component.css']
})
export class ArtistModalComponent extends ModalComponent {
  artist: Artist;

  constructor(
    private albumService: AlbumService,
    public bsModalRef: BsModalRef
  ) {
    super(bsModalRef);
  }

  save(f: NgForm) {
    const data: Artist = {
      id: this.artist.id,
      name: f.value.name
    };
    this.albumService
      .saveArtist(data)
      .subscribe(() => this.onSuccess(), () => this.onFailure());
  }
}
