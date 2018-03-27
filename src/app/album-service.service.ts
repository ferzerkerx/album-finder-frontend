import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Album } from './Album';
import { Artist } from './Artist';

@Injectable()
//TODO this should be the real thing
export class AlbumServiceService {
  constructor() {}

  listArtistByName(artistName: String): Observable<Artist[]> {
    console.log(`listArtistByName ${artistName}`);
    const newVar: Artist[] = [{ id: 1, name: 'someName' }];
    return of(newVar);
  }

  deleteArtist(id: number): Promise<number> {
    return Promise.resolve(1);
  }

  deleteAlbum(id: number): Promise<number> {
    return Promise.resolve(1);
  }

  listAlbumsByCriteria(searchCriteria: { title: String; year: String }) {
    const newVar: Album[] = [
      { id: 1, title: 'someTitle', year: '2009', artist: new Artist() }
    ];
    return of(newVar);
  }
}
