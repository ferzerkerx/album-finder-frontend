import { Component, OnInit } from '@angular/core';
import { Album } from '../Album';
import { AlbumService } from '../album.service';
import { BsModalRef } from 'ngx-bootstrap';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-album-modal',
  templateUrl: './album-modal.component.html',
  styleUrls: ['./album-modal.component.css']
})
export class AlbumModalComponent implements OnInit {
  album: Album;
  public onSave: Subject<boolean>;

  constructor(
    private albumService: AlbumService,
    public bsModalRef: BsModalRef
  ) {}

  public ngOnInit(): void {
    this.onSave = new Subject();
  }

  save(f: NgForm) {
    if (!this.album.id) {
      this.album.artist = { id: 1, name: 'MOONSORROW' }; //TODO this needs to be selected in the modal
    }

    const data: Album = {
      id: this.album.id,
      year: f.value.year,
      title: f.value.title,
      artist: this.album.artist
    };
    this.albumService.saveAlbum(data).subscribe(
      () => {
        this.close();
        this.onSave.next(true);
      },
      () => this.onSave.next(false)
    );
  }

  close() {
    this.bsModalRef.hide();
  }
}
