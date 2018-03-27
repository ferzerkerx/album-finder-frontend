import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Album } from './Album';
import { Artist } from './Artist';

@Injectable()
export class AlbumServiceService {
  constructor() {}

  listAlbums(title, year): Observable<Album[]> {
    const newVar: Album[] = [{ id: 1, title: 'someTitle', year: year }];
    return of(newVar);
  }

  listArtist(): Observable<Artist[]> {
    const newVar: Artist[] = [{ id: 1, name: 'someName' }];
    return of(newVar);
  }
}
