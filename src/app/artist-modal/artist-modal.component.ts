import { Component, OnInit } from '@angular/core';
import { Artist } from '../Artist';
import { BsModalRef } from 'ngx-bootstrap';
import { NgForm } from '@angular/forms';
import { AlbumService } from '../album.service';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-create-artist-modal',
  templateUrl: './artist-modal.component.html',
  styleUrls: ['./artist-modal.component.css']
})
export class ArtistModalComponent implements OnInit {
  artist: Artist;
  public onSave: Subject<boolean>;

  constructor(
    private albumService: AlbumService,
    public bsModalRef: BsModalRef
  ) {}

  ngOnInit(): void {
    this.onSave = new Subject();
  }

  save(f: NgForm) {
    const data: Artist = {
      id: this.artist.id,
      name: f.value.name
    };
    this.albumService.saveArtist(data).subscribe(
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
