import {Component} from '@angular/core';
import {Artist} from "../Artist";
import {BsModalRef} from "ngx-bootstrap";
import {NgForm} from "@angular/forms";
import {AlbumService} from "../album.service";

@Component({
  selector: 'app-create-artist-modal',
  templateUrl: './artist-modal.component.html',
  styleUrls: ['./artist-modal.component.css']
})
export class ArtistModalComponent {

  artist: Artist;

  constructor(private albumService: AlbumService, public bsModalRef: BsModalRef) {
  }

  save(f: NgForm) {
    const data = {
      id: this.artist.id,
      name: f.value.name
    };
    this.albumService.saveArtist(data)
      .then(()=> this.bsModalRef.hide());
  }


}
