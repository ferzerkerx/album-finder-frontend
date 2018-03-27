import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlbumServiceService } from '../album-service.service';
import { Artist } from '../Artist';

@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.css']
})
export class ArtistsComponent implements OnInit {
  resultArtist$: Artist[];

  constructor(private albumService: AlbumServiceService) {
    this.albumService = albumService;
  }

  ngOnInit() {}

  onSubmit(f: NgForm) {
    const response = {};
    this.albumService
      .listArtist()
      .subscribe(artists => (this.resultArtist$ = artists));
  }
}
