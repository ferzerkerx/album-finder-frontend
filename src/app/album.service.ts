import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Album } from './Album';
import { Artist } from './Artist';
import { HttpClient, HttpParams } from '@angular/common/http';
import { parseResponse, url } from './service.util';

@Injectable()
//TODO this should be the real thing
export class AlbumService {
  constructor(private http: HttpClient) {}

  listArtistByName(artistName: string): Observable<Artist[]> {
    const params = new HttpParams().set('name', artistName);
    return this.http
      .get<Artist[]>(url('/artist/search'), { params })
      .let(parseResponse);
  }

  deleteArtist(id: number): Promise<number> {
    return Promise.resolve(1);
  }

  deleteAlbum(id: number): Promise<number> {
    return Promise.resolve(1);
  }

  listAlbumsByCriteria(searchCriteria: {
    title: String;
    year: String;
  }): Observable<Album[]> {
    const newVar: Album[] = [
      { id: 1, title: 'someTitle', year: '2009', artist: new Artist() }
    ];
    return of(newVar);
  }

  saveArtist(artist: Artist): Promise<number> {
    console.log(`saving artist ${JSON.stringify(artist)}`);
    return Promise.resolve(1);
  }

  saveAlbum(album: Album): Promise<number> {
    console.log(`saving album ${JSON.stringify(album)}`);
    return Promise.resolve(1);
  }
}
