import { Component, OnInit } from '@angular/core';
import {Artist} from "../Artist";
import {BsModalRef} from "ngx-bootstrap";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-create-artist-modal',
  templateUrl: './create-artist-modal.component.html',
  styleUrls: ['./create-artist-modal.component.css']
})
export class CreateArtistModalComponent implements OnInit {

  artist: Artist;

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit() {
  }

  save(f: NgForm) {
    const data = {
      name: f.value.name
    };
    //TODO
  }


}
