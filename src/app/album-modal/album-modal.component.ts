import {Component} from '@angular/core';
import {Album} from '../Album';
import {AlbumService} from '../album.service';
import {BsModalRef} from 'ngx-bootstrap';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-album-modal',
  templateUrl: './album-modal.component.html',
  styleUrls: ['./album-modal.component.css']
})
export class AlbumModalComponent {
  album: Album;

  constructor(
    private albumService: AlbumService,
    public bsModalRef: BsModalRef
  ) {}

  save(f: NgForm) {
    const data: Album = {
      id: this.album.id,
      year: f.value.year,
      title: f.value.title,
      artist: this.album.artist
    };
    this.albumService.saveAlbum(data).then(() => this.bsModalRef.hide());
  }
}
